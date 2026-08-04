import React, { useState, useCallback, useMemo, useRef } from "react";
import {
  ChevronDown,
  Plus,
  Trash2,
  Send,
  X,
  HelpCircle,
  Bell,
  Menu,
  ShoppingCart,
  Package,
  Truck,
  Users,
  ClipboardList,
  Settings,
  LogOut,
  LayoutDashboard,
  FileText,
  AlertCircle,
} from "lucide-react";

const initialItems = [
  {
    id: "item-1",
    product: "paracetamol",
    sku: "PARA-500",
    qty: 100,
    unit: "boxes",
    price: 12.5,
    tax: 0,
  },
  {
    id: "item-2",
    product: "amoxicillin",
    sku: "AMOX-250",
    qty: 50,
    unit: "boxes",
    price: 45.0,
    tax: 0.05,
  },
  {
    id: "item-3",
    product: "ibuprofen",
    sku: "IBU-400",
    qty: 200,
    unit: "packs",
    price: 8.2,
    tax: 0,
  },
];

const productOptions = [
  { id: "paracetamol", name: "Paracetamol 500mg", sku: "PARA-500", price: 12.5 },
  { id: "amoxicillin", name: "Amoxicillin 250mg", sku: "AMOX-250", price: 45.0 },
  { id: "ibuprofen", name: "Ibuprofen 400mg", sku: "IBU-400", price: 8.2 },
  { id: "vitamin-d3", name: "Vitamin D3 1000IU", sku: "VIT-D3", price: 15.0 },
];

const unitOptions = ["boxes", "units", "packs"];
const taxOptions = [0, 0.05, 0.12, 0.18];
const supplierOptions = [
  "Select Supplier",
  "Global Pharma",
  "MedLife Solutions",
  "BioCare Dist.",
  "HealthLink",
  "Reliant Pharma",
];
const locationOptions = [
  "Main Warehouse - North Wing",
  "Downtown Clinic Pharmacy",
  "Westside Care Center",
];

