import { useState } from "react";
import {
  ScanBarcode,
  Plus,
  Minus,
  Trash2,
  CheckCircle,
  CreditCard,
  Banknote,
  Pause,
  Play,
  RotateCcw,
  UserRoundSearch,
  Printer,
} from "lucide-react";

import { useCart } from "../../hooks/useCart";

const TAX_RATE = 0.07;

const initialCartItems = [
  {
    id: 1,
    name: "Amoxicillin 500mg",
    ndc: "0009-0016-14",
    price: 14.5,
    quantity: 2,
  },
  {
    id: 2,
    name: "Lisinopril 10mg",
    ndc: "0185-0536-01",
    price: 8.25,
    quantity: 1,
  },
];

const BarcodeBilling = () => {
  const [scanQuery, setScanQuery] = useState("");
  const [showReceipt, setShowReceipt] = useState(false);
  const {
    cartItems,
    setCartItems,
    isHeld,
    holdBill,
    resumeBill,
    paymentMethod,
    setPaymentMethod,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    tax,
    total,
  } = useCart(initialCartItems, TAX_RATE);

  const handleScanEnter = (event) => {
    if (event.key === "Enter" && scanQuery.trim()) {
      const trimmed = scanQuery.trim();
      setCartItems((prevItems) => [
        ...prevItems,
        {
          id: Date.now(),
          name: trimmed,
          ndc: "SCANNED",
          price: 0,
          quantity: 1,
        },
      ]);
      setScanQuery("");
    }
  };

  const handleManualEntry = () => {
    if (!scanQuery.trim()) return;
    const trimmed = scanQuery.trim();
    setCartItems((prevItems) => [
      ...prevItems,
      {
        id: Date.now(),
        name: trimmed,
        ndc: "MANUAL",
        price: 0,
        quantity: 1,
      },
    ]);
    setScanQuery("");
  };

  const handlePay = () => {
    if (cartItems.length === 0) {
      alert("Cart is empty. Add items before processing payment.");
      return;
    }
    setShowReceipt(true);
  };

  const handleCompletePayment = () => {
    alert(
      `Payment of $${total.toFixed(2)} via ${paymentMethod.toUpperCase()} processed successfully!`
    );
    setShowReceipt(false);
    clearCart();
  };

  const handleRefund = () => {
    if (cartItems.length === 0) {
      alert("No items in cart to refund.");
      return;
    }
    alert("Refund initiated. Please select items to return.");
  };

  const handleCustomer = () => {
    alert("Customer lookup opened. Search for patient records.");
  };

  const handlePrint = () => {
    if (cartItems.length === 0) {
      alert("No bill to print.");
      return;
    }
    alert("Bill sent to printer.");
  };

  const posFeatures = [
    {
      id: "hold",
      label: isHeld ? "Held" : "Hold Bill",
      icon: Pause,
      onClick: holdBill,
      disabled: isHeld,
    },
    {
      id: "resume",
      label: "Resume",
      icon: Play,
      onClick: resumeBill,
      disabled: !isHeld,
    },
    { id: "refund", label: "Refund", icon: RotateCcw, onClick: handleRefund },
    { id: "customer", label: "Customer", icon: UserRoundSearch, onClick: handleCustomer },
  ];

  return (
    <div className="flex h-[calc(100vh-80px)] gap-6 overflow-hidden">
      {/* LEFT PANEL: Barcode & Cart */}
      <div className="flex flex-1 flex-col gap-6 overflow-hidden rounded-xl border border-slate-200 bg-white p-6">
        {/* Barcode Input */}
        <div className="flex w-full items-center rounded-lg border border-slate-200 bg-white px-4 py-3 transition-all focus-within:border-[#2563EB] focus-within:ring-1 focus-within:ring-[#2563EB]">
          <ScanBarcode size={22} className="mr-3 text-slate-500" />
          <input
            autoFocus
            type="text"
            value={scanQuery}
            onChange={(event) => setScanQuery(event.target.value)}
            onKeyDown={handleScanEnter}
            placeholder="Scan or enter barcode..."
            className="w-full border-none bg-transparent text-base text-slate-900 placeholder:text-slate-400 focus:ring-0"
          />
          {scanQuery && (
            <button
              type="button"
              onClick={handleManualEntry}
              className="ml-2 text-xs font-bold uppercase text-[#2563EB] hover:underline"
            >
              Manual Entry
            </button>
          )}
        </div>

        {/* Held Bill Banner */}
        {isHeld && (
          <div className="flex items-center justify-between rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
            <div className="flex items-center gap-2">
              <Pause size={16} className="text-amber-600" />
              <span className="text-sm font-semibold text-amber-700">
                Bill is on hold
              </span>
            </div>
            <button
              type="button"
              onClick={resumeBill}
              className="flex items-center gap-1 rounded bg-amber-600 px-3 py-1 text-xs font-bold text-white transition hover:bg-amber-700"
            >
              <Play size={14} />
              Resume
            </button>
          </div>
        )}

        {/* Cart Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full border-collapse text-left">
            <thead className="sticky top-0 z-10 border-b border-slate-200 bg-white">
              <tr>
                <th className="w-12 px-2 py-3 text-center text-[11px] font-bold uppercase tracking-widest text-slate-500">#</th>
                <th className="px-2 py-3 text-[11px] font-bold uppercase tracking-widest text-slate-500">Item Description</th>
                <th className="w-24 px-2 py-3 text-center text-[11px] font-bold uppercase tracking-widest text-slate-500">Qty</th>
                <th className="w-24 px-2 py-3 text-right text-[11px] font-bold uppercase tracking-widest text-slate-500">Price</th>
                <th className="w-28 px-2 py-3 text-right text-[11px] font-bold uppercase tracking-widest text-slate-500">Total</th>
                <th className="w-12 px-2 py-3"></th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-900">
              {cartItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-16 text-center">
                    <ScanBarcode size={28} className="mx-auto mb-2 text-slate-300" />
                    <p className="text-sm italic text-slate-500">
                      Scan or enter barcode to add items.
                    </p>
                  </td>
                </tr>
              ) : (
                cartItems.map((item, index) => {
                  const itemTotal = item.quantity * item.price;
                  return (
                    <tr
                      key={item.id}
                      className="group border-b border-slate-200 transition-colors hover:bg-slate-50"
                    >
                      <td className="px-2 py-4 text-center text-slate-500">{index + 1}</td>
                      <td className="px-2 py-4">
                        <div className="font-medium text-[#0F52BA]">{item.name}</div>
                        <div className="mt-1 text-xs text-slate-500">NDC: {item.ndc}</div>
                      </td>
                      <td className="px-2 py-4">
                        <div className="flex items-center justify-center rounded border border-slate-200 bg-slate-50 p-1">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                            className="text-slate-600 hover:text-[#0F52BA]"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="mx-3 text-sm font-medium">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="text-slate-600 hover:text-[#0F52BA]"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </td>
                      <td className="px-2 py-4 text-right">${item.price.toFixed(2)}</td>
                      <td className="px-2 py-4 text-right font-medium">${itemTotal.toFixed(2)}</td>
                      <td className="px-2 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-slate-300 opacity-0 transition-opacity hover:text-rose-600 group-hover:opacity-100"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {cartItems.length > 0 && (
          <div className="flex items-center justify-between border-t border-slate-200 pt-4">
            <button
              type="button"
              onClick={clearCart}
              className="flex items-center gap-1 text-xs font-bold text-rose-600 transition hover:underline"
            >
              <Trash2 size={14} />
              Clear All
            </button>
            <p className="text-xs text-slate-500">
              {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in cart
            </p>
          </div>
        )}
      </div>

      {/* RIGHT PANEL: Summary & Actions */}
      <div className="flex w-[360px] flex-col gap-6 overflow-y-auto">
        {/* Bill Summary */}
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="mb-4 text-base font-semibold text-[#00174b]">Order Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Tax (7%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-3 text-slate-600">
              <span>Discount</span>
              <span className="text-emerald-600">-$0.00</span>
            </div>
            <div className="flex justify-between pt-2 text-base font-semibold text-[#0F52BA]">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* POS Features Grid */}
        <div className="grid grid-cols-2 gap-6">
          {posFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <button
                key={feature.id}
                type="button"
                onClick={feature.onClick}
                disabled={feature.disabled}
                className={`flex flex-col items-center justify-center rounded-lg border p-3 transition-colors ${
                  feature.disabled
                    ? "cursor-not-allowed border-slate-100 bg-slate-50 text-slate-300"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-[#0F52BA]"
                }`}
              >
                <Icon size={20} className="mb-1" />
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  {feature.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Print Button */}
        <button
          type="button"
          onClick={handlePrint}
          className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white py-2.5 text-xs font-bold text-slate-600 transition-colors hover:bg-slate-50 hover:text-[#0F52BA]"
        >
          <Printer size={16} />
          Print Receipt
        </button>

        <div className="flex flex-1 flex-col justify-end gap-6">
          {/* Payment Methods */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPaymentMethod("card")}
              className={`flex flex-1 items-center justify-center rounded border py-2 transition-colors ${
                paymentMethod === "card"
                  ? "border-[#2563EB] bg-blue-50 text-[#2563EB]"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              <CreditCard size={18} className="mr-2" />
              Card
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod("cash")}
              className={`flex flex-1 items-center justify-center rounded border py-2 transition-colors ${
                paymentMethod === "cash"
                  ? "border-[#2563EB] bg-blue-50 text-[#2563EB]"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Banknote size={18} className="mr-2" />
              Cash
            </button>
          </div>

          {/* Pay Button */}
          <button
            type="button"
            onClick={handlePay}
            className="flex h-14 w-full items-center justify-center rounded-lg bg-linear-to-br from-[#2563EB] to-[#10B981] text-sm font-bold text-white shadow-lg transition-all hover:brightness-110"
          >
            <CheckCircle size={20} className="mr-2" />
            Pay ${total.toFixed(2)}
          </button>
        </div>
      </div>

      {/* Payment Confirmation Modal */}
      {showReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Confirm Payment</h3>
              <button
                type="button"
                onClick={() => setShowReceipt(false)}
                className="rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                aria-label="Close"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className="mb-4 space-y-2 rounded-lg bg-slate-50 p-4 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Tax (7%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 text-base font-bold text-slate-900">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Payment Method</span>
                <span className="font-semibold uppercase">{paymentMethod}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowReceipt(false)}
                className="flex-1 rounded-lg border border-slate-200 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCompletePayment}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-linear-to-br from-[#2563EB] to-[#10B981] py-3 text-sm font-bold text-white shadow-md transition hover:brightness-110"
              >
                <CheckCircle size={18} />
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BarcodeBilling;