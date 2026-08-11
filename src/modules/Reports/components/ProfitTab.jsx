import React, { useMemo } from "react";
import { profitData, STAT_LABELS, ROWS_PER_PAGE } from "../ReportsPage/data";  // ← Fixed import path
import { StatCard, Pagination, Th, Td } from "./Shared";

export default function ProfitTab({ 
  period, 
  profitProduct, 
  setPeriod,        
  setProfitProduct, 
  page, 
  setPage, 
  search 
}) {
  const [label1, label2, label3] = STAT_LABELS.profit;

  const stats = useMemo(() => {
    const s = profitData[period].stats;
    return [
      { value: s.total, icon: "arrow_upward", text: "2.1% vs previous period", cls: "text-emerald-600" },
      { value: s.margin, icon: "trending_up", text: "improving", cls: "text-emerald-600" },
      { value: s.topProduct, icon: "info", text: "Highest margin contributor", cls: "text-[#64748B]" },
    ];
  }, [period]);

  const filteredRows = useMemo(() => {
    let rows = profitData[period].rows || [];
    if (profitProduct !== "All Products") {
      rows = rows.filter((r) => r.product.startsWith(profitProduct));
    }
    if (search) {
      rows = rows.filter((r) => 
        r.product.toLowerCase().includes(search.toLowerCase())
      );
    }
    return rows;
  }, [period, profitProduct, search]);

  const totalRows = filteredRows.length;
  const pagedRows = filteredRows.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label={label1} value={stats[0].value} trendIcon={stats[0].icon} trendText={stats[0].text} trendClass={stats[0].cls} />
        <StatCard label={label2} value={stats[1].value} trendIcon={stats[1].icon} trendText={stats[1].text} trendClass={stats[1].cls} />
        <StatCard label={label3} value={stats[2].value} trendIcon={stats[2].icon} trendText={stats[2].text} trendClass={stats[2].cls} />
      </div>

      <Filters 
        period={period} 
        profitProduct={profitProduct} 
        setPeriod={setPeriod} 
        setProfitProduct={setProfitProduct} 
        setPage={setPage} 
      />

      <div className="bg-white rounded-xs shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] border border-[#E2E8F0] overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left border-collapse">
            <thead>
              <TableHead />
            </thead>
            <tbody className="text-[14px] text-[#475569]">
              <TableBody rows={pagedRows} />
            </tbody>
          </table>
        </div>
        <Pagination page={page} totalRows={totalRows} onPageChange={setPage} rowsPerPage={ROWS_PER_PAGE} />
      </div>
    </>
  );
}

export function Filters({ period, profitProduct, setPeriod, setProfitProduct, setPage }) {
  return (
    <>
      <div className="w-full md:w-32">
        <select
          value={period}
          onChange={(e) => {
            setPeriod(e.target.value);
            setPage(1);
          }}
          className="px-3 py-2 border border-[#c3c6d7] rounded-xs focus:ring-2 focus:ring-teal-accent focus:border-teal-accent outline-none bg-white w-full text-[#0d1c2e]"
        >
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
        </select>
      </div>
      <div className="w-full md:w-auto flex gap-3">
        <select
          value={profitProduct}
          onChange={(e) => {
            setProfitProduct(e.target.value);
            setPage(1);
          }}
          className="flex-1 px-3 py-2 border border-[#c3c6d7] rounded-xs focus:ring-2 focus:ring-teal-accent focus:border-teal-accent outline-none bg-white md:w-48 text-[#0d1c2e]"
        >
          <option value="All Products">All Products</option>
          <option value="Paracetamol">Paracetamol</option>
          <option value="Amoxicillin">Amoxicillin</option>
          <option value="Ibuprofen">Ibuprofen</option>
          <option value="Azithromycin">Azithromycin</option>
        </select>
      </div>
    </>
  );
}

export function TableHead() {
  return (
    <tr className="bg-[#F8FAFC] text-[#0F172A] font-bold">
      <Th>Date</Th>
      <Th>Product</Th>
      <Th>Cost</Th>
      <Th>Sale Price</Th>
      <Th>Margin %</Th>
    </tr>
  );
}

export function TableBody({ rows }) {
  if (rows.length === 0) {
    return (
      <tr>
        <td colSpan={5} className="py-8 text-center text-[#64748B]">No records found.</td>
      </tr>
    );
  }
  return rows.map((row, idx) => {
    const bg = idx % 2 === 0 ? "bg-white" : "bg-slate-50/50";
    return (
      <tr key={idx} className={`hover:bg-slate-50 transition-colors border-b border-outline-variant/20 ${bg}`}>
        <Td className="text-[#0F172A]">{row.date}</Td>
        <Td>{row.product}</Td>
        <Td>{row.cost}</Td>
        <Td className="font-bold text-[#0F172A]">{row.sale}</Td>
        <Td className="font-bold text-[#10B981]">{row.margin}</Td>
      </tr>
    );
  });
}