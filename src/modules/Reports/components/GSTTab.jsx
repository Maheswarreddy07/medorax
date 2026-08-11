import React, { useMemo } from "react";
import { gstData, STAT_LABELS, ROWS_PER_PAGE } from "../ReportsPage/data";
import { StatCard, Pagination, Th, Td } from "./Shared";

export default function GSTTab({ 
  gstFromDate, 
  gstToDate, 
  setGstFromDate,  
  setGstToDate,   
  page, 
  setPage, 
  search 
}) {
  const [label1, label2, label3] = STAT_LABELS.gst;

  const stats = [
    { value: gstData.stats.taxable, icon: "arrow_upward", text: "4.2% vs last period", cls: "text-emerald-600" },
    { value: gstData.stats.collected, icon: "trending_up", text: "steady", cls: "text-emerald-600" },
    { value: gstData.stats.invoices, icon: "info", text: "Total filed", cls: "text-[#64748B]" },
  ];

  const filteredRows = useMemo(() => {
    const from = new Date(gstFromDate);
    const to = new Date(gstToDate);
    let rows = gstData.rows.filter((r) => {
      const d = new Date(r.date);
      return d >= from && d <= to;
    });
    if (search) {
      rows = rows.filter((r) => 
        r.invoice.toLowerCase().includes(search.toLowerCase()) ||
        r.gstin.toLowerCase().includes(search.toLowerCase()) ||
        r.type.toLowerCase().includes(search.toLowerCase())
      );
    }
    return rows;
  }, [gstFromDate, gstToDate, search]);

  const totalRows = filteredRows.length;
  const pagedRows = filteredRows.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label={label1} value={stats[0].value} trendIcon={stats[0].icon} trendText={stats[0].text} trendClass={stats[0].cls} />
        <StatCard label={label2} value={stats[1].value} trendIcon={stats[1].icon} trendText={stats[1].text} trendClass={stats[1].cls} />
        <StatCard label={label3} value={stats[2].value} trendIcon={stats[2].icon} trendText={stats[2].text} trendClass={stats[2].cls} />
      </div>

      <div className="w-full md:w-auto gap-2 flex items-center">
        <input
          type="date"
          value={gstFromDate}
          onChange={(e) => {
            setGstFromDate(e.target.value);
            setPage(1);
          }}
          className="px-3 py-2 border border-[#c3c6d7] rounded-xs focus:ring-2 focus:ring-teal-accent focus:border-teal-accent outline-none bg-white md:w-36 text-[#0d1c2e]"
        />
        <span className="text-[#434655]">to</span>
        <input
          type="date"
          value={gstToDate}
          onChange={(e) => {
            setGstToDate(e.target.value);
            setPage(1);
          }}
          className="px-3 py-2 border border-[#c3c6d7] rounded-xs focus:ring-2 focus:ring-teal-accent focus:border-teal-accent outline-none bg-white md:w-36 text-[#0d1c2e]"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xs shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] border border-[#E2E8F0] overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] text-[#0F172A] font-bold">
                <Th>Invoice No.</Th><Th>Date</Th><Th>GSTIN</Th><Th>Taxable Value</Th><Th>GST Amount</Th><Th>Type</Th>
              </tr>
            </thead>
            <tbody className="text-[14px] text-[#475569]">
              {pagedRows.length > 0 ? (
                pagedRows.map((row, idx) => {
                  const bg = idx % 2 === 0 ? "bg-white" : "bg-slate-50/50";
                  return (
                    <tr key={idx} className={`hover:bg-slate-50 transition-colors border-b border-outline-variant/20 ${bg}`}>
                      <Td className="text-[#0F172A]">{row.invoice}</Td>
                      <Td>{row.date}</Td>
                      <Td>{row.gstin}</Td>
                      <Td className="font-bold text-[#0F172A]">{row.taxable}</Td>
                      <Td className="font-bold text-teal-600">{row.amount}</Td>
                      <Td>{row.type}</Td>
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