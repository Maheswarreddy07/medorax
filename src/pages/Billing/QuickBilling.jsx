import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Minus,
  Trash2,
  ShoppingCart,
  ChevronRight,
  Tag,
  CreditCard,
  Banknote,
} from "lucide-react";

import { quickProducts } from "../../data/billing/billingData";

const TAX_RATE = 0.085;

const categories = ["All Items", "Medicine", "OTC", "First Aid", "Vitamins"];

const QuickBilling = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Amoxicillin 500mg",
      description: "Capsules • 30ct (Rx)",
      price: 12.5,
      quantity: 2,
      total: 25.0,
    },
    {
      id: 2,
      name: "Ibuprofen 200mg",
      description: "Tablets • 100ct",
      price: 8.99,
      quantity: 1,
      total: 8.99,
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Items");

  const filteredProducts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    return quickProducts.filter((product) => {
      const matchesCategory =
        activeCategory === "All Items" || product.category === activeCategory;
      const matchesSearch =
        !normalizedQuery || product.name.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                total: (item.quantity + 1) * item.price,
              }
            : item
        );
      }
      return [
        ...prevItems,
        {
          id: product.id,
          name: product.name,
          description: product.category,
          price: product.price,
          quantity: 1,
          total: product.price,
        },
      ];
    });
  };

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
    return {
      subtotal: rawSubtotal,
      tax: computedTax,
      total: rawSubtotal + computedTax,
    };
  }, [cartItems]);

  const handleCharge = () => {
    alert("Payment processed successfully!");
  };

  return (
    <div className="flex h-[calc(100vh-80px)] gap-6 overflow-hidden">
      {/* LEFT PANEL: Products & Categories */}
      <section className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white">
        {/* Filter / Search Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-slate-50 p-4">
          <div className="no-scrollbar flex flex-1 space-x-2 overflow-x-auto pb-1">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-bold transition ${
                  activeCategory === category
                    ? "border border-[#0F52BA] bg-blue-50 text-[#0F52BA]"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="relative ml-4 w-64 shrink-0">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Scan or type barcode..."
              className="w-full rounded border border-slate-200 bg-slate-100 py-1.5 pl-10 pr-4 text-sm transition-colors focus:border-[#0F52BA] focus:outline-none focus:ring-0"
            />
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1 overflow-y-auto bg-white p-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.length === 0 ? (
              <div className="col-span-full flex flex-col items-center gap-3 py-16 text-center">
                <Search size={28} className="text-slate-300" />
                <p className="text-sm text-slate-500">
                  No products found. Try a different search or category.
                </p>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => addToCart(product)}
                  className="group relative flex h-full cursor-pointer flex-col rounded border border-slate-200 bg-slate-50 p-3 transition-all hover:border-[#0F52BA] hover:shadow-[0_4px_12px_rgba(0,81,213,0.1)]"
                >
                  {product.category === "Medicine" && (
                    <span className="absolute right-2 top-2 rounded bg-teal-50 px-2 py-0.5 text-[11px] font-medium text-teal-700">
                      Rx
                    </span>
                  )}
                  <div className="mb-3 flex h-24 w-full items-center justify-center overflow-hidden rounded bg-slate-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-auto">
                    <h3 className="mb-1 truncate text-sm font-medium leading-tight text-slate-900">
                      {product.name}
                    </h3>
                    <p className="mb-2 text-xs text-slate-500">{product.category}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-base font-semibold text-[#0F52BA]">
                        ${product.price.toFixed(2)}
                      </span>
                      <Plus
                        size={18}
                        className="text-slate-300 transition-colors group-hover:text-[#0F52BA]"
                      />
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </section>

      {/* RIGHT PANEL: Cart & Summary */}
      <section className="flex w-[380px] shrink-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white">
        {/* Cart Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center">
            <ShoppingCart size={18} className="mr-2 text-[#0F52BA]" />
            <h2 className="text-base font-semibold text-[#0F52BA]">Current Bill</h2>
          </div>
          {cartItems.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="flex items-center border-none bg-transparent p-0 text-xs font-bold text-rose-600 hover:underline"
            >
              <Trash2 size={14} className="mr-1" />
              Clear
            </button>
          )}
        </div>

        {/* Patient Info */}
        <div className="group flex cursor-pointer items-center justify-between border-b border-slate-200 bg-white px-4 py-3 transition-colors hover:bg-slate-50">
          <div className="flex items-center">
            <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-800">
              JD
            </div>
            <div>
              <p className="m-0 text-sm font-medium leading-tight text-slate-900">
                John Doe
              </p>
              <p className="m-0 text-xs text-slate-500">ID: PT-8842</p>
            </div>
          </div>
          <ChevronRight size={18} className="text-slate-300 transition-colors group-hover:text-[#0F52BA]" />
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto bg-white">
          <ul className="divide-y divide-slate-200 border-b border-slate-200">
            {cartItems.length === 0 ? (
              <li className="flex flex-col items-center gap-3 px-4 py-16 text-center">
                <ShoppingCart size={28} className="text-slate-300" />
                <p className="text-sm italic text-slate-500">
                  Your cart is empty. Click on items to add them.
                </p>
              </li>
            ) : (
              cartItems.map((item) => (
                <li key={item.id} className="group flex items-start p-4 transition-colors hover:bg-slate-50">
                  <div className="min-w-0 flex-1 pr-4">
                    <div className="mb-1 flex items-start justify-between">
                      <h4 className="m-0 truncate text-sm font-medium text-slate-900">
                        {item.name}
                      </h4>
                      <span className="ml-2 text-sm font-medium text-[#0F52BA]">
                        ${item.total.toFixed(2)}
                      </span>
                    </div>
                    <p className="m-0 mb-2 text-xs text-slate-500">{item.description}</p>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center overflow-hidden rounded border border-slate-200 bg-slate-100">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-2 py-1 text-slate-600 transition-colors hover:bg-slate-200"
                        >
                          <Minus size={14} />
                        </button>
                        <input
                          type="text"
                          value={item.quantity}
                          readOnly
                          className="w-8 border-none bg-transparent p-0 text-center text-sm focus:ring-0"
                        />
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-2 py-1 text-slate-600 transition-colors hover:bg-slate-200"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-slate-300 opacity-0 transition-all hover:text-rose-600 group-hover:opacity-100"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>

          {/* Add Discount / Notes */}
          <div className="p-4">
            <button
              type="button"
              className="flex w-full items-center justify-center rounded border border-dashed border-slate-300 py-2 text-sm text-slate-600 transition-colors hover:border-[#0F52BA] hover:text-[#0F52BA]"
            >
              <Tag size={16} className="mr-2" />
              Add Discount Code
            </button>
          </div>
        </div>

        {/* Summary & Checkout Footer */}
        <div className="shrink-0 border-t border-slate-200 bg-slate-50 p-4">
          <div className="mb-4 space-y-2">
            <div className="flex justify-between text-sm text-slate-600">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-slate-600">
              <span>Tax (8.5%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="mt-2 flex justify-between border-t border-dashed border-slate-300 pt-2 text-base font-bold text-[#0F52BA]">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="mb-3 grid grid-cols-2 gap-2">
            <button
              type="button"
              className="flex items-center justify-center rounded border border-slate-400 px-4 py-2 text-xs font-bold text-slate-800 transition-colors hover:bg-slate-100"
            >
              <CreditCard size={16} className="mr-1" />
              Card
            </button>
            <button
              type="button"
              className="flex items-center justify-center rounded border border-slate-400 px-4 py-2 text-xs font-bold text-slate-800 transition-colors hover:bg-slate-100"
            >
              <Banknote size={16} className="mr-1" />
              Cash
            </button>
          </div>

          <button
            type="button"
            onClick={handleCharge}
            className="flex w-full items-center justify-between rounded bg-linear-to-br from-[#2563EB] to-[#10B981] px-4 py-3 text-xs font-bold text-white shadow-sm transition-all hover:from-[#1D4ED8] hover:to-[#059669]"
          >
            <span>Charge</span>
            <span className="text-lg font-bold leading-none">${total.toFixed(2)}</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default QuickBilling;