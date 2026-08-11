import React from "react";
import { ChevronDown, CheckCircle, AlertTriangle, Info, X } from "lucide-react";

export const gradientBg = {
  background:
    "linear-gradient(135deg, rgb(37, 99, 235) 0%, rgb(20, 184, 166) 55%, rgb(16, 185, 129) 100%)",
};

export function StatCard({ label, value, subtext, icon: Icon, iconColor = "text-[#004ac6]" }) {
  return (
    <div className="bg-white rounded-xs p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] border border-[#E2E8F0] hover:shadow-md transition-shadow relative overflow-hidden flex flex-col">
      <div className="absolute left-0 top-0 bottom-0 w-1" style={gradientBg}></div>
      <div className="flex items-center justify-between mb-2">
        <div className="font-label-md uppercase tracking-wider text-[#64748B]">{label}</div>
        {Icon && <Icon size={18} className={iconColor} />}
      </div>
      <div className="font-headline-lg font-bold text-[#0F172A]">{value}</div>
      {subtext && <div className="mt-2 text-sm text-[#64748B]">{subtext}</div>}
    </div>
  );
}

export function Pagination({ page, totalRows, onPageChange, pageSize = 5 }) {
  const totalPages = Math.max(Math.ceil(totalRows / pageSize), 1);
  const startIdx = (page - 1) * pageSize;
  const endIdx = Math.min(startIdx + pageSize, totalRows);
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
          <ChevronDown className="rotate-90" size={18} />
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
          <ChevronDown className="-rotate-90" size={18} />
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

// toastType: "success" | "error" | "info"
export function Toast({ type = "success", title, message, onClose }) {
  const config = {
    success: { bg: "bg-emerald-100", text: "text-emerald-800", icon: CheckCircle, label: "Success" },
    error: { bg: "bg-red-100", text: "text-red-800", icon: AlertTriangle, label: "Error" },
    info: { bg: "bg-blue-100", text: "text-blue-800", icon: Info, label: "Info" },
  };
  const { bg, text, icon: Icon, label } = config[type] || config.success;
  return (
    <div className="fixed top-[80px] right-6 bg-white border border-[#E2E8F0] shadow-lg rounded-lg p-4 flex items-center gap-3 z-50 max-w-sm animate-in slide-in-from-top-2 fade-in duration-300">
      <div className={`p-2 rounded-full flex-shrink-0 ${bg} ${text}`}>
        <Icon size={20} />
      </div>
      <div>
        <h4 className="text-sm font-semibold text-[#0F172A]">{title || label}</h4>
        <p className="text-xs text-[#64748B]">{message}</p>
      </div>
      <button className="ml-auto text-[#64748B] hover:text-[#0F172A] transition" onClick={onClose}>
        <X size={18} />
      </button>
    </div>
  );
}