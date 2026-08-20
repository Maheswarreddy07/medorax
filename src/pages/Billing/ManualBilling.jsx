import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Minus,
  Trash2,
  CheckCircle,
  CreditCard,
  Banknote,
} from "lucide-react";

const TAX_RATE = 0.08;

const initialCartItems = [
  {
    id: 1,
    name: "Amoxicillin 500mg",
    sku: "AMX-500-120",
    price: 12.5,
    quantity: 2,
  },
  {
    id: 2,
    name: "Ibuprofen 400mg",
    sku: "IBU-400-050",
    price: 8.0,
    quantity: 1,
  },
];

const ManualBilling = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const updateQuantity = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          const newQuantity = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQuantity };
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
    const rawSubtotal = cartItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
    const computedTax = rawSubtotal * TAX_RATE;
    return {
      subtotal: rawSubtotal,
      tax: computedTax,
      total: rawSubtotal + computedTax,
    };
  }, [cartItems]);

  const handleAddItem = () => {
    if (!searchQuery.trim()) return;
    const trimmed = searchQuery.trim();
    setCartItems((prevItems) => [
      ...prevItems,
      {
        id: Date.now(),
        name: trimmed,
        sku: "N/A",
        price: 0,
        quantity: 1,
      },
    ]);
    setSearchQuery("");
  };

  const handleCompleteSale = () => {
    alert("Sale completed successfully!");
  };

  return (
    <div className="flex h-[calc(100vh-80px)] gap-6 overflow-hidden">
      {/* LEFT PANEL: Cart & Search */}
      <div className="flex flex-1 flex-col gap-6 overflow-hidden">
        <div className="flex h-full flex-col gap-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          {/* Search & Add */}
          <div className="flex items-end gap-4">
            <div className="flex flex-1 flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Search Product / SKU
              </label>
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") handleAddItem();
                  }}
                  placeholder="Scan barcode or type name..."
                  className="w-full rounded border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm transition-colors focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={handleAddItem}
              className="flex h-[48px] items-center gap-2 rounded bg-linear-to-br from-[#2563EB] to-[#10B981] px-6 py-3 text-xs font-bold text-white"
            >
              <Plus size={16} />
              Add Item
            </button>
          </div>

          {/* Cart Table */}
          <div className="flex flex-1 flex-col overflow-hidden rounded-lg border border-slate-200 bg-white">
            {/* Header Row */}
            <div className="grid grid-cols-12 gap-4 border-b border-slate-200 bg-slate-50 p-4 text-xs font-bold uppercase tracking-wider text-slate-500">
              <div className="col-span-5">Product</div>
              <div className="col-span-2 text-center">Qty</div>
              <div className="col-span-2 text-right">Price</div>
              <div className="col-span-2 text-right">Total</div>
              <div className="col-span-1 text-center"></div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center gap-3 py-16 text-center">
                  <Search size={28} className="text-slate-300" />
                  <p className="text-sm italic text-slate-500">
                    Cart is empty. Search above to add items.
                  </p>
                </div>
              ) : (
                cartItems.map((item) => {
                  const itemTotal = item.quantity * item.price;
                  return (
                    <div
                      key={item.id}
                      className="grid grid-cols-12 items-center gap-4 border-b border-slate-200 p-4 transition-colors hover:bg-slate-50"
                    >
                      <div className="col-span-5 flex flex-col">
                        <span className="text-sm font-semibold text-slate-900">
                          {item.name}
                        </span>
                        <span className="text-xs text-slate-500">
                          SKU: {item.sku}
                        </span>
                      </div>
                      <div className="col-span-2 flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="flex h-8 w-8 items-center justify-center rounded border border-slate-200 text-[#2563EB] transition-colors hover:border-[#2563EB]"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="flex h-8 w-8 items-center justify-center rounded border border-slate-200 text-[#2563EB] transition-colors hover:border-[#2563EB]"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <div className="col-span-2 text-right text-sm text-slate-500">
                        ${item.price.toFixed(2)}
                      </div>
                      <div className="col-span-2 text-right text-sm font-semibold text-slate-900">
                        ${itemTotal.toFixed(2)}
                      </div>
                      <div className="col-span-1 text-center">
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-rose-500 transition-colors hover:text-rose-300"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="flex items-center justify-between border-t border-slate-200 p-4">
                <button
                  type="button"
                  onClick={clearCart}
                  className="flex items-center gap-1 text-xs font-bold text-rose-600 transition hover:underline"
                >
                  <Trash2 size={14} />
                  Clear All
                </button>
                <p className="text-xs text-slate-500">
                  {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in
                  cart
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: Summary & Payment */}
      <div className="flex w-[380px] flex-col gap-6 overflow-y-auto">
        <div className="flex flex-col gap-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="border-b border-slate-200 pb-4 text-lg font-semibold text-slate-900">
            Bill Summary
          </h2>

          <div className="flex flex-col gap-3 text-sm">
            <div className="flex items-center justify-between text-slate-600">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Discount</span>
              <span className="text-teal-700">-$0.00</span>
            </div>
            <div className="mt-2 flex items-center justify-between border-t border-slate-200 pt-3">
              <span className="text-base font-semibold text-slate-900">Total</span>
              <span className="text-base font-semibold text-[#2563EB]">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Payment Method
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`flex flex-col items-center gap-2 rounded-lg p-3 transition-colors ${
                  paymentMethod === "card"
                    ? "border-2 border-[#2563EB] bg-blue-50 text-slate-900"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-[#2563EB] hover:text-[#2563EB]"
                }`}
              >
                <CreditCard size={20} className={paymentMethod === "card" ? "text-[#2563EB]" : ""} />
                <span className="text-xs font-bold">Card</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("cash")}
                className={`flex flex-col items-center gap-2 rounded-lg p-3 transition-colors ${
                  paymentMethod === "cash"
                    ? "border-2 border-[#2563EB] bg-blue-50 text-slate-900"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-[#2563EB] hover:text-[#2563EB]"
                }`}
              >
                <Banknote size={20} className={paymentMethod === "cash" ? "text-[#2563EB]" : ""} />
                <span className="text-xs font-bold">Cash</span>
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3">
            <button
              type="button"
              onClick={handleCompleteSale}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-linear-to-br from-[#2563EB] to-[#10B981] py-4 text-sm font-bold text-white shadow-sm"
            >
              <CheckCircle size={20} />
              Complete Sale
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="rounded-lg border border-slate-200 py-3 text-xs font-bold text-slate-600 transition-colors hover:bg-slate-50"
              >
                Hold Bill
              </button>
              <button
                type="button"
                className="rounded-lg border border-slate-200 py-3 text-xs font-bold text-rose-600 transition-colors hover:bg-rose-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManualBilling;