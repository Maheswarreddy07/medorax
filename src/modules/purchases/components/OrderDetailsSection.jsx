import React from "react";
import { ChevronDown } from "lucide-react";
import { supplierOptions, locationOptions } from "../purchasePage/data";

export default function OrderDetailsSection({
  poNumber,
  supplier,
  setSupplier,
  location,
  setLocation,
  poDate,
  setPoDate,
  deliveryDate,
  setDeliveryDate,
  refNumber,
  setRefNumber,
}) {
  return (
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
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737686] pointer-events-none" />
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
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737686] pointer-events-none" />
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
  );
}