// reports/components/PurchaseTab.jsx
import React, { useMemo } from "react";
import { purchaseData, STAT_LABELS, ROWS_PER_PAGE } from "../ReportsPage/data";
import { StatCard, Pagination, Th, Td } from "./Shared";

export default function PurchaseTab({ 
  status, 
  supplier, 
  setStatus,       
  setSupplier,    
  page, 
  setPage, 
  search 
}) {
  const [label1, label2, label3] = STAT_LABELS.purchase;

  const stats = [
    { value: purchaseData.stats.total, icon: "arrow_upward", text: "3.1% vs last month", cls: "text-emerald-600" },
    { value: purchaseData.stats.amount, icon: "trending_up", text: "on track", cls: "text-emerald-600" },
    { value: purchaseData.stats.pending, icon: "info", text: "Needs follow-up", cls: "text-[#64748B]" },
  ];

  const filteredRows = useMemo(() => {
    let rows = purchaseData.rows;
    if (status !== "All Status") rows = rows.filter((r) => r.status === status);
    if (supplier !== "All Suppliers") rows = rows.filter((r) => r.supplier === supplier);
    if (search) {
      rows = rows.filter((r) => 
        r.supplier.toLowerCase().includes(search.toLowerCase()) ||
        r.status.toLowerCase().includes(search.toLowerCase())
      );
    }
    return rows;
  }, [status, supplier, search]);

  const totalRows = filteredRows.length;
  const pagedRows = filteredRows.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label={label1} value={stats[0].value} trendIcon={stats[0].icon} trendText={stats[0].text} trendClass={stats[0].cls} />
        <StatCard label={label2} value={stats[1].value} trendIcon={stats[1].icon} trendText={stats[1].text} trendClass={stats[1].cls} />
        <StatCard label={label3} value={stats[2].value} trendIcon={stats[2].icon} trendText={stats[2].text} trendClass={stats[2].cls} />
      </div>

      <div className="flex w-full md:w-auto gap-3">
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          className="flex-1 px-3 py-2 border border-[#c3c6d7] rounded-xs focus:ring-2 focus:ring-teal-accent focus:border-teal-accent outline-none bg-white md:min-w-[120px] md:w-auto text-[#0d1c2e]"
        >
          <option value="All Status">All Status</option>
          <option value="Delivered">Delivered</option>
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
        </select>
        <select
          value={supplier}
          onChange={(e) => {
            setSupplier(e.target.value);
            setPage(1);
          }}
          className="flex-1 px-3 py-2 border border-[#c3c6d7] rounded-xs focus:ring-2 focus:ring-teal-accent focus:border-teal-accent outline-none bg-white md:min-w-[120px] md:w-auto text-[#0d1c2e]"
        >
          <option value="All Suppliers">All Suppliers</option>
          <option value="Global Pharma">Global Pharma</option>
          <option value="MedLife Solutions">MedLife Solutions</option>
          <option value="BioCare Dist.">BioCare Dist.</option>
          <option value="HealthLink">HealthLink</option>
          <option value="Reliant Pharma">Reliant Pharma</option>
        </select>
      </div>

      <div className="bg-white rounded-xs shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] border border-[#E2E8F0] overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] text-[#0F172A] font-bold">
                <Th>Supplier</Th><Th>Date</Th><Th>Items</Th><Th>Amount</Th><Th>Status</Th>
              </tr>
            </thead>
            <tbody className="text-[14px] text-[#475569]">
              {pagedRows.length > 0 ? (
                pagedRows.map((row, idx) => {
                  const bg = idx % 2 === 0 ? "bg-white" : "bg-slate-50/50";
                  return (
                    <tr key={idx} className={`hover:bg-slate-50 transition-colors border-b border-outline-variant/20 ${bg}`}>
                      <Td>{row.supplier}</Td>
                      <Td className="text-[#0F172A]">{row.date}</Td>
                      <Td>{row.items}</Td>
                      <Td className="font-bold text-[#0F172A]">{row.amount}</Td>
                      <Td>{row.status}</Td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-[#64748B]">No records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination page={page} totalRows={totalRows} onPageChange={setPage} rowsPerPage={ROWS_PER_PAGE} />
      </div>
    </>
  );
}