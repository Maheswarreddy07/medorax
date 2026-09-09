from datetime import datetime, timezone, timedelta
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.customer.models import Customer
from app.customer.schemas import CustomerCreateSchema

class CustomerRepository:
    def __init__(self, db: Session):
        self.db = db

    def seed_initial_data_if_empty(self):
        if self.db.query(Customer).count() == 0:
            now = datetime.now(timezone.utc)
            sample_customers = [
                Customer(pharmacy_id="ph_main", customer_name="Rajesh Kumar", name="Rajesh Kumar", type="VIP", mobile_number="9876543210", phone="9876543210", orders=18, spend=24500.0, last_purchase=now - timedelta(days=1)),
                Customer(pharmacy_id="ph_main", customer_name="Priya Sharma", name="Priya Sharma", type="Regular", mobile_number="9876543211", phone="9876543211", orders=7, spend=8900.0, last_purchase=now - timedelta(days=2)),
                Customer(pharmacy_id="ph_main", customer_name="Amit Patel", name="Amit Patel", type="VIP", mobile_number="9876543212", phone="9876543212", orders=24, spend=36200.0, last_purchase=now - timedelta(days=3)),
                Customer(pharmacy_id="ph_main", customer_name="Sunita Verma", name="Sunita Verma", type="Regular", mobile_number="9876543213", phone="9876543213", orders=5, spend=5400.0, last_purchase=now - timedelta(days=5)),
                Customer(pharmacy_id="ph_main", customer_name="Vikram Singh", name="Vikram Singh", type="New", mobile_number="9876543214", phone="9876543214", orders=1, spend=1250.0, last_purchase=now - timedelta(days=6)),
                Customer(pharmacy_id="ph_main", customer_name="Ananya Roy", name="Ananya Roy", type="Regular", mobile_number="9876543215", phone="9876543215", orders=9, spend=11200.0, last_purchase=now - timedelta(days=7)),
                Customer(pharmacy_id="ph_main", customer_name="Suresh Reddy", name="Suresh Reddy", type="VIP", mobile_number="9876543216", phone="9876543216", orders=15, spend=19800.0, last_purchase=now - timedelta(days=8)),
                Customer(pharmacy_id="ph_main", customer_name="Meera Joshi", name="Meera Joshi", type="New", mobile_number="9876543217", phone="9876543217", orders=1, spend=850.0, last_purchase=now - timedelta(days=10)),
                Customer(pharmacy_id="ph_main", customer_name="Karan Malhotra", name="Karan Malhotra", type="Regular", mobile_number="9876543218", phone="9876543218", orders=4, spend=4600.0, last_purchase=now - timedelta(days=12)),
                Customer(pharmacy_id="ph_main", customer_name="Ritu Gupta", name="Ritu Gupta", type="VIP", mobile_number="9876543219", phone="9876543219", orders=12, spend=15700.0, last_purchase=now - timedelta(days=14)),
            ]
            self.db.add_all(sample_customers)
            self.db.commit()

    def get_stats(self):
        total_customers = self.db.query(Customer).count()
        total_revenue = self.db.query(func.sum(Customer.spend)).scalar() or 0.0
        
        repeat_customers = self.db.query(Customer).filter(Customer.orders > 1).count()
        repeat_rate = (repeat_customers / total_customers * 100) if total_customers > 0 else 0.0

        if total_revenue >= 1_000_000:
            revenue_str = f"₹{total_revenue / 1_000_000:.1f}M"
        else:
            revenue_str = f"₹{total_revenue:,.0f}"

        return {
            "customers": f"{total_customers:,}",
            "revenue": revenue_str,
            "repeatRate": f"{repeat_rate:.0f}%"
        }

    def get_rows(self, customer_type: str = "All Customers", search: str = None):
        query = self.db.query(Customer)

        if customer_type and customer_type != "All Customers":
            ctype_lower = customer_type.strip().lower()
            if ctype_lower == "repeat":
                query = query.filter(Customer.orders > 1)
            elif ctype_lower == "one-time" or ctype_lower == "one time":
                query = query.filter(Customer.orders == 1)
            else:
                query = query.filter(Customer.type.ilike(customer_type.strip()))

        if search and search.strip():
            search_term = f"%{search.strip()}%"
            query = query.filter(
                (Customer.name.ilike(search_term)) | 
                (Customer.customer_name.ilike(search_term)) | 
                (Customer.type.ilike(search_term)) |
                (Customer.phone.ilike(search_term))
            )

        db_customers = query.order_by(Customer.orders.desc()).all()

        return [
            {
                "id": str(c.id),
                "name": c.name or c.customer_name or "Unnamed Customer",
                "type": c.type or "Regular",
                "orders": c.orders or 0,
                "spend": f"₹{(c.spend or 0.0):,.0f}",
                "lastPurchase": c.last_purchase.strftime("%b %d, %Y") if c.last_purchase else "N/A"
            }
            for c in db_customers
        ]

    def create_customer(self, data: CustomerCreateSchema):
        cname = data.name.strip()
        customer = Customer(
            pharmacy_id="ph_main",
            customer_name=cname,
            name=cname,
            type=data.type or "Regular",
            phone=data.phone,
            email=data.email,
            orders=data.orders or 1,
            spend=data.spend or 0.0,
            last_purchase=datetime.now(timezone.utc)
        )
        self.db.add(customer)
        self.db.commit()
        self.db.refresh(customer)
        return customer

    def record_purchase(self, customer_name: str, spend_amount: float):
        if not customer_name:
            return None
        cname = customer_name.strip()
        customer = self.db.query(Customer).filter(
            (Customer.name.ilike(cname)) | (Customer.customer_name.ilike(cname))
        ).first()
        now = datetime.now(timezone.utc)
        if customer:
            customer.orders = (customer.orders or 0) + 1
            customer.spend = (customer.spend or 0.0) + float(spend_amount)
            customer.last_purchase = now
            if customer.orders >= 10:
                customer.type = "VIP"
            elif customer.orders > 1:
                customer.type = "Regular"
        else:
            customer = Customer(
                pharmacy_id="ph_main",
                customer_name=cname,
                name=cname,
                type="New",
                orders=1,
                spend=float(spend_amount),
                last_purchase=now
            )
            self.db.add(customer)
        self.db.commit()
        self.db.refresh(customer)
        return customer