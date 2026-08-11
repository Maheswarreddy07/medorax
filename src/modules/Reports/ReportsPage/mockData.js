export const salesData = {
  Daily: {
    stats: { sales: "₹42,134", revenue: "₹620K", transactions: "198", salesTrend: "1.2% vs yesterday", revenueTrend: "steady" },
    rows: [
      { date: "Oct 28, 2023", branch: "Branch 1", sales: "15 Items", trans: "22", rev: "₹4,134.20" },
      { date: "Oct 28, 2023", branch: "Branch 2", sales: "21 Items", trans: "31", rev: "₹8,002.45" },
      // ... rest of sales data
    ],
  },
  Weekly: {
    stats: { sales: "₹2,10,670", revenue: "₹3.1M", transactions: "987", salesTrend: "5.1% vs last week", revenueTrend: "growing" },
    rows: [
      { date: "Week 43, 2023", branch: "Branch 1", sales: "145 Items", trans: "221", rev: "₹41,342.05" },
      // ... rest of weekly data
    ],
  },
  Monthly: {
    stats: { sales: "₹8,42,686", revenue: "₹12.4M", transactions: "3,950", salesTrend: "2.4% vs last month", revenueTrend: "healthy" },
    rows: [
      // ... monthly data
    ],
  },
  Yearly: {
    stats: { sales: "₹10M+", revenue: "₹148M", transactions: "47,400", salesTrend: "12% vs last year", revenueTrend: "excellent" },
    rows: [
      // ... yearly data
    ],
  },
};

export const profitData = {
  Daily: {
    stats: { total: "₹12,450", margin: "24.5%", topProduct: "Paracetamol" },
    rows: [
      { date: "Oct 28, 2023", product: "Paracetamol 500mg", cost: "₹4,200", sale: "₹5,800", margin: "27.5%" },
      // ... rest of daily profit data
    ],
  },
  Weekly: {
    stats: { total: "₹85,200", margin: "25.1%", topProduct: "Amoxicillin" },
    rows: [
      { date: "Week 43", product: "Amoxicillin 250mg", cost: "₹15,500", sale: "₹22,100", margin: "29.8%" },
      // ... rest of weekly profit data
    ],
  },
  Monthly: {
    stats: { total: "₹3,45,600", margin: "26.2%", topProduct: "Azithromycin" },
    rows: [
      // ... monthly profit data
    ],
  },
  Yearly: {
    stats: { total: "₹42,50,000", margin: "27.8%", topProduct: "Paracetamol" },
    rows: [
      // ... yearly profit data
    ],
  },
};

export const purchaseData = {
  stats: { total: "₹4,52,300", amount: "₹6.1M", pending: "12" },
  rows: [
    { date: "Oct 28, 2023", supplier: "Global Pharma", items: "150 Boxes", amount: "₹82,686.41", status: "Delivered" },
    { date: "Oct 27, 2023", supplier: "MedLife Solutions", items: "200 Units", amount: "₹1,60,040.91", status: "Pending" },
    // ... rest of purchase data
  ],
};

export const inventoryData = {
  stats: { total: "45,230", expiring: "128", skus: "3,450" },
  rows: {
    "Stock Movement": [
      { date: "Oct 28, 2023", product: "Paracetamol 500mg", type: "Inward", qty: "+500", branch: "Branch 1" },
      // ... rest of stock movement data
    ],
    "Expiry Reports": [
      { product: "Amoxicillin 250mg", batch: "B-2391", expiry: "Nov 15, 2023", qty: "120", status: "Expiring Soon" },
      // ... rest of expiry data
    ],
  },
};

export const gstData = {
  stats: { taxable: "₹4,12,500", collected: "₹74,250", invoices: "145" },
  rows: [
    { invoice: "INV-2023-001", date: "2023-10-28", gstin: "27AADCB2230M1Z2", taxable: "₹12,500", amount: "₹2,250", type: "Sales" },
    // ... rest of GST data
  ],
};

export const customerData = {
  stats: { customers: "1,842", revenue: "₹28.6M", repeatRate: "64%" },
  rows: [
    { name: "Rahul Sharma", orders: "12", spend: "₹14,200", lastPurchase: "Oct 28, 2023", type: "Repeat" },
    // ... rest of customer data
  ],
};

export const supplierData = {
  stats: {
    totalSuppliers: "48",
    outstanding: "₹12,45,600",
    deliveryRate: "87%",
  },
  rows: [
    { name: "Global Pharma", totalSupplied: "₹18,40,000", lastOrder: "Oct 28, 2023", outstanding: "₹3,45,000" },
    // ... rest of supplier data
  ],
};