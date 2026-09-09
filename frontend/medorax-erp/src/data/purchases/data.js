export const initialReceivedItems = [
  { id: 1, name: "Ibuprofen 400mg", ordered: 100, received: 100, batch: "IBU-001", expiry: "2026-10" },
  { id: 2, name: "Vitamin D3 60K UI", ordered: 200, received: 200, batch: "VIT-D-22", expiry: "2025-05" },
];

export const poOptions = [
  "PO-2026-0138 (Global Pharma)",
  "PO-2026-0141 (MedLife Solutions)",
  "PO-2026-0142 (BioCare Dist.)",
];

export const creditNotes = [
  { number: "CN-2024-001", date: "Oct 20, 2024", amount: 150.0, status: "APPLIED" },
  { number: "CN-2024-045", date: "Oct 25, 2024", amount: 45.5, status: "PENDING" },
];

export const returnReasons = ["Damaged Goods", "Expired Near Expiry", "Wrong Item Supplied", "Other"];

// --- Purchase Order data ---
export const initialOrderItems = [
  { id: "item-1", product: "paracetamol", sku: "PARA-500", qty: 100, unit: "boxes", price: 12.5, tax: 0 },
  { id: "item-2", product: "amoxicillin", sku: "AMOX-250", qty: 50, unit: "boxes", price: 45.0, tax: 0.05 },
  { id: "item-3", product: "ibuprofen", sku: "IBU-400", qty: 200, unit: "packs", price: 8.2, tax: 0 },
];

export const productOptions = [
  { id: "paracetamol", name: "Paracetamol 500mg", sku: "PARA-500", price: 12.5 },
  { id: "amoxicillin", name: "Amoxicillin 250mg", sku: "AMOX-250", price: 45.0 },
  { id: "ibuprofen", name: "Ibuprofen 400mg", sku: "IBU-400", price: 8.2 },
  { id: "vitamin-d3", name: "Vitamin D3 1000IU", sku: "VIT-D3", price: 15.0 },
];

export const unitOptions = ["boxes", "units", "packs"];
export const taxOptions = [0, 0.05, 0.12, 0.18];
export const supplierOptions = [
  "Select Supplier",
  "Global Pharma",
  "MedLife Solutions",
  "BioCare Dist.",
  "HealthLink",
  "Reliant Pharma",
];
export const locationOptions = [
  "Main Warehouse - North Wing",
  "Downtown Clinic Pharmacy",
  "Westside Care Center",
];