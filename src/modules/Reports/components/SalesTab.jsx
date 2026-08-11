import React, { useMemo } from "react";
import { MoreVertical } from "lucide-react";
import { salesData, STAT_LABELS, ROWS_PER_PAGE } from "../ReportsPage/data";
import { StatCard, Pagination, Th, Td } from "./Shared";

export default function SalesTab({ 
  period, 
  branch, 
  setPeriod, 
  setBranch, 
  page, 
  setPage, 
  search 
}) {
  const [label1, label2, label3] = STAT_LABELS.sales;

  // Stats
  const stats = useMemo(() => {
    const s = salesData[period].stats;
    return [
      { value: s.sales, icon: "arrow_upward", text: s.salesTrend, cls: "text-emerald-600" },
      { value: s.revenue, icon: "trending_up", text: s.revenueTrend, cls: "text-emerald-600" },
      { value: s.transactions, icon: "info", text: "Aggregated transactions", cls: "text-[#64748B]" },
    ];
  }, [period]);

  const filteredRows = useMemo(() => {
    let rows = salesData[period].rows;
    if (branch !== "All Branches") rows = rows.filter((r) => r.branch === branch);
    if (search) rows = rows.filter((r) => 
      r.date.toLowerCase().includes(search.toLowerCase()) ||
      r.branch.toLowerCase().includes(search.toLowerCase())
    );
    return rows;
  }, [period, branch, search]);

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
          value={period}
          onChange={(e) => {
            setPeriod(e.target.value);
            setPage(1);
          }}
          className="px-3 py-2 border border-[#c3c6d7] rounded-xs focus:ring-2 focus:ring-teal-accent focus:border-teal-accent outline-none bg-white w-full md:w-32 text-[#0d1c2e]"
        >
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
        </select>
        <select
          value={branch}
          onChange={(e) => {
            setBranch(e.target.value);
            setPage(1);
          }}
          className="px-3 py-2 border border-[#c3c6d7] rounded-xs focus:ring-2 focus:ring-teal-accent focus:border-teal-accent outline-none bg-white w-full md:w-48 text-[#0d1c2e]"
        >
          <option value="All Branches">All Branches</option>
          <option value="Branch 1">Branch 1</option>
          <option value="Branch 2">Branch 2</option>
        </select>
      </div>

      <div className="bg-white rounded-xs shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] border border-[#E2E8F0] overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] text-[#0F172A] font-bold">
                <Th>Date</Th><Th>Branch</Th><Th>Total Sales</Th><Th>Transactions</Th><Th>Revenue</Th>
                <Th className="text-center">Actions</Th>
              </tr>
            </thead>
            <tbody className="text-[14px] text-[#475569]">
              {pagedRows.length > 0 ? (
                pagedRows.map((row, idx) => {
                  const bg = idx % 2 === 0 ? "bg-white" : "bg-slate-50/50";
                  return (
                    <tr key={idx} className={`hover:bg-slate-50 transition-colors border-b border-outline-variant/20 ${bg}`}>
                      <Td className="text-[#0F172A]">{row.date}</Td>
                      <Td>{row.branch}</Td>
                      <Td>{row.sales}</Td>
                      <Td>{row.trans}</Td>
                      <Td className="font-bold text-[#0F172A]">{row.rev}</Td>
                      <td className="py-3 px-4 text-center">
                        <button className="text-teal-accent hover:text-primary transition-colors p-1">
                          <MoreVertical size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[#64748B]">No records found.</td>
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
