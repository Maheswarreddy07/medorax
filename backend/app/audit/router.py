from datetime import datetime
from fastapi import APIRouter, Depends, Query, UploadFile, File, Form, Request, status
from sqlalchemy.orm import Session
from typing import List, Optional

from app.db.base import get_db
from app.shared.deps import get_current_user
from app.user.models import User
from app.staff.service import get_current_pharmacy_id
from app.staff.permissions import Permissions
from app.audit.schemas import AuditLogResponse, DocumentResponse
from app.audit.service import AuditService

router = APIRouter(tags=["Audit & Compliance"])

# --- Audit Trail ---

@router.get("/audit-logs", response_model=List[AuditLogResponse])
def get_audit_logs(
    action_type: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    user_id: Optional[str] = Query(None),
    entity_type: Optional[str] = Query(None),
    limit: int = Query(100, ge=1, le=500),
    offset: int = Query(0, ge=0),
    pharmacy_id: Optional[str] = Query(None, description="Optional Pharmacy ID context"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    active_pharmacy_id = get_current_pharmacy_id(db, current_user.id, pharmacy_id, Permissions.AUDIT_READ.code)
    return AuditService.get_logs(
        db=db,
        pharmacy_id=active_pharmacy_id,
        action_type=action_type,
        category=category,
        user_id=user_id,
        entity_type=entity_type,
        limit=limit,
        offset=offset,
    )


# --- Document Management ---

@router.get("/documents", response_model=List[DocumentResponse])
def list_documents(
    category: Optional[str] = Query(None),
    entity_id: Optional[str] = Query(None),
    pharmacy_id: Optional[str] = Query(None, description="Optional Pharmacy ID context"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    active_pharmacy_id = get_current_pharmacy_id(db, current_user.id, pharmacy_id, Permissions.DOCUMENT_READ.code)
    return AuditService.list_documents(db, active_pharmacy_id, category, entity_id)

@router.post("/documents/upload", response_model=DocumentResponse, status_code=status.HTTP_201_CREATED)
def upload_document(
    request: Request,
    title: str = Form(...),
    category: str = Form(..., description="e.g. Drug License, GST Certificate, Purchase Bills, Supplier Documents"),
    entity_id: Optional[str] = Form(None),
    expiry_date: Optional[datetime] = Form(None),
    file: UploadFile = File(...),
    pharmacy_id: Optional[str] = Query(None, description="Optional Pharmacy ID context"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    active_pharmacy_id = get_current_pharmacy_id(db, current_user.id, pharmacy_id, Permissions.DOCUMENT_MANAGE.code)
    client_ip = request.client.host if request.client else "unknown"
    return AuditService.upload_document(
        db=db,
        pharmacy_id=active_pharmacy_id,
        user_id=current_user.id,
        user_email=current_user.email or "unknown",
        title=title,
        category=category,
        file=file,
        entity_id=entity_id,
        expiry_date=expiry_date,
        ip_address=client_ip,
    )

@router.get("/documents/{document_id}/download")
def get_document_download_url(
    document_id: str,
    pharmacy_id: Optional[str] = Query(None, description="Optional Pharmacy ID context"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    active_pharmacy_id = get_current_pharmacy_id(db, current_user.id, pharmacy_id, Permissions.DOCUMENT_READ.code)
    url = AuditService.get_document_url(db, active_pharmacy_id, document_id)
    return {"download_url": url}
