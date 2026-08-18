import { useMemo, useState } from "react";
import {
  FileText,
  CloudUpload,
  Plus,
  Minus,
  Trash2,
  Pill,
  ShieldCheck,
  Tag,
  Receipt,
  Settings,
  ChevronRight,
  CreditCard,
  Banknote,
  QrCode,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const TAX_RATE = 0.08;

const initialPrescriptionItems = [
  {
    id: 1,
    name: "Amoxicillin 500mg",
    category: "Antibiotic",
    batch: "BN-90221",
    price: 12.5,
    quantity: 2,
    total: 25.0,
  },
  {
    id: 2,
    name: "Lisinopril 10mg",
    category: "Blood Pressure",
    batch: "BN-88120",
    price: 18.2,
    quantity: 1,
    total: 18.2,
  },
];

const PrescriptionBilling = () => {
  const [cartItems, setCartItems] = useState(initialPrescriptionItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [isInsuranceApplied, setIsInsuranceApplied] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [isDragging, setIsDragging] = useState(false);

  const savedOnInsurance = isInsuranceApplied ? 10 : 0;

  const updateQuantity = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          const newQuantity = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQuantity, total: newQuantity * item.price };
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const { subtotal, tax, total } = useMemo(() => {
    const rawSubtotal = cartItems.reduce((sum, item) => sum + item.total, 0);
    const computedTax = rawSubtotal * TAX_RATE;
    const grandTotal = rawSubtotal + computedTax - savedOnInsurance;
    return {
      subtotal: rawSubtotal,
      tax: computedTax,
      total: grandTotal,
    };
  }, [cartItems, savedOnInsurance]);

  const handleUpload = (event) => {
    event.preventDefault();
    alert("Prescription uploaded successfully!");
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      alert(`Prescription "${file.name}" received!`);
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)] flex-col gap-6 overflow-hidden">
      <header className="shrink-0">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Prescription Billing
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Add items from uploaded prescriptions and process secure medical
          transactions.
        </p>
      </header>

      <div className="flex flex-1 gap-6 overflow-hidden">
        {/* LEFT PANEL: Prescription & Cart */}
        <div className="flex flex-1 flex-col gap-6 overflow-hidden">
          {/* Upload/Attach Prescription Section */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                <FileText size={20} className="text-[#0F52BA]" />
                Prescription Attachment
              </h3>
              <span className="rounded bg-emerald-50 px-2 py-1 text-xs font-bold text-teal-700">
                SECURE UPLOAD
              </span>
            </div>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 transition-colors ${
                isDragging
                  ? "border-[#0F52BA] bg-blue-50"
                  : "border-slate-300 bg-slate-50 hover:border-[#0F52BA] hover:bg-slate-100"
              }`}
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 transition-transform group-hover:scale-110">
                <CloudUpload size={36} className="text-[#0F52BA]" />
              </div>
              <p className="text-base font-semibold text-slate-900">
                Drop prescription PDF or image here
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Maximum file size 10MB (JPG, PNG, PDF)
              </p>
              <button
                type="button"
                onClick={handleUpload}
                className="mt-6 rounded-lg border border-[#0F52BA] px-6 py-2 text-sm text-[#0F52BA] transition-all hover:bg-[#0F52BA] hover:text-white"
              >
                Browse Files
              </button>
            </div>
          </div>

          {/* Product Search & Cart Table */}
          <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-6">
              <div className="relative">
                <Pill
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0F52BA]"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search for prescribed medicine (e.g. Amoxicillin, Paracetamol)..."
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-base transition-all focus:border-[#0F52BA] focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div className="flex-1 overflow-auto">
              <table className="w-full border-collapse text-left">
                <thead className="sticky top-0 z-10 bg-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-600">
                      Medicine Name
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-600">
                      Batch
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-600">
                      Price
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-600">
                      Qty
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-600">
                      Total
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {cartItems.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-16 text-center">
                        <Pill size={28} className="mx-auto mb-2 text-slate-300" />
                        <p className="text-sm italic text-slate-500">
                          Search above to add more medicines from the
                          prescription...
                        </p>
                      </td>
                    </tr>
                  ) : (
                    cartItems.map((item) => (
                      <tr key={item.id} className="transition-colors hover:bg-slate-50">
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-900">
                              {item.name}
                            </span>
                            <span className="text-xs italic text-slate-500">
                              {item.category}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">
                          {item.batch}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-900">
                          ${item.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex w-fit items-center overflow-hidden rounded-lg border border-slate-200">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, -1)}
                              className="bg-slate-100 px-2 py-1 text-slate-700 transition-colors hover:bg-slate-200"
                            >
                              <Minus size={14} />
                            </button>
                            <input
                              type="text"
                              value={item.quantity}
                              readOnly
                              className="w-10 border-none text-center text-sm focus:ring-0"
                            />
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, 1)}
                              className="bg-slate-100 px-2 py-1 text-slate-700 transition-colors hover:bg-slate-200"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-[#0F52BA]">
                          ${item.total.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="rounded-lg p-2 text-rose-500 transition-colors hover:bg-rose-50"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {cartItems.length > 0 && (
              <div className="flex items-center justify-between border-t border-slate-200 p-6">
                <button
                  type="button"
                  onClick={clearCart}
                  className="flex items-center gap-2 text-sm font-semibold text-rose-600 transition hover:underline"
                >
                  <Trash2 size={16} />
                  Clear All
                </button>
                <p className="text-sm text-slate-500">
                  {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in
                  cart
                </p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL: Summary & Checkout */}
        <div className="flex w-[380px] shrink-0 flex-col gap-6 overflow-y-auto">
          {/* Order Summary */}
          <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="absolute right-0 top-0 h-32 w-32 -translate-y-16 translate-x-16 rounded-full bg-linear-to-br from-[#2563EB] to-[#10B981] opacity-10" />
            <h3 className="relative z-10 mb-6 text-lg font-semibold text-slate-900">
              Order Summary
            </h3>
            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>Subtotal ({cartItems.length} items)</span>
                <span className="font-semibold text-slate-900">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>Prescription Validation Fee</span>
                <span className="font-semibold text-emerald-600">$0.00</span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>Insurance Copay</span>
                <span className="font-semibold text-emerald-600">
                  -${savedOnInsurance.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>Sales Tax (8%)</span>
                <span className="font-semibold text-slate-900">
                  ${tax.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-dashed border-slate-300 pt-4">
                <span className="text-base font-semibold text-slate-900">
                  Grand Total
                </span>
                <span className="text-xl font-bold text-[#0F52BA]">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500">
              Payment Method
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "cash", label: "Cash", icon: Banknote },
                { id: "card", label: "Card", icon: CreditCard },
                { id: "upi", label: "UPI", icon: QrCode },
              ].map((method) => {
                const Icon = method.icon;
                const isSelected = paymentMethod === method.id;
                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id)}
                    className={`flex flex-col items-center gap-2 rounded-xl p-4 transition-all ${
                      isSelected
                        ? "border-2 border-[#0F52BA] bg-blue-50 text-[#0F52BA]"
                        : "border-2 border-slate-200 hover:border-[#0F52BA]/50"
                    }`}
                  >
                    <Icon size={22} />
                    <span className="text-[10px] font-bold uppercase">
                      {method.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Billing Options */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500">
              Billing Options
            </h3>
            <div className="space-y-3">
              <label className="flex cursor-pointer items-center justify-between rounded-lg border border-slate-200 p-3 transition-colors hover:bg-slate-50">
                <div className="flex items-center gap-3">
                  <ShieldCheck size={20} className="text-emerald-600" />
                  <span className="text-sm font-medium">Apply Insurance</span>
                </div>
                <input
                  type="checkbox"
                  checked={isInsuranceApplied}
                  onChange={(event) => setIsInsuranceApplied(event.target.checked)}
                  className="h-5 w-5 rounded text-[#0F52BA] focus:ring-[#0F52BA]"
                />
              </label>

              <button
                type="button"
                className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-slate-200 p-3 text-left transition-colors hover:bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  <Tag size={20} className="text-slate-500" />
                  <span className="text-sm font-medium">Add Discount</span>
                </div>
                <ChevronRight size={18} className="text-slate-400" />
              </button>

              <button
                type="button"
                className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-slate-200 p-3 text-left transition-colors hover:bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  <Receipt size={20} className="text-slate-500" />
                  <span className="text-sm font-medium">Invoice Settings</span>
                </div>
                <Settings size={18} className="text-slate-400" />
              </button>
            </div>
          </div>

          {/* Pay Now Button */}
          <button
            type="button"
            onClick={() => alert("Payment processed successfully!")}
            className="flex items-center justify-center gap-3 rounded-xl bg-linear-to-br from-[#2563EB] via-[#14B8A6] to-[#10B981] py-5 text-base font-bold text-white shadow-lg transition-all hover:scale-[1.02] active:scale-100"
          >
            <CheckCircle size={22} />
            <span>Pay Now</span>
            <span className="text-lg font-extrabold">${total.toFixed(2)}</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionBilling;