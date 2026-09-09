"""
app/auth/router.py

Authentication, session management, and device management endpoints.

Endpoint map:
  POST   /auth/register
  GET    /auth/verify-email
  POST   /auth/verify-email/resend
  POST   /auth/forgot-password
  POST   /auth/reset-password
  POST   /auth/login
  POST   /auth/refresh
  POST   /auth/logout
  POST   /auth/logout-all
  GET    /auth/sessions
  DELETE /auth/sessions/{session_id}
  GET    /auth/devices
  GET    /auth/devices/{device_id}
  PATCH  /auth/devices/{device_id}
  DELETE /auth/devices/{device_id}

  POST   /internal/cleanup      (ops — protected by X-Internal-Key header)

Design:
  - Rate limiting: @limiter.limit() on every endpoint that accepts
    unauthenticated user input. Provided by slowapi.
  - Background email: routers call email_service.send_*() via
    FastAPI BackgroundTasks AFTER calling the service. This keeps
    framework lifecycle objects (BackgroundTasks, Request) in the
    router layer. Services are pure Python.
  - Error responses: documented for security-relevant status codes only.
    Exhaustive error documentation becomes stale and untrustworthy.
"""

from fastapi import APIRouter, BackgroundTasks, Depends, Header, HTTPException, Request, status, Query
from sqlalchemy.orm import Session as DbSession

from app.auth import service
from app.auth.schemas import (
    DeviceRead,
    DeviceUpdate,
    ForgotPasswordRequest,
    LoginRequest,
    RefreshRequest,
    RegisterRequest,
    ResendVerificationRequest,
    ResetPasswordRequest,
    SessionRead,
    TokenResponse,
    VerifyEmailRequest,
)
from app.core.config import settings
from app.db.base import get_db
from app.services.cleanup import run_all_cleanup
from app.services.email_service import send_password_reset_email, send_verification_email
from app.shared.deps import get_current_user
from app.shared.rate_limit import limiter
from app.user.models import User
from app.user.schemas import UserRead

router = APIRouter(prefix="/auth", tags=["Authentication"])
internal_router = APIRouter(prefix="/internal", tags=["Internal / Ops"])


# ---------------------------------------------------------------------------
# Registration & Verification
# ---------------------------------------------------------------------------

@router.post(
    "/register",
    response_model=UserRead,
    status_code=status.HTTP_201_CREATED,
    summary="Register a new user account",
    responses={
        409: {"description": "Email or phone already registered"},
        422: {"description": "Validation error (weak password, invalid email, etc.)"},
    },
)
@limiter.limit(settings.rate_limit_register)
def register(
    request: Request,
    payload: RegisterRequest,
    background_tasks: BackgroundTasks,
    db: DbSession = Depends(get_db),
):
    """
    Create a new user account.

    If an email is provided, a verification link is sent to that address
    asynchronously (does not block this response).
    """
    user, raw_token = service.register_user(
        db,
        name=payload.name,
        email=payload.email,
        phone=payload.phone,
        password=payload.password,
    )
    if raw_token and payload.email:
        background_tasks.add_task(send_verification_email, to=payload.email, raw_token=raw_token)
    return user




@router.get(
    "/verify-email",
    status_code=status.HTTP_200_OK,
    summary="Verify email address using one-time token",
    responses={400: {"description": "Invalid, expired, or already-used token"}},
)
def verify_email(
    token: str = Query(...),
    db: DbSession = Depends(get_db),
):
    service.verify_email_token(db, raw_token=token)
    return {"detail": "Email verified successfully."}


@router.post(
    "/verify-email/resend",
    status_code=status.HTTP_200_OK,
    summary="Re-send the email verification link",
)
@limiter.limit(settings.rate_limit_resend_verification)
def resend_verification(
    request: Request,
    payload: ResendVerificationRequest,
    background_tasks: BackgroundTasks,
    db: DbSession = Depends(get_db),
):
    """
    Re-send the email verification link.

    Always returns 200 regardless of whether the email is registered or already
    verified — prevents user enumeration (OWASP ASVS V2.6.2).
    """
    raw_token = service.resend_verification_email(db, email=payload.email)
    if raw_token:
        background_tasks.add_task(send_verification_email, to=payload.email, raw_token=raw_token)
    return {"detail": "If the address is registered and unverified, a new link has been sent."}


# ---------------------------------------------------------------------------
# Password Reset
# ---------------------------------------------------------------------------

