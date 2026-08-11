import React, { useMemo } from "react";
import { inventoryData, STAT_LABELS, ROWS_PER_PAGE } from "../ReportsPage/data";
import { StatCard, Pagination, Th, Td } from "./Shared";

export default function InventoryTab({ 
  inventorySubtype, 
  setInventorySubtype,  
  page, 
  setPage, 
  search 
}) {
  const [label1, label2, label3] = STAT_LABELS.inventory;

  const stats = [
    { value: inventoryData.stats.total, icon: "arrow_upward", text: "1.5% vs last month", cls: "text-emerald-600" },
    { value: inventoryData.stats.expiring, icon: "trending_up", text: "needs attention", cls: "text-amber-600" },
    { value: inventoryData.stats.skus, icon: "info", text: "Active SKUs", cls: "text-[#64748B]" },
  ];

  const filteredRows = useMemo(() => {
    let rows = inventoryData.rows[inventorySubtype] || [];
    if (search) {
      rows = rows.filter((r) => 
        Object.values(r).some(val => 
          String(val).toLowerCase().includes(search.toLowerCase())
        )
      );
    }
    return rows;
  }, [inventorySubtype, search]);

  const totalRows = filteredRows.length;
  const pagedRows = filteredRows.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label={label1} value={stats[0].value} trendIcon={stats[0].icon} trendText={stats[0].text} trendClass={stats[0].cls} />
        <StatCard label={label2} value={stats[1].value} trendIcon={stats[1].icon} trendText={stats[1].text} trendClass={stats[1].cls} />
        <StatCard label={label3} value={stats[2].value} trendIcon={stats[2].icon} trendText={stats[2].text} trendClass={stats[2].cls} />
      </div>

      <div className="w-full md:w-auto gap-3 flex">
        <div className="flex border-b border-[#c3c6d7]">
          <button
            onClick={() => {
              setInventorySubtype("Stock Movement");
              setPage(1);
            }}
            className={`px-3 py-2 font-bold border-b-2 ${
              inventorySubtype === "Stock Movement"
                ? "text-[#004ac6] border-[#004ac6]"
                : "text-[#434655] border-transparent font-normal"
            }`}
          >
            Stock Movement
          </button>
          <button
            onClick={() => {
              setInventorySubtype("Expiry Reports");
              setPage(1);
            }}
            className={`px-3 py-2 font-bold border-b-2 ${
              inventorySubtype === "Expiry Reports"
                ? "text-[#004ac6] border-[#004ac6]"
                : "text-[#434655] border-transparent font-normal"
            }`}
          >
            Expiry Reports
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xs shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] border border-[#E2E8F0] overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left border-collapse">
            <thead>
              {inventorySubtype === "Stock Movement" ? (
                <tr className="bg-[#F8FAFC] text-[#0F172A] font-bold">
                  <Th>Date</Th><Th>Product</Th><Th>Movement Type</Th><Th>Quantity</Th><Th>Branch</Th>
                </tr>
              ) : (
                <tr className="bg-[#F8FAFC] text-[#0F172A] font-bold">
                  <Th>Product</Th><Th>Batch No.</Th><Th>Expiry Date</Th><Th>Quantity</Th><Th>Status</Th>
                </tr>
              )}
            </thead>
            <tbody className="text-[14px] text-[#475569]">
              {pagedRows.length > 0 ? (
                pagedRows.map((row, idx) => {
                  const bg = idx % 2 === 0 ? "bg-white" : "bg-slate-50/50";
                  
                  if (inventorySubtype === "Stock Movement") {
                    return (
                      <tr key={idx} className={`hover:bg-slate-50 transition-colors border-b border-outline-variant/20 ${bg}`}>
                        <Td className="text-[#0F172A]">{row.date}</Td>
                        <Td>{row.product}</Td>
                        <Td>{row.type}</Td>
                        <Td className="font-bold text-[#0F172A]">{row.qty}</Td>
                        <Td>{row.branch}</Td>
                      </tr>
                    );
                  } else {
                    let badgeClass = "bg-emerald-100 text-emerald-800";
                    if (row.status === "Expiring Soon") badgeClass = "bg-teal-100 text-teal-800";
                    if (row.status === "Expired") badgeClass = "bg-red-100 text-red-800";
                    return (
                      <tr key={idx} className={`hover:bg-slate-50 transition-colors border-b border-outline-variant/20 ${bg}`}>
                        <Td className="text-[#0F172A]">{row.product}</Td>
                        <Td>{row.batch}</Td>
                        <Td>{row.expiry}</Td>
                        <Td className="font-bold text-[#0F172A]">{row.qty}</Td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${badgeClass}`}>{row.status}</span>
                        </td>
                      </tr>
                    );
                  }
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