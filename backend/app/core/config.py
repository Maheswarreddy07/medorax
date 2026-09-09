"""
app/core/config.py

Application settings loaded from environment variables / .env file.

All operational parameters live here. No hardcoded values anywhere else.
This satisfies 12-Factor App principle #3 (config in the environment).
"""

from pydantic import model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # ── Database ──────────────────────────────────────────────────────────────
    database_url: str = "sqlite:///./medorax.db"

    # ── JWT ───────────────────────────────────────────────────────────────────
    jwt_secret: str = "change-this-in-local-development-must-be-32-chars"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 15
    refresh_token_expire_days: int = 30

    # ── Business Rules ────────────────────────────────────────────────────────
    email_required: bool = True
    phone_required: bool = False
    max_active_devices: int | None = None
    require_phone_verification_for_login: bool = False

    # ── Email ─────────────────────────────────────────────────────────────────
    # Provider: "console" (dev/test) | "smtp" | "resend"
    # "console" logs the token to stdout only — never use in production.
    email_provider: str = "console"
    email_from: str = "noreply@medorax.com"
    email_from_name: str = "Medorax"

    # SMTP settings (used when email_provider="smtp")
    smtp_host: str = "localhost"
    smtp_port: int = 587
    smtp_user: str = ""
    smtp_password: str = ""
    smtp_use_tls: bool = True
    smtp_timeout_seconds: int = 10

    # Resend settings (used when email_provider="resend")
    resend_api_key: str = ""
    resend_timeout_seconds: int = 10

    # Base URL for email link generation (e.g., verify-email links)
    # Must be set to the production domain. Example: https://app.medorax.com
    app_base_url: str = "http://localhost:8000"

    # ── Cleanup Retention ────────────────────────────────────────────────────
    # All values are thresholds: records OLDER than these values are eligible
    # for deletion. Tune per compliance / business requirements.
    cleanup_verification_token_hours: int = 48
    cleanup_password_reset_token_hours: int = 2
    cleanup_revoked_session_days: int = 30
    cleanup_login_history_days: int = 90
    # Unverified users older than this with no sessions are eligible for deletion.
    cleanup_unverified_user_days: int = 7

    # ── Rate Limiting ─────────────────────────────────────────────────────────
    # Format: "N/period" where period is second|minute|hour|day
    # These feed directly into slowapi @limiter.limit() decorators.
    rate_limit_login: str = "10/minute"
    rate_limit_register: str = "5/minute"
    rate_limit_forgot_password: str = "5/minute"
    rate_limit_resend_verification: str = "3/minute"
    rate_limit_refresh: str = "30/minute"

    # ── CORS ──────────────────────────────────────────────────────────────────
    cors_origins: str | list[str] = "*"

    # ── Internal / Ops ────────────────────────────────────────────────────────
    internal_api_key: str = ""

    # ── Background Tasks (Celery) & Redis ─────────────────────────────────────
    redis_url: str = "redis://localhost:6379/0"
    celery_broker_url: str = "redis://localhost:6379/0"
    celery_result_backend: str = "redis://localhost:6379/1"

    # ── Object Storage (S3 / MinIO) ───────────────────────────────────────────
    storage_endpoint: str = "http://localhost:9000"
    storage_access_key: str = "minioadmin"
    storage_secret_key: str = "minioadmin"
    storage_secure: bool = False
    storage_bucket_prescriptions: str = "prescriptions"
    storage_bucket_documents: str = "documents"

    # ── AI / ML / Search (Optional) ───────────────────────────────────────────
    elasticsearch_url: str | None = None
    llm_api_key: str | None = None
    llm_base_url: str | None = None
    llm_model: str = "qwen-plus"

    # ── Validators ────────────────────────────────────────────────────────────

    @model_validator(mode="after")
    def validate_production_secrets(self) -> "Settings":
        """
        Enforce minimum security requirements for production-sensitive values.
        Prevents accidental deployment with weak or default secrets.
        """
        # Block deployment with the known-bad development secret.
        _known_bad = {"CHANGE_ME_DEV_ONLY_SECRET", "secret", "changeme", ""}
        if self.jwt_secret in _known_bad:
            raise ValueError(
                "JWT_SECRET is set to an insecure default. "
                "Generate one with: python -c \"import secrets; print(secrets.token_urlsafe(32))\""
            )
        if len(self.jwt_secret) < 32:
            raise ValueError(
                f"JWT_SECRET must be at least 32 characters. Got {len(self.jwt_secret)}."
            )

        # Warn when non-console email provider is configured without credentials.
        if self.email_provider == "smtp" and not self.smtp_host:
            raise ValueError("SMTP_HOST must be set when EMAIL_PROVIDER=smtp")
        if self.email_provider == "resend" and not self.resend_api_key:
            raise ValueError("RESEND_API_KEY must be set when EMAIL_PROVIDER=resend")

        return self

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()