@router.post(
    "/forgot-password",
    status_code=status.HTTP_200_OK,
    summary="Request a password reset link",
)
@limiter.limit(settings.rate_limit_forgot_password)
def forgot_password(
    request: Request,
    payload: ForgotPasswordRequest,
    background_tasks: BackgroundTasks,
    db: DbSession = Depends(get_db),
):
    """
    Send a password reset link to the given email or phone.

    Always returns 200 regardless of whether the identifier is registered —
    prevents user enumeration (OWASP ASVS V2.6.2).
    """
    raw_token = service.forgot_password(db, identifier=payload.identifier)
    if raw_token:
        # Resolve email for sending (identifier could be phone)
        from app.user.service import get_user_by_email, get_user_by_phone
        if "@" in payload.identifier:
            user = get_user_by_email(db, payload.identifier)
        else:
            user = get_user_by_phone(db, payload.identifier)
        if user and user.email:
            background_tasks.add_task(
                send_password_reset_email, to=user.email, raw_token=raw_token
            )
    return {"detail": "If the account exists, a reset link has been sent."}


@router.post(
    "/reset-password",
    status_code=status.HTTP_200_OK,
    summary="Reset password using the one-time token",
    responses={400: {"description": "Invalid, expired, or already-used token"}},
)
def reset_password(payload: ResetPasswordRequest, db: DbSession = Depends(get_db)):
    """Reset the user's password using the one-time token from the reset email."""
    service.reset_password(db, raw_token=payload.token, new_password=payload.password)
    return {"detail": "Password reset successfully. All active sessions have been revoked."}


# ---------------------------------------------------------------------------
# Authentication
# ---------------------------------------------------------------------------

@router.post(
    "/login",
    response_model=TokenResponse,
    summary="Authenticate and obtain token pair",
    responses={
        401: {"description": "Invalid credentials"},
        403: {"description": "Account disabled or email not verified"},
        429: {"description": "Too many login attempts — rate limit exceeded"},
    },
)
@limiter.limit(settings.rate_limit_login)
def login(
    request: Request,
    payload: LoginRequest,
    db: DbSession = Depends(get_db),
):
    """
    Authenticate a user and issue an access + refresh token pair.

    The response includes `device_identifier` which the client **must** persist
    and send on subsequent logins to enable the one-session-per-device policy.
    Sending the same `device_identifier` on re-login ensures the previous
    session for that device is revoked before issuing new tokens.
    """
    access_token, refresh_token, device_identifier = service.authenticate(
        db,
        identifier=payload.identifier,
        password=payload.password,
        device_identifier=str(payload.device_identifier) if payload.device_identifier else None,
        device_name=payload.device_name,
        platform=payload.platform,
        app_version=payload.app_version,
        push_token=payload.push_token,
        ip_address=request.client.host if request.client else None,
        user_agent=request.headers.get("user-agent"),
    )
    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        device_identifier=device_identifier,
    )


@router.post(
    "/refresh",
    response_model=TokenResponse,
    summary="Rotate the refresh token",
    responses={
        401: {"description": "Invalid, expired, or replayed refresh token"},
        429: {"description": "Too many refresh attempts"},
    },
)
@limiter.limit(settings.rate_limit_refresh)
def refresh(
    request: Request,
    payload: RefreshRequest,
    db: DbSession = Depends(get_db),
):
    """
    Rotate the refresh token (Refresh Token Rotation — RTR).

    Every successful refresh invalidates the previous token and issues a new pair.
    Replaying an already-rotated token triggers breach detection: all sessions
    for that user are immediately revoked.
    """
    access_token, refresh_token = service.refresh_access_token(db, refresh_token=payload.refresh_token)
    return TokenResponse(access_token=access_token, refresh_token=refresh_token)


# ---------------------------------------------------------------------------
# Logout
# ---------------------------------------------------------------------------

@router.post(
    "/logout",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Revoke the current session",
    responses={401: {"description": "Not authenticated"}},
)
def logout(
    current_user: User = Depends(get_current_user),
    db: DbSession = Depends(get_db),
):
    """Revoke the session associated with the current access token."""
    session_id = getattr(current_user, "_current_session_id", None)
    if session_id:
        service.logout(db, session_id=session_id)
    return None


@router.post(
    "/logout-all",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Revoke all active sessions",
    responses={401: {"description": "Not authenticated"}},
)
def logout_all(
    current_user: User = Depends(get_current_user),
    db: DbSession = Depends(get_db),
):
    """Revoke all active sessions for the current user across all devices."""
    service.logout_all(db, user_id=current_user.id)
    return None


