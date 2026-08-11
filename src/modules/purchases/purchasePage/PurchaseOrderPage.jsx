import React, { useState, useCallback, useMemo } from "react";
import { Send } from "lucide-react";
import { Toast, gradientBg } from "../components/Shared";
import OrderDetailsSection from "../components/OrderDetailsSection";
import LineItemsTable from "../components/LineItemsTable";
import NotesAndSummary from "../components/NotesAndSummary";
import { initialOrderItems, productOptions } from "./data";

export default function PurchaseOrderPage() {
  const [poNumber] = useState("PO-2026-0142");
  const [supplier, setSupplier] = useState("");
  const [location, setLocation] = useState("Main Warehouse - North Wing");
  const [poDate, setPoDate] = useState("2024-10-25");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [refNumber, setRefNumber] = useState("");
  const [items, setItems] = useState(initialOrderItems);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const calculateItemTotal = useCallback((qty, price, tax) => {
    const subtotal = qty * price;
    return subtotal + subtotal * tax;
  }, []);

  const totals = useMemo(() => {
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
      { id: newId, product: "", sku: "", qty: 1, unit: "units", price: 0, tax: 0 },
    ]);
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const showToast = (message) => {
    setToast({ type: "success", message });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = () => {
    if (!supplier) {
      showToast("Please select a supplier");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast("Purchase Order submitted successfully!");
    }, 1500);
  };

  const handleSaveDraft = () => {
    showToast("Purchase Order saved as draft");
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F8FAFC]">
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}

      <main className="flex-1 overflow-y-auto p-6 pb-32">
        <div className="max-w-7xl mx-auto space-y-6">
          <h2 className="font-headline-lg-mobile md:hidden text-[#0F172A] mb-4 font-bold tracking-tight">
            Create Purchase Order
          </h2>

          <OrderDetailsSection
            poNumber={poNumber}
            supplier={supplier}
            setSupplier={setSupplier}
            location={location}
            setLocation={setLocation}
            poDate={poDate}
            setPoDate={setPoDate}
            deliveryDate={deliveryDate}
            setDeliveryDate={setDeliveryDate}
            refNumber={refNumber}
            setRefNumber={setRefNumber}
          />

          <LineItemsTable
            items={items}
            updateItem={updateItem}
            addItem={addItem}
            removeItem={removeItem}
            calculateItemTotal={calculateItemTotal}
          />

          <NotesAndSummary notes={notes} setNotes={setNotes} totals={totals} />
        </div>
      </main>

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
            style={gradientBg}
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