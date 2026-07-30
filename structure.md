# Medorax ERP - Project Structure

```
src/
│
├── assets/
│
├── pages/
│   │
│   ├── Authentication/
│   │   ├── Login.jsx
│   │   ├── ForgotPassword.jsx
│   │   └── ResetPassword.jsx
│   │
│   ├── SupplierManagement/
│   │   ├── Dashboard.jsx
│   │   ├── Suppliers.jsx
│   │   ├── PurchaseOrders.jsx
│   │   ├── Payments.jsx
│   │   └── Reports.jsx
│   │
│   ├── Inventory/
│   ├── Billing/
│   └── HR/
│
├── components/
│   │
│   ├── ui/                     # Global reusable components
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   └── Modal.jsx
│   │
│   ├── supplierManagement/
│   │   ├── dashboard/
│   │   │   ├── DashboardHeader.jsx
│   │   │   ├── KpiCards.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── SupplierRow.jsx
│   │   │   ├── SupplierTable.jsx
│   │   │   └── Topbar.jsx
│   │   │
│   │   ├── suppliers/
│   │   ├── purchaseOrders/
│   │   ├── payments/
│   │   └── reports/
│   │
│   ├── authentication/
│   ├── navbar/
│   ├── sidebar/
│   └── common/
│
├── services/
├── store/
├── hooks/
├── utils/
├── routes/
│   └── Router.jsx
│
├── App.jsx
├── main.jsx
└── index.css