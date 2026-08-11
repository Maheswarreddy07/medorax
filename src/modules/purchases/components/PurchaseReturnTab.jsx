import React from "react";
import { ChevronDown, Undo2 } from "lucide-react";
import { Th, Td, Pagination } from "./Shared";
import { returnReasons } from "../purchasePage/data";

export default function PurchaseReturnTab({
  receivedItems,
  returnReason,
  setReturnReason,
  returnDate,
  setReturnDate,
  returnQuantities,
  updateReturnQuantity,
  estimatedCredit,
  page,
  setPage,
}) {
  const totalRows = receivedItems.length;
  const totalPages = Math.max(Math.ceil(totalRows / 5), 1);
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const pagedItems = receivedItems.slice((safePage - 1) * 5, safePage * 5);

  return (
    <div className="space-y-6 pb-20">
      <div className="bg-white rounded-xs p-6 border border-[#E2E8F0] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
        <h3 className="font-semibold text-[#0F172A] mb-4 pb-2 border-b border-[#E2E8F0] flex items-center gap-2">
          <Undo2 size={18} className="text-[#004ac6]" />
          Return Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-[#0F172A]">Reason for Return</label>
            <div className="relative">
              <select
                value={returnReason}
                onChange={(e) => setReturnReason(e.target.value)}
                className="w-full bg-white border border-[#E2E8F0] rounded-xs px-3 py-2 text-[#0F172A] appearance-none focus:border-[#13B8A7] focus:ring-1 focus:ring-[#13B8A7] font-body-md shadow-sm outline-none"
              >
                {returnReasons.map((reason) => (
                  <option key={reason} value={reason}>
                    {reason}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737686] pointer-events-none" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-[#0F172A]">Return Date</label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="w-full bg-white border border-[#E2E8F0] rounded-xs px-3 py-2 text-[#0F172A] focus:border-[#13B8A7] focus:ring-1 focus:ring-[#13B8A7] font-body-md shadow-sm outline-none"
            />
          </div>
        </div>

        <h3 className="font-semibold text-[#0F172A] mb-4 pb-2 border-b border-[#E2E8F0]">Items to Return</h3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] font-label-md text-[#0F172A] border-b border-outline-variant/20 uppercase tracking-wider text-[11px]">
                <Th>Item Name</Th>
                <Th>Batch No.</Th>
                <Th className="text-right">Received Qty</Th>
                <Th className="text-right w-32">Return Qty</Th>
                <Th className="text-center">Status</Th>
              </tr>
            </thead>
            <tbody className="font-body-md text-[#475569] divide-y divide-[#E2E8F0]">
              {pagedItems.map((item, idx) => {
                const returnQty = returnQuantities[item.id] || 0;
                const isReturning = returnQty > 0;
                return (
                  <tr key={item.id} className={`${idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"} hover:bg-slate-50 transition-colors border-b border-[#E2E8F0]`}>
                    <Td className="font-medium text-[#0F172A]">{item.name}</Td>
                    <Td className="text-[#64748B]">{item.batch}</Td>
                    <Td className="text-right text-[#64748B]">{item.received}</Td>
                    <Td>
                      <input
                        type="number"
                        min="0"
                        max={item.received}
                        value={returnQty}
                        onChange={(e) => updateReturnQuantity(item.id, e.target.value)}
                        className="w-full text-right bg-white border border-[#E2E8F0] rounded p-1.5 outline-none focus:border-[#13B8A7]"
                      />
                    </Td>
                    <Td className="text-center">
                      <span
                        className={`inline-flex px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                          isReturning
                            ? "bg-red-50 text-red-600 border border-red-200"
                            : "bg-slate-100 text-[#64748B] border border-[#E2E8F0]"
                        }`}
                      >
                        {isReturning ? "RETURN" : "NO RETURN"}
                      </span>
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Pagination page={safePage} totalRows={totalRows} onPageChange={setPage} />
        <div className="bg-slate-50 p-4 rounded-xs border border-[#E2E8F0] flex justify-between items-center">
          <span className="font-body-md text-[#64748B] font-medium">Estimated Credit Amount</span>
          <span className="font-headline-md font-bold text-[#004ac6]">₹{estimatedCredit.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}