export default function PurchaseOrderPage() {
  const [poNumber] = useState("PO-2026-0142");
  const [supplier, setSupplier] = useState("");
  const [location, setLocation] = useState("Main Warehouse - North Wing");
  const [poDate, setPoDate] = useState("2024-10-25");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [refNumber, setRefNumber] = useState("");
  const [items, setItems] = useState(initialItems);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const calculateItemTotal = useCallback((qty, price, tax) => {
    const subtotal = qty * price;
    return subtotal + subtotal * tax;
  }, []);

  const calculateTotals = useCallback(() => {
    let subtotal = 0;
    let taxTotal = 0;

    items.forEach((item) => {
      const itemSubtotal = item.qty * item.price;
      const itemTax = itemSubtotal * item.tax;
      subtotal += itemSubtotal;
      taxTotal += itemTax;
    });

    return { subtotal, taxTotal, grandTotal: subtotal + taxTotal };
  }, [items]);

  const totals = useMemo(() => calculateTotals(), [calculateTotals]);

  const updateItem = useCallback((id, field, value) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const updated = { ...item, [field]: value };
        if (field === "product") {
          const product = productOptions.find((p) => p.id === value);
          if (product) {
            updated.sku = product.sku;
            updated.price = product.price;
          }
        }
        return updated;
      })
    );
  }, []);

  const addItem = useCallback(() => {
    const newId = `item-${Date.now()}`;
    setItems((prev) => [
      ...prev,
      {
        id: newId,
        product: "",
        sku: "",
        qty: 1,
        unit: "units",
        price: 0,
        tax: 0,
      },
    ]);
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const getProductName = (id) => {
    const product = productOptions.find((p) => p.id === id);
    return product ? product.name : "Select Product...";
  };

  const handleSubmit = () => {
    if (!supplier) {
      setToastMessage("Please select a supplier");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setToastMessage("Purchase Order submitted successfully!");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1500);
  };

  const handleSaveDraft = () => {
    setToastMessage("Purchase Order saved as draft");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F8FAFC]">
      {showToast && (
        <div className="fixed top-[80px] right-6 bg-white border border-[#E2E8F0] shadow-lg rounded-lg p-4 flex items-center gap-3 z-50 max-w-sm animate-in slide-in-from-top-2 fade-in duration-300">
          <div className="bg-emerald-100 p-2 rounded-full text-emerald-800 flex-shrink-0">
            <AlertCircle size={20} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#0F172A]">Success</h4>
            <p className="text-xs text-[#64748B]">{toastMessage}</p>
          </div>
          <button
            className="ml-auto text-[#64748B] hover:text-[#0F172A] transition"
            onClick={() => setShowToast(false)}
          >
            <X size={18} />
          </button>
        </div>
      )}

      <main className="flex-1 overflow-y-auto p-6 pb-32">
        <div className="max-w-7xl mx-auto space-y-6">
          <h2 className="font-headline-lg-mobile md:hidden text-[#0F172A] mb-4 font-bold tracking-tight">
            Create Purchase Order
          </h2>

          {/* Order Details */}
          <section className="bg-white rounded-xs shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] border border-[#E2E8F0] p-6">
            <div className="border-b border-outline-variant/20 pb-4 mb-6 flex justify-between items-start">
              <div>
                <h3 className="font-title-lg text-[#0F172A]">Order Details</h3>
                <p className="text-sm text-[#64748B] mt-1">Basic information for this purchase order.</p>
              </div>
              <div className="text-right">
                <span className="font-label-md uppercase tracking-wider block mb-1 text-[#64748B]">PO Number</span>
                <span className="font-label-md text-[#004ac6] bg-[#e6eeff] px-3 py-1 rounded-xs font-bold">
                  {poNumber}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex flex-col gap-1.5 lg:col-span-2">
                <label className="font-label-md text-[#0F172A]">Supplier *</label>
                <div className="relative">
                  <select
                    value={supplier}
                    onChange={(e) => setSupplier(e.target.value)}
                    className="w-full bg-white border border-[#E2E8F0] rounded-xs px-3 py-2 text-[#0F172A] appearance-none focus:border-[#13B8A7] focus:ring-1 focus:ring-[#13B8A7] font-body-md shadow-sm outline-none"
                  >
                    <option disabled value="">
                      Select Supplier
                    </option>
                    {supplierOptions.slice(1).map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737686] pointer-events-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5 lg:col-span-2">
                <label className="font-label-md text-[#0F172A]">Delivery Location *</label>
                <div className="relative">
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-white border border-[#E2E8F0] rounded-xs px-3 py-2 text-[#0F172A] appearance-none focus:border-[#13B8A7] focus:ring-1 focus:ring-[#13B8A7] font-body-md shadow-sm outline-none"
                  >
                    {locationOptions.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737686] pointer-events-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-label-md text-[#0F172A]">PO Date *</label>
                <input
                  type="date"
                  value={poDate}
                  onChange={(e) => setPoDate(e.target.value)}
                  className="w-full bg-white border border-[#E2E8F0] rounded-xs px-3 py-2 text-[#0F172A] focus:border-[#13B8A7] focus:ring-1 focus:ring-[#13B8A7] font-body-md shadow-sm outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-label-md text-[#0F172A]">Expected Delivery</label>
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full bg-white border border-[#E2E8F0] rounded-xs px-3 py-2 text-[#0F172A] focus:border-[#13B8A7] focus:ring-1 focus:ring-[#13B8A7] font-body-md shadow-sm outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5 lg:col-span-2">
                <label className="font-label-md text-[#0F172A]">Supplier Reference (Optional)</label>
                <input
                  type="text"
                  value={refNumber}
                  onChange={(e) => setRefNumber(e.target.value)}
                  placeholder="e.g. Q-10293"
                  className="w-full bg-white border border-[#E2E8F0] rounded-xs px-3 py-2 text-[#0F172A] focus:border-[#13B8A7] focus:ring-1 focus:ring-[#13B8A7] font-body-md shadow-sm outline-none placeholder:text-[#94A3B8]"
                />
              </div>
            </div>
          </section>

          {/* Line Items */}
          <section className="bg-white rounded-xs shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] border border-[#E2E8F0] overflow-hidden">
            <div className="border-b border-outline-variant/20 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-[#F8FAFC]">
              <div>
                <h3 className="font-title-lg text-[#0F172A]">Line Items</h3>
                <p className="text-sm text-[#64748B] mt-1">Add pharmaceutical products to this order.</p>
              </div>
              <button
                onClick={addItem}
                className="flex items-center gap-2 px-4 py-2 border rounded-xs font-label-md transition-colors hover:bg-[rgba(15,82,186,0.05)]"
                style={{ border: "1px solid #0F52BA", color: "#0F52BA" }}
              >
                <Plus size={18} />
                <span>Add Item</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#F8FAFC] border-b border-outline-variant/20 font-label-md text-[#0F172A] uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-3 px-4 font-semibold w-1/3 min-w-[250px]">Product Name</th>
                    <th className="py-3 px-4 font-semibold w-32">SKU</th>
                    <th className="py-3 px-4 font-semibold w-24">Qty</th>
                    <th className="py-3 px-4 font-semibold w-28">Unit</th>
                    <th className="py-3 px-4 font-semibold w-32">Price (₹)</th>
                    <th className="py-3 px-4 font-semibold w-28">Tax</th>
                    <th className="py-3 px-4 font-semibold w-32 text-right">Total (₹)</th>
                    <th className="py-3 px-4 font-semibold w-12 text-center"></th>
                  </tr>
                </thead>
                <tbody className="font-body-md text-[#475569] divide-y divide-[#E2E8F0]">
                  {items.map((item, index) => {
                    const itemTotal = calculateItemTotal(item.qty, item.price, item.tax);
                    const bgClass = index % 2 === 0 ? "bg-white" : "bg-slate-50/50";
                    return (
                      <tr key={item.id} className={`hover:bg-slate-50 transition-colors ${bgClass}`}>
                        <td className="py-3 px-4">
                          <select
                            value={item.product}
                            onChange={(e) => updateItem(item.id, "product", e.target.value)}
                            className="w-full bg-transparent border border-transparent hover:border-[#E2E8F0] rounded px-2 py-1 focus:bg-white focus:border-[#13B8A7] outline-none font-sans text-[#0F172A]"
                          >
                            <option value="">Select Product...</option>
                            {productOptions.map((p) => (
                              <option key={p.id} value={p.id}>
                                {p.name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="text"
                            value={item.sku}
                            readOnly
                            className="w-full bg-transparent border-none p-0 text-[#64748B] focus:ring-0 font-data-mono outline-none"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="number"
                            min="1"
                            value={item.qty}
                            onChange={(e) => updateItem(item.id, "qty", parseFloat(e.target.value) || 0)}
                            className="w-full bg-white border border-[#E2E8F0] rounded px-2 py-1 focus:border-[#13B8A7] outline-none text-right"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={item.unit}
                            onChange={(e) => updateItem(item.id, "unit", e.target.value)}
                            className="w-full bg-white border border-[#E2E8F0] rounded px-2 py-1 focus:border-[#13B8A7] outline-none"
                          >
                            {unitOptions.map((u) => (
                              <option key={u} value={u}>
                                {u.charAt(0).toUpperCase() + u.slice(1)}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="number"
                            step="0.01"
                            value={item.price}
                            onChange={(e) => updateItem(item.id, "price", parseFloat(e.target.value) || 0)}
                            className="w-full bg-white border border-[#E2E8F0] rounded px-2 py-1 focus:border-[#13B8A7] outline-none text-right font-data-mono"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={item.tax}
                            onChange={(e) => updateItem(item.id, "tax", parseFloat(e.target.value))}
                            className="w-full bg-white border border-[#E2E8F0] rounded px-2 py-1 focus:border-[#13B8A7] outline-none"
                          >
                            {taxOptions.map((t) => (
                              <option key={t} value={t}>
                                {t * 100}%
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="py-3 px-4 text-right font-bold text-[#0F172A] font-data-mono">
                          {itemTotal.toFixed(2)}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-[#94A3B8] hover:text-red-600 transition-colors p-1"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          {/* Bottom Layout: Notes & Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <section className="lg:col-span-2 bg-white rounded-xs shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] border border-[#E2E8F0] p-6 flex flex-col">
              <label className="font-title-lg text-[#0F172A] mb-2 block">Notes &amp; Remarks</label>
              <p className="text-sm text-[#64748B] mb-4">Internal notes or specific instructions for the supplier.</p>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Enter terms of delivery, special handling instructions, etc..."
                className="w-full flex-1 min-h-[120px] bg-white border border-[#E2E8F0] rounded-xs p-3 text-[#0F172A] focus:border-[#13B8A7] focus:ring-1 focus:ring-[#13B8A7] font-body-md shadow-sm outline-none resize-none placeholder:text-[#94A3B8]"
              ></textarea>
            </section>

            <section className="bg-white rounded-xs shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] border border-[#E2E8F0] p-6 flex flex-col justify-center relative overflow-hidden">
              <div
                className="absolute left-0 top-0 bottom-0 w-1"
                style={{
                  background:
                    "linear-gradient(135deg, rgb(37, 99, 235) 0%, rgb(20, 184, 166) 55%, rgb(16, 185, 129) 100%)",
                }}
              ></div>
              <div className="space-y-4 font-body-md text-[#0F172A]">
                <div className="flex justify-between items-center">
                  <span className="text-[#64748B] font-label-md uppercase tracking-wider">Subtotal</span>
                  <span className="font-bold font-data-mono">₹{totals.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#64748B] font-label-md uppercase tracking-wider">Tax Total</span>
                  <span className="font-bold text-emerald-600 font-data-mono">+₹{totals.taxTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#64748B] font-label-md uppercase tracking-wider">Shipping/Freight</span>
                  <span className="font-bold text-[#64748B] font-data-mono">--</span>
                </div>
                <div className="h-px bg-[#E2E8F0] w-full my-2"></div>
                <div className="flex justify-between items-end">
                  <span className="font-title-lg text-[#0F172A] font-bold">Grand Total</span>
                  <span className="font-headline-lg text-[#0F172A] font-bold tracking-tight">
                    ₹{totals.grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Sticky Bottom Action Bar */}
      <div className="bg-white border-t border-[#E2E8F0] p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20 flex justify-between items-center fixed bottom-0 left-0 md:left-64 right-0">
        <button className="px-6 py-2 text-[#64748B] font-label-md hover:bg-slate-50 border border-transparent hover:border-[#E2E8F0] rounded-xs transition-all">
          Cancel
        </button>
        <div className="flex gap-3">
          <button
            onClick={handleSaveDraft}
            className="px-6 py-2 border rounded-xs font-label-md transition-colors hover:bg-[rgba(15,82,186,0.05)] hidden sm:block"
            style={{ border: "1px solid #0F52BA", color: "#0F52BA" }}
          >
            Save as Draft
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-8 py-2 rounded-xs font-label-md shadow-sm flex items-center gap-2 text-white hover:opacity-90 transition-opacity disabled:opacity-70"
            style={{
              background:
                "linear-gradient(135deg, rgb(37, 99, 235) 0%, rgb(20, 184, 166) 55%, rgb(16, 185, 129) 100%)",
            }}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Submitting...
              </>
            ) : (
              <>
                <Send size={18} />
                Submit Order
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}