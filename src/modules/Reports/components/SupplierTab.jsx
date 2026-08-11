import React, { useMemo } from "react";
import { supplierData, STAT_LABELS, ROWS_PER_PAGE } from "../ReportsPage/data";
import { StatCard, Pagination, Th, Td } from "./Shared";

export default function SupplierTab({ 
  supplierFilter, 
  setSupplierFilter,
  page, 
  setPage, 
  search 
}) {
  const [label1, label2, label3] = STAT_LABELS.supplier;

  const stats = [
    { value: supplierData.stats.totalSuppliers, icon: "arrow_upward", text: "Active suppliers", cls: "text-emerald-600" },
    { value: supplierData.stats.outstanding, icon: "trending_up", text: "needs settlement", cls: "text-emerald-600" },
    { value: supplierData.stats.deliveryRate, icon: "info", text: "Delivery performance", cls: "text-[#64748B]" },
  ];

  const filteredRows = useMemo(() => {
    let rows = supplierData.rows;
    if (supplierFilter !== "All Suppliers") {
      if (supplierFilter === "Has Outstanding") {
        rows = rows.filter((r) => r.outstanding !== "₹0");
      } else if (supplierFilter === "Fully Paid") {
        rows = rows.filter((r) => r.outstanding === "₹0");
      }
    }
    if (search) {
      rows = rows.filter((r) => 
        r.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    return rows;
  }, [supplierFilter, search]);

  const totalRows = filteredRows.length;
  const pagedRows = filteredRows.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label={label1} value={stats[0].value} trendIcon={stats[0].icon} trendText={stats[0].text} trendClass={stats[0].cls} />
        <StatCard label={label2} value={stats[1].value} trendIcon={stats[1].icon} trendText={stats[1].text} trendClass={stats[1].cls} />
        <StatCard label={label3} value={stats[2].value} trendIcon={stats[2].icon} trendText={stats[2].text} trendClass={stats[2].cls} />
      </div>
      <Filters supplierFilter={supplierFilter} setSupplierFilter={setSupplierFilter} setPage={setPage} />
      <div className="bg-white rounded-xs shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] border border-[#E2E8F0] overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left border-collapse">
            <thead><TableHead /></thead>
            <tbody className="text-[14px] text-[#475569]"><TableBody rows={pagedRows} /></tbody>
          </table>
        </div>
        <Pagination page={page} totalRows={totalRows} onPageChange={setPage} rowsPerPage={ROWS_PER_PAGE} />
      </div>
    </>
  );
}

export function Filters({ supplierFilter, setSupplierFilter, setPage }) {
  return (
    <div className="w-full md:w-auto gap-3 flex">
      <select
        value={supplierFilter}
        onChange={(e) => {
          setSupplierFilter(e.target.value);
          setPage(1);
        }}
        className="flex-1 px-3 py-2 border border-[#c3c6d7] rounded-xs focus:ring-2 focus:ring-teal-accent focus:border-teal-accent outline-none bg-white md:min-w-[140px] md:w-auto text-[#0d1c2e]"
      >
        <option value="All Suppliers">All Suppliers</option>
        <option value="Has Outstanding">Has Outstanding</option>
        <option value="Fully Paid">Fully Paid</option>
      </select>
    </div>
  );
}

export function TableHead() {
  return (
    <tr className="bg-[#F8FAFC] text-[#0F172A] font-bold">
      <Th>Supplier Name</Th><Th>Total Supplied</Th><Th>Last Order</Th><Th>Outstanding Amount</Th>
    </tr>
  );
}

export function TableBody({ rows }) {
  if (rows.length === 0) {
    return (
      <tr>
        <td colSpan={4} className="py-8 text-center text-[#64748B]">No records found.</td>
      </tr>
    );
  }
  return rows.map((row, idx) => {
    const bg = idx % 2 === 0 ? "bg-white" : "bg-slate-50/50";
    const outstandingColor = row.outstanding === "₹0" ? "text-emerald-600" : "text-red-600";
    return (
      <tr key={idx} className={`hover:bg-slate-50 transition-colors border-b border-outline-variant/20 ${bg}`}>
        <Td className="text-[#0F172A]">{row.name}</Td>
        <Td>{row.totalSupplied}</Td>
        <Td>{row.lastOrder}</Td>
        <Td className={`font-bold ${outstandingColor}`}>{row.outstanding}</Td>
      </tr>
    );
  });
}