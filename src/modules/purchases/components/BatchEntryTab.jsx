import React from "react";
import { ChevronDown, Plus, Trash2, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { Th, Td } from "./Shared";

export default function BatchEntryTab({
  receivedItems,
  currentBatchItemId,
  setCurrentBatchItemId,
  itemBatches,
  updateBatchValue,
  addBatchRow,
  removeBatchRow,
  calculateBatchTotal,
}) {
  const selectedItem = receivedItems.find((item) => item.id === currentBatchItemId);
  const batchTotal = selectedItem ? calculateBatchTotal(selectedItem.id) : 0;
  const batches = selectedItem ? itemBatches[selectedItem.id] || [] : [];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xs p-6 border border-[#E2E8F0] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
          <div className="flex-1">
            <label className="block font-label-md text-[#0F172A] mb-1.5">Select Received Item</label>
            <div className="relative">
              <select
                value={currentBatchItemId || ""}
                onChange={(e) => setCurrentBatchItemId(parseInt(e.target.value) || null)}
                className="w-full bg-white border border-[#E2E8F0] rounded-xs px-4 py-2.5 font-body-md focus:ring-2 focus:ring-[#004ac6]/20 focus:border-[#004ac6] outline-none transition-all appearance-none"
              >
                <option value="">Select an item to enter batches...</option>
                {receivedItems.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} ({item.batch || "No Single Batch"})
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737686] pointer-events-none" />
            </div>
          </div>
          <div className="bg-slate-50 px-4 py-2.5 rounded-xs border border-[#E2E8F0] flex flex-col min-w-[140px]">
            <span className="text-[10px] uppercase text-[#64748B] font-bold tracking-wider">Total Received</span>
            <span className="text-xl font-bold text-[#0F172A]">{selectedItem?.received || "-"}</span>
          </div>
        </div>

        {selectedItem && (
          <div>
            <div className="overflow-x-auto mb-4">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-left border-b border-[#E2E8F0] font-label-md text-[#64748B] uppercase tracking-wider text-[11px]">
                    <Th className="w-12">#</Th>
                    <Th>Batch Number</Th>
                    <Th className="w-48 text-right">Quantity</Th>
                    <Th className="w-16 text-center">Action</Th>
                  </tr>
                </thead>
                <tbody>
                  {batches.map((batch, idx) => (
                    <tr key={idx} className={`${idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"} border-b border-[#E2E8F0] hover:bg-slate-50/50 transition-colors`}>
                      <Td className="text-[#64748B]">{idx + 1}</Td>
                      <Td>
                        <input
                          type="text"
                          value={batch.batchNo}
                          onChange={(e) => updateBatchValue(selectedItem.id, idx, "batchNo", e.target.value)}
                          placeholder="Enter Batch #"
                          className="w-full bg-white border border-[#E2E8F0] rounded-xs px-3 py-2 font-body-md outline-none focus:border-[#13B8A7]"
                        />
                      </Td>
                      <Td>
                        <input
                          type="number"
                          value={batch.qty}
                          onChange={(e) => updateBatchValue(selectedItem.id, idx, "qty", e.target.value)}
                          className="w-full text-right bg-white border border-[#E2E8F0] rounded-xs px-3 py-2 font-body-md outline-none focus:border-[#13B8A7]"
                        />
                      </Td>
                      <Td className="text-center">
                        <button onClick={() => removeBatchRow(selectedItem.id, idx)} className="text-[#94A3B8] hover:text-red-600 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </Td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-50/50">
                    <td className="py-3 px-4" colSpan="2">
                      <button onClick={() => addBatchRow(selectedItem.id)} className="flex items-center gap-2 text-[#004ac6] font-bold text-label-md hover:underline">
                        <Plus size={16} />
                        Add Batch Row
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] text-[#64748B] font-bold uppercase tracking-wider">Total Entered</span>
                        <span className="text-lg font-bold text-[#0F172A]">{batchTotal}</span>
                      </div>
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div
              className={`flex items-center gap-3 p-4 rounded-xs border ${
                batchTotal === selectedItem.received
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                  : batchTotal > selectedItem.received
                  ? "bg-red-50 border-red-200 text-red-700"
                  : "bg-blue-50 border-blue-200 text-blue-700"
              }`}
            >
              {batchTotal === selectedItem.received ? (
                <CheckCircle size={18} />
              ) : batchTotal > selectedItem.received ? (
                <AlertTriangle size={18} />
              ) : (
                <Info size={18} />
              )}
              <span className="font-label-md">
                {batchTotal === selectedItem.received
                  ? "All quantities accounted for. Batch entry complete."
                  : batchTotal > selectedItem.received
                  ? `Overage: Entered quantity (${batchTotal}) exceeds received quantity (${selectedItem.received}).`
                  : `Pending: ${selectedItem.received - batchTotal} more items to be assigned to batches.`}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}