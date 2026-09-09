from sqlalchemy.orm import Session
from app.core.exceptions import NotFoundException
from app.supplier.models import Supplier
from app.supplier.repository import SupplierRepository
from app.supplier.schemas import SupplierCreate, SupplierUpdate

class SupplierService:

    @staticmethod
    def create_supplier(db: Session, pharmacy_id: str, data: SupplierCreate) -> Supplier:
        return SupplierRepository.create_supplier(db, pharmacy_id, data)

    @staticmethod
    def get_supplier(db: Session, pharmacy_id: str, supplier_id: str) -> Supplier:
        supplier = SupplierRepository.get_supplier(db, pharmacy_id, supplier_id)
        if not supplier:
            raise NotFoundException("Supplier")
        return supplier

    @staticmethod
    def list_suppliers(db: Session, pharmacy_id: str, query: str = None) -> list[Supplier]:
        return SupplierRepository.get_suppliers(db, pharmacy_id, query)

    @staticmethod
    def update_supplier(db: Session, pharmacy_id: str, supplier_id: str, data: SupplierUpdate) -> Supplier:
        supplier = SupplierService.get_supplier(db, pharmacy_id, supplier_id)
        return SupplierRepository.update_supplier(db, supplier, data)

    @staticmethod
    def delete_supplier(db: Session, pharmacy_id: str, supplier_id: str) -> None:
        supplier = SupplierService.get_supplier(db, pharmacy_id, supplier_id)
        SupplierRepository.delete_supplier(db, supplier)
