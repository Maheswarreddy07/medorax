export const tabData = {
  medicines: {
    headers: ["#", "Medicine Name", "Generic Name", "Category", "Batch No", "Expiry Date", "MRP", "Stock", "Supplier"],
    rows: [
      ["1", "Amox-500", "Amoxicillin", "Antibiotic", "B101", "2025-10", "120.00", "500", "PharmaCo"],
      ["2", "Para-500", "Paracetamol", "Analgesic", "B102", "2026-01", "40.00", "1200", "HealthInc"],
      ["3", "Ibu-400", "Ibuprofen", "NSAID", "B103", "2024-05", "85.00", "350", "PharmaCo", true, "Missing Expiry"],
      ["4", "Cetri-10", "Cetirizine", "Antihistamine", "B104", "2025-12", "35.00", "800", "MedLife"],
      ["5", "Azi-250", "Azithromycin", "Antibiotic", "B105", "2025-08", "150.00", "400", "HealthInc"],
    ],
    errorRowIdx: 2,
  },
  customers: {
    headers: ["#", "Customer Name", "Phone", "Email", "Address", "City", "Type", "Credit Limit"],
    rows: [
      ["1", "John Doe", "555-0101", "john@email.com", "123 Main St", "NY", "Retail", "1000"],
      ["2", "Jane Smith", "555-0102", "jane@email.com", "456 Oak Ave", "LA", "Wholesale", "5000"],
      ["3", "Bob Johnson", "555-0103", "bob@email.com", "789 Pine Rd", "CHI", "Retail", "1500"],
      ["4", "Alice Brown", "INVALID", "alice.com", "321 Elm St", "HOU", "Retail", "2000", true, "Invalid Phone/Email"],
      ["5", "Charlie Davis", "555-0105", "charlie@email.com", "654 Maple Dr", "PHX", "Wholesale", "10000"],
    ],
    errorRowIdx: 3,
  },
  suppliers: {
    headers: ["#", "Supplier Name", "Contact Person", "Phone", "Email", "City", "GST No", "Payment Terms"],
    rows: [
      ["1", "PharmaCo", "Tom Wilson", "555-0201", "tom@pharmaco.com", "NY", "GST12345", "Net 30"],
      ["2", "HealthInc", "Sarah Lee", "555-0202", "sarah@healthinc.com", "NJ", "GST23456", "Net 45"],
      ["3", "MedLife", "Mike Chen", "555-0203", "mike@medlife.com", "CA", "GST34567", "Net 15"],
      ["4", "BioCare", "Anna Jones", "555-0204", "anna@biocare.com", "TX", "", "Net 30", true, "Missing GST"],
      ["5", "GlobalMeds", "David Kim", "555-0205", "david@globalmeds.com", "IL", "GST56789", "Net 60"],
    ],
    errorRowIdx: 3,
  },
};

export const importHistory = [
  { date: "Today, 10:42 AM", file: "suppliers_q3.csv", type: "Suppliers", rows: 45, status: "Completed" },
  { date: "Yesterday, 14:15 PM", file: "customers_batch_1.xlsx", type: "Customers", rows: 128, status: "Completed" },
  { date: "Dec 28, 2023", file: "medicines_reorder.csv", type: "Medicines", rows: 67, status: "Completed" },
  { date: "Dec 22, 2023", file: "suppliers_q4.xlsx", type: "Suppliers", rows: 32, status: "Failed" },
  { date: "Dec 15, 2023", file: "customers_holiday.xlsx", type: "Customers", rows: 89, status: "Completed" },
];

export const exportColumns = [
  "SKU",
  "Name",
  "Category",
  "Batch No.",
  "Expiry Date",
  "Quantity",
  "Unit Price",
  "Supplier ID",
  "Status",
];