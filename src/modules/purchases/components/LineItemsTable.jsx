import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { productOptions, unitOptions, taxOptions } from "../purchasePage/data";

export default function LineItemsTable({ items, updateItem, addItem, removeItem, calculateItemTotal }) {
  return (
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
  );
}