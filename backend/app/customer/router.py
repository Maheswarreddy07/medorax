from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session
from typing import Optional

from app.customer.schemas import CustomerResponseSchema, CustomerCreateSchema
from app.customer.service import CustomerService
from app.db.base import get_db

router = APIRouter(prefix="/api/customers", tags=["customers"])

@router.get("/", response_model=CustomerResponseSchema)
def get_customer_data(
    customerType: str = Query("All Customers"),
    search: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    service = CustomerService(db)
    return service.get_customer_workspace_data(customerType, search)

@router.post("/", status_code=status.HTTP_201_CREATED)
def create_customer(
    payload: CustomerCreateSchema,
    db: Session = Depends(get_db)
):
    service = CustomerService(db)
    return service.create_customer(payload)