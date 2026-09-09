from sqlalchemy.orm import Session
from app.customer.repository import CustomerRepository
from app.customer.schemas import CustomerCreateSchema

class CustomerService:
    def __init__(self, db: Session):
        self.repository = CustomerRepository(db)

    def get_customer_workspace_data(self, customer_type: str = "All Customers", search: str = None):
        self.repository.seed_initial_data_if_empty()
        stats = self.repository.get_stats()
        rows = self.repository.get_rows(customer_type, search)
        return {
            "stats": stats,
            "rows": rows
        }

    def create_customer(self, data: CustomerCreateSchema):
        return self.repository.create_customer(data)

    def record_purchase(self, customer_name: str, spend_amount: float):
        return self.repository.record_purchase(customer_name, spend_amount)