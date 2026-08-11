import React from "react";
import { ChevronDown, Plus, Package, FileText } from "lucide-react";
import { Th, Td, Pagination, gradientBg } from "./Shared";
import { poOptions } from "../purchasePage/data";

export default function ReceiveGoodsTab({
  selectedPO,
  setSelectedPO,
  invoiceNo,
  setInvoiceNo,
  invoiceDate,
  setInvoiceDate,
  receivedDate,
  setReceivedDate,
  receivedItems,
  updateItemData,
  notes,
  setNotes,
  totals,
  page,
  setPage,
}) {
  const totalRows = receivedItems.length;
  const totalPages = Math.max(Math.ceil(totalRows / 5), 1);
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const pagedItems = receivedItems.slice((safePage - 1) * 5, safePage * 5);

  return (
    <div className="space-y-6 pb-20">
      <div className="bg-white rounded-xs p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] border border-[#E2E8F0]">
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-[#E2E8F0]">
          <h3 className="font-title-lg text-[#0F172A]">Receipt Details</h3>
          <span className="font-label-md text-[#004ac6] bg-[#e6eeff] px-3 py-1 rounded-xs font-bold">GRN-2026-0089</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-[#0F172A]">Select Purchase Order *</label>
            <div className="relative">
              <select
                value={selectedPO}
                onChange={(e) => setSelectedPO(e.target.value)}
                className="w-full bg-white border border-[#E2E8F0] rounded-xs px-3 py-2 text-[#0F172A] appearance-none focus:border-[#13B8A7] focus:ring-1 focus:ring-[#13B8A7] font-body-md shadow-sm outline-none"
              >
                <option disabled>Choose a PO...</option>
                {poOptions.map((po) => (
                  <option key={po} value={po}>
                    {po}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737686] pointer-events-none" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-[#0F172A]">Supplier</label>
            <input
              type="text"
              value="MedLife Solutions"
              readOnly
              className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xs px-3 py-2 text-[#64748B] cursor-not-allowed font-body-md outline-none"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-[#0F172A]">PO Date</label>
            <input
              type="text"
              value="2024-10-22"
              readOnly
              className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xs px-3 py-2 text-[#64748B] cursor-not-allowed font-body-md outline-none"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-[#0F172A]">Invoice No. *</label>
            <input
              type="text"
              value={invoiceNo}
              onChange={(e) => setInvoiceNo(e.target.value)}
              placeholder="Enter Invoice Number"
              className="w-full bg-white border border-[#E2E8F0] rounded-xs px-3 py-2 text-[#0F172A] focus:border-[#13B8A7] focus:ring-1 focus:ring-[#13B8A7] font-body-md shadow-sm outline-none"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-[#0F172A]">Invoice Date *</label>
            <input
              type="date"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
              className="w-full bg-white border border-[#E2E8F0] rounded-xs px-3 py-2 text-[#0F172A] focus:border-[#13B8A7] focus:ring-1 focus:ring-[#13B8A7] font-body-md shadow-sm outline-none"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-[#0F172A]">Goods Received Date *</label>
            <input
              type="date"
              value={receivedDate}
              onChange={(e) => setReceivedDate(e.target.value)}
              className="w-full bg-white border border-[#E2E8F0] rounded-xs px-3 py-2 text-[#0F172A] focus:border-[#13B8A7] focus:ring-1 focus:ring-[#13B8A7] font-body-md shadow-sm outline-none"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xs shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] border border-[#E2E8F0] overflow-hidden flex flex-col">
        <div className="p-4 border-b border-outline-variant/30 flex justify-between items-center bg-[#F8FAFC]">
          <h3 className="font-semibold text-[#0F172A] flex items-center gap-2">
            <Package size={18} className="text-[#004ac6]" />
            Received Items
          </h3>
          <button className="text-[#64748B] font-label-md font-medium flex items-center gap-1 hover:text-[#004ac6] transition-colors border border-[#E2E8F0] px-3 py-1 rounded-xs hover:bg-[#F8FAFC]">
            <Plus size={14} />
            Add Extra Item
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] font-label-md text-[#0F172A] border-b border-outline-variant/20 uppercase tracking-wider text-[11px]">
                <Th>#</Th>
                <Th>Item Name</Th>
                <Th className="text-right">Ordered</Th>
                <Th className="text-right w-32">Received</Th>
                <Th className="w-40">Batch No.</Th>
                <Th className="w-40">Expiry Date</Th>
                <Th className="text-center">Status</Th>
              </tr>
            </thead>
            <tbody className="font-body-md text-[#475569] divide-y divide-[#E2E8F0]">
              {pagedItems.map((item, idx) => (
                <tr
                  key={item.id}
                  className={`${idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"} hover:bg-slate-50 transition-colors`}
                >
                  <Td className="text-[#64748B]">{(safePage - 1) * 5 + idx + 1}</Td>
                  <Td className="font-medium text-[#0F172A]">{item.name}</Td>
                  <Td className="text-right text-[#64748B]">{item.ordered}</Td>
                  <Td>
                    <input
                      type="number"
                      min="0"
                      value={item.received}
                      onChange={(e) => updateItemData(item.id, "received", e.target.value)}
                      className="w-full text-right bg-white border border-[#E2E8F0] rounded-xs p-1.5 focus:border-[#13B8A7] focus:ring-1 focus:ring-[#13B8A7] outline-none shadow-sm"
                    />
                  </Td>
                  <Td>
                    <input
                      type="text"
                      value={item.batch}
                      onChange={(e) => updateItemData(item.id, "batch", e.target.value)}
                      placeholder="Batch No"
                      className="w-full bg-white border border-[#E2E8F0] rounded-xs p-1.5 focus:border-[#13B8A7] focus:ring-1 focus:ring-[#13B8A7] outline-none shadow-sm"
                    />
                  </Td>
                  <Td>
                    <input
                      type="month"
                      value={item.expiry}
                      onChange={(e) => updateItemData(item.id, "expiry", e.target.value)}
                      className="w-full bg-white border border-[#E2E8F0] rounded-xs p-1.5 focus:border-[#13B8A7] focus:ring-1 focus:ring-[#13B8A7] outline-none shadow-sm"
                    />
                  </Td>
                  <Td className="text-center">
                    <span className="inline-flex px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-200">
                      COMPLETE
                    </span>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination page={safePage} totalRows={totalRows} onPageChange={setPage} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xs p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] border border-[#E2E8F0]">
          <h3 className="font-semibold text-[#0F172A] mb-3 flex items-center gap-2">
            <FileText size={18} className="text-[#004ac6]" />
            Delivery Notes
          </h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any remarks regarding damaged goods, delays, etc."
            className="w-full h-24 bg-white border border-[#E2E8F0] rounded-xs p-3 font-body-md focus:border-[#13B8A7] focus:ring-1 focus:ring-[#13B8A7] outline-none resize-none shadow-sm"
          />
        </div>
        <div className="bg-white rounded-xs p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] border border-[#E2E8F0] flex flex-col justify-center relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1" style={gradientBg}></div>
          <h3 className="font-semibold text-[#0F172A] mb-4 pb-2 border-b border-[#E2E8F0]">Summary</h3>
          <div className="flex justify-between items-center mb-3">
            <span className="font-body-md text-[#64748B]">Total Ordered Qty:</span>
            <span className="font-label-md font-bold text-[#0F172A]">{totals.totalOrdered}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="font-body-md text-[#64748B]">Total Received Qty:</span>
            <span className="font-label-md font-bold text-[#004ac6]">{totals.totalReceived}</span>
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-[#E2E8F0]">
            <span className="font-body-md text-[#64748B] font-medium">Variance:</span>
            <span className={`font-label-md font-bold ${totals.variance === 0 ? "text-emerald-600" : "text-red-600"}`}>
              {totals.variance > 0 ? "+" : ""}
              {totals.variance}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}