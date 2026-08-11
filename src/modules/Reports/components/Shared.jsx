import React from "react";
import { ChevronLeft, ChevronRight, ArrowUp, TrendingUp, Info } from "lucide-react";

export const gradientBg = {
  background:
    "linear-gradient(135deg, rgb(37, 99, 235) 0%, rgb(20, 184, 166) 55%, rgb(16, 185, 129) 100%)",
};

export function StatCard({ label, value, trendIcon, trendText, trendClass }) {
  return (
    <div className="bg-white rounded-xs p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] border border-[#E2E8F0] hover:shadow-md transition-shadow relative overflow-hidden flex flex-col">
      <div className="absolute left-0 top-0 bottom-0 w-1" style={gradientBg}></div>
      <div className="font-label-md uppercase tracking-wider mb-2 text-[#64748B]">{label}</div>
      <div className="font-headline-lg font-bold text-[#0F172A]">{value}</div>
      <div className={`mt-4 flex items-center gap-1 font-label-md ${trendClass}`}>
        {trendIcon === "arrow_upward" && <ArrowUp size={16} />}
        {trendIcon === "trending_up" && <TrendingUp size={16} />}
        {trendIcon === "info" && <Info size={16} />}
        <span>{trendText}</span>
      </div>
    </div>
  );
}

export function Pagination({ page, totalRows, onPageChange, rowsPerPage = 5 }) {
  const totalPages = Math.max(Math.ceil(totalRows / rowsPerPage), 1);
  const startIdx = (page - 1) * rowsPerPage;
  const endIdx = Math.min(startIdx + rowsPerPage, totalRows);
  const startDisplay = totalRows === 0 ? 0 : startIdx + 1;

  const pages = [];
  for (let p = 1; p <= Math.min(totalPages, 3); p++) pages.push(p);

  return (
    <div className="bg-white border-t border-outline-variant/30 p-4 flex items-center justify-between rounded-b-xs">
      <div className="font-label-md text-on-surface-variant">
        Showing <span className="font-bold text-on-surface">{startDisplay}-{endIdx}</span> of{" "}
        <span className="font-bold text-on-surface">{totalRows}</span> entries
      </div>
      <div className="flex items-center gap-2 ml-auto">
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="p-1 rounded border border-outline-variant/50 text-on-surface-variant hover:border-teal-accent hover:text-teal-accent disabled:opacity-50 transition-colors"
        >
          <ChevronLeft size={18} />
        </button>
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className="w-8 h-8 rounded font-label-md font-bold flex items-center justify-center transition-colors"
            style={
              p === page
                ? { backgroundColor: "rgb(0, 60, 144)", color: "white", border: "1px solid transparent" }
                : { backgroundColor: "transparent", border: "1px solid rgba(115,118,134,0.5)", color: "#0d1c2e" }
            }
          >
            {p}
          </button>
        ))}
        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="p-1 rounded border border-outline-variant/50 text-on-surface-variant hover:border-teal-accent hover:text-teal-accent disabled:opacity-50 transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

export function Th({ children, className = "" }) {
  return (
    <th className={`py-3 px-4 text-[12px] uppercase tracking-wider font-semibold border-b border-[rgba(195,198,215,0.5)] ${className}`}>
      {children}
    </th>
  );
}

export function Td({ children, className = "" }) {
  return <td className={`py-3 px-4 ${className}`}>{children}</td>;
}