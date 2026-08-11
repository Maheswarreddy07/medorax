import React from "react";
import { Package, AlertTriangle, X } from "lucide-react";
import { Th, Td, StatCard } from "./Shared";

export default function ExpiryEntryTab({ receivedItems, itemBatches, updateItemData, calculateShelfLife, expiryStats }) {
  const hasAlerts = expiryStats.expired > 0 || expiryStats.near > 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Total Batches" value={expiryStats.total} icon={Package} />
        <StatCard label="Near Expiry" value={expiryStats.near} icon={AlertTriangle} iconColor="text-orange-500" subtext="Requires attention" />
        <StatCard label="Expired" value={expiryStats.expired} icon={X} iconColor="text-red-500" subtext="Needs immediate action" />
      </div>

      <div className="bg-white rounded-xs shadow-sm border border-[#E2E8F0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] font-label-md text-[#0F172A] border-b border-outline-variant/20 uppercase tracking-wider text-[11px]">
                <Th>Item Name</Th>
                <Th>Batch No.</Th>
                <Th className="w-48">Expiry Date</Th>
                <Th className="w-40">Shelf Life</Th>
                <Th className="text-center">Status</Th>
              </tr>
            </thead>
            <tbody className="font-body-md text-[#475569] divide-y divide-[#E2E8F0]">
              {receivedItems.map((item) => {
                const batches = itemBatches[item.id] || [{ batchNo: item.batch, qty: item.received }];
                return batches.map((batch, idx) => {
                  const life = calculateShelfLife(item.expiry);
                  const rowBg =
                    life.status === "EXPIRED"
                      ? "bg-red-50 hover:bg-red-100/50"
                      : life.status === "NEAR EXPIRY"
                      ? "bg-orange-50 hover:bg-orange-100/50"
                      : "hover:bg-slate-50";
                  return (
                    <tr key={`${item.id}-${idx}`} className={`transition-colors border-b border-[#E2E8F0] ${rowBg}`}>
                      <Td className="font-medium text-[#0F172A]">{item.name}</Td>
                      <Td className="text-[#64748B] font-mono text-[13px]">{batch.batchNo || "-"}</Td>
                      <Td>
                        <input
                          type="month"
                          value={item.expiry}
                          onChange={(e) => updateItemData(item.id, "expiry", e.target.value)}
                          className="bg-transparent border border-[#E2E8F0] rounded p-1 outline-none focus:border-[#13B8A7]"
                        />
                      </Td>
                      <Td>
                        <span className="text-[#64748B] font-medium">{life.months} months</span>
                      </Td>
                      <Td className="text-center">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${life.badgeClass}`}>
                          {life.status}
                        </span>
                      </Td>
                    </tr>
                  );
                });
              })}
            </tbody>
          </table>
        </div>
      </div>

      {hasAlerts && (
        <div className="p-4 rounded-xs bg-red-50 border border-red-200 flex items-center gap-3 text-red-700">
          <AlertTriangle size={18} className="flex-shrink-0" />
          <p className="font-body-md font-medium">Some items have expired or are nearing expiry. Please verify before confirming receipt.</p>
        </div>
      )}
    </div>
  );
}