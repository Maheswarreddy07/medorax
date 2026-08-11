import React from "react";
import { Receipt, CloudUpload } from "lucide-react";
import { Th, Td } from "./Shared";
import { creditNotes } from "../purchasePage/data";

export default function CreditNotesTab({
  creditNoteNumber,
  setCreditNoteNumber,
  creditNoteAmount,
  setCreditNoteAmount,
}) {
  return (
    <div className="space-y-6 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xs border border-[#E2E8F0] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
          <h3 className="font-semibold text-[#0F172A] mb-4 pb-2 border-b border-[#E2E8F0] flex items-center gap-2">
            <Receipt size={18} className="text-[#004ac6]" />
            Record New Credit Note
          </h3>
          <div className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-[#0F172A]">Credit Note Number *</label>
              <input
                type="text"
                value={creditNoteNumber}
                onChange={(e) => setCreditNoteNumber(e.target.value)}
                placeholder="Enter CN Number"
                className="w-full bg-white border border-[#E2E8F0] rounded-xs px-3 py-2 font-body-md focus:border-[#13B8A7] outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-[#0F172A]">Amount (₹) *</label>
              <input
                type="number"
                value={creditNoteAmount}
                onChange={(e) => setCreditNoteAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-white border border-[#E2E8F0] rounded-xs px-3 py-2 font-body-md focus:border-[#13B8A7] outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-[#0F172A]">Upload Document</label>
              <div className="border-2 border-dashed border-[#E2E8F0] rounded-xs p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                <CloudUpload size={36} className="text-[#64748B] mx-auto mb-2" />
                <p className="font-body-md text-[#64748B]">
                  Drag &amp; Drop or <span className="text-[#004ac6] font-medium">Browse</span>
                </p>
              </div>
            </div>
            <button className="w-full bg-slate-100 text-[#64748B] font-medium py-2 rounded-xs hover:bg-slate-200 transition-colors font-label-md">
              Add Credit Note
            </button>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xs border border-[#E2E8F0] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
          <h3 className="font-semibold text-[#0F172A] mb-4 pb-2 border-b border-[#E2E8F0]">Credit Note History</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F8FAFC] font-label-md text-[#0F172A] border-b border-outline-variant/20 uppercase tracking-wider text-[11px]">
                  <Th>CN Number</Th>
                  <Th>Date</Th>
                  <Th className="text-right">Amount</Th>
                  <Th className="text-center">Status</Th>
                </tr>
              </thead>
              <tbody className="font-body-md text-[#475569] divide-y divide-[#E2E8F0]">
                {creditNotes.map((cn, idx) => (
                  <tr key={cn.number} className={`${idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"} hover:bg-slate-50 transition-colors`}>
                    <Td className="font-medium text-[#0F172A]">{cn.number}</Td>
                    <Td className="text-[#64748B]">{cn.date}</Td>
                    <Td className="text-right font-medium">₹{cn.amount.toFixed(2)}</Td>
                    <Td className="text-center">
                      <span
                        className={`inline-flex px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                          cn.status === "APPLIED"
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                            : "bg-amber-50 text-amber-600 border border-amber-200"
                        }`}
                      >
                        {cn.status}
                      </span>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}