# ---------------------------------------------------------------------------
# Session Management
# ---------------------------------------------------------------------------

@router.get(
    "/sessions",
    response_model=list[SessionRead],
    summary="List active sessions",
)
def get_sessions(
    current_user: User = Depends(get_current_user),
    db: DbSession = Depends(get_db),
):
    """List all active, non-expired sessions for the current user."""
    sessions = service.get_user_sessions(db, user_id=current_user.id)
    current_sid = getattr(current_user, "_current_session_id", None)
    result = []
    for s in sessions:
        s_read = SessionRead.model_validate(s)
        s_read.is_current = s.id == current_sid
        result.append(s_read)
    return result


@router.delete(
    "/sessions/{session_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Revoke a specific session",
    responses={404: {"description": "Session not found"}},
)
def revoke_session(
    session_id: str,
    current_user: User = Depends(get_current_user),
    db: DbSession = Depends(get_db),
):
    """Revoke a specific session by ID. Users can only revoke their own sessions."""
    service.revoke_session(db, user_id=current_user.id, session_id=session_id)
    return None


# ---------------------------------------------------------------------------
# Device Management
# ---------------------------------------------------------------------------

@router.get(
    "/devices",
    response_model=list[DeviceRead],
    summary="List registered devices",
)
def get_devices(
    current_user: User = Depends(get_current_user),
    db: DbSession = Depends(get_db),
):
    """List all active devices registered to the current user."""
    return service.get_user_devices(db, user_id=current_user.id)


@router.get(
    "/devices/{device_id}",
    response_model=DeviceRead,
    summary="Get device details",
    responses={404: {"description": "Device not found"}},
)
def get_device(
    device_id: str,
    current_user: User = Depends(get_current_user),
    db: DbSession = Depends(get_db),
):
    """Get details of a specific device owned by the current user."""
    return service.get_device_by_id(db, user_id=current_user.id, device_id=device_id)


@router.patch(
    "/devices/{device_id}",
    response_model=DeviceRead,
    summary="Update device display name or trust status",
    responses={404: {"description": "Device not found"}},
)
def update_device(
    device_id: str,
    payload: DeviceUpdate,
    current_user: User = Depends(get_current_user),
    db: DbSession = Depends(get_db),
):
    """Update the user-editable fields of a device: friendly_name and trusted."""
    return service.update_device(
        db,
        user_id=current_user.id,
        device_id=device_id,
        friendly_name=payload.friendly_name,
        trusted=payload.trusted,
    )


@router.delete(
    "/devices/{device_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Deactivate a device",
    responses={404: {"description": "Device not found"}},
)
def deactivate_device(
    device_id: str,
    current_user: User = Depends(get_current_user),
    db: DbSession = Depends(get_db),
):
    """
    Soft-deactivate a device and revoke all its active sessions.

    The device record is retained for audit history (is_active=False).
    The device can be reactivated by logging in again from it.
    """
    service.deactivate_device(db, user_id=current_user.id, device_id=device_id)
    return None


# ---------------------------------------------------------------------------
# Internal / Ops — Cleanup
# ---------------------------------------------------------------------------

@internal_router.post(
    "/cleanup",
    summary="Run database cleanup jobs",
    description=(
        "Deletes expired tokens, revoked sessions, old login history, and "
        "abandoned unverified users. Protected by X-Internal-Key header. "
        "Intended to be called from a cron job, not by end users."
    ),
    responses={
        200: {"description": "Cleanup completed — returns counts of deleted records"},
        403: {"description": "Missing or invalid X-Internal-Key"},
    },
)
def run_cleanup(
    x_internal_key: str | None = Header(default=None, alias="X-Internal-Key"),
    db: DbSession = Depends(get_db),
):
    """
    Run all cleanup jobs synchronously and return deleted-row counts.

    Cron setup (run daily at 3am):
        0 3 * * *  curl -s -X POST https://api.medorax.com/internal/cleanup \\
                     -H "X-Internal-Key: $INTERNAL_API_KEY"
    """
    # Reject if no key is configured (prevents accidental exposure in dev).
    if not settings.internal_api_key:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Internal API key not configured. Set INTERNAL_API_KEY in environment.",
        )
    if x_internal_key != settings.internal_api_key:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid or missing X-Internal-Key header.",
        )

    results = run_all_cleanup(db)
    total = sum(results.values())
    return {
        "status": "ok",
        "total_deleted": total,
        "breakdown": results,
    }
