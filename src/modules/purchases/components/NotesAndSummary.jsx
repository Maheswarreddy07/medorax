import React from "react";
import { gradientBg } from "./Shared";

export default function NotesAndSummary({ notes, setNotes, totals }) {
  return (
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
        <div className="absolute left-0 top-0 bottom-0 w-1" style={gradientBg}></div>
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
  );
}