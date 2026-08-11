import React, { useMemo } from "react";
import { customerData, STAT_LABELS, ROWS_PER_PAGE } from "../ReportsPage/data";
import { StatCard, Pagination, Th, Td } from "./Shared";

export default function CustomerTab({ 
  customerType, 
  setCustomerType,
  page, 
  setPage, 
  search 
}) {
  const [label1, label2, label3] = STAT_LABELS.customer;

  const stats = [
    { value: customerData.stats.customers, icon: "arrow_upward", text: "5.4% vs previous period", cls: "text-emerald-600" },
    { value: customerData.stats.revenue, icon: "trending_up", text: "growing", cls: "text-emerald-600" },
    { value: customerData.stats.repeatRate, icon: "info", text: "Loyalty metric", cls: "text-[#64748B]" },
  ];

  const filteredRows = useMemo(() => {
    let rows = customerData.rows;
    if (customerType !== "All Customers") rows = rows.filter((r) => r.type === customerType);
    if (search) {
      rows = rows.filter((r) => 
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.type.toLowerCase().includes(search.toLowerCase())
      );
    }
    return rows;
  }, [customerType, search]);

  const totalRows = filteredRows.length;
  const pagedRows = filteredRows.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label={label1} value={stats[0].value} trendIcon={stats[0].icon} trendText={stats[0].text} trendClass={stats[0].cls} />
        <StatCard label={label2} value={stats[1].value} trendIcon={stats[1].icon} trendText={stats[1].text} trendClass={stats[1].cls} />
        <StatCard label={label3} value={stats[2].value} trendIcon={stats[2].icon} trendText={stats[2].text} trendClass={stats[2].cls} />
      </div>
      <Filters customerType={customerType} setCustomerType={setCustomerType} setPage={setPage} />
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

export function Filters({ customerType, setCustomerType, setPage }) {
  return (
    <div className="w-full md:w-auto gap-3 flex">
      <select
        value={customerType}
        onChange={(e) => {
          setCustomerType(e.target.value);
          setPage(1);
        }}
        className="flex-1 px-3 py-2 border border-[#c3c6d7] rounded-xs focus:ring-2 focus:ring-teal-accent focus:border-teal-accent outline-none bg-white md:w-48 text-[#0d1c2e]"
      >
        <option value="All Customers">All Customers</option>
        <option value="Repeat">Repeat</option>
        <option value="One-Time">One-Time</option>
      </select>
    </div>
  );
}

export function TableHead() {
  return (
    <tr className="bg-[#F8FAFC] text-[#0F172A] font-bold">
      <Th>Name</Th><Th>Orders</Th><Th>Spend</Th><Th>Last Purchase</Th>
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
    return (
      <tr key={idx} className={`hover:bg-slate-50 transition-colors border-b border-outline-variant/20 ${bg}`}>
        <Td className="text-[#0F172A]">{row.name}</Td>
        <Td>{row.orders}</Td>
        <Td className="font-bold text-[#0F172A]">{row.spend}</Td>
        <Td>{row.lastPurchase}</Td>
      </tr>
    );
  });
}