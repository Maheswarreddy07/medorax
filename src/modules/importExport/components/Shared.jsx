import React from "react";
import { AlertCircle, CheckCircle, XCircle, X } from "lucide-react";

export function Th({ children, className = "" }) {
  return (
    <th
      className={`py-3 px-4 text-[12px] uppercase tracking-wider font-semibold border-b border-[rgba(195,198,215,0.5)] ${className}`}
    >
      {children}
    </th>
  );
}

export function Td({ children, className = "", isError = false }) {
  if (isError) {
    return (
      <td className={`py-3 px-4 text-red-700 ${className}`}>
        <span className="flex items-center gap-1">
          <AlertCircle size={14} className="text-red-500 shrink-0" />
          {children}
        </span>
      </td>
    );
  }
  return <td className={`py-3 px-4 ${className}`}>{children}</td>;
}

export function StatusBadge({ status }) {
  const config = {
    Completed: { bg: "bg-emerald-100", text: "text-emerald-800", icon: CheckCircle },
    Failed: { bg: "bg-red-100", text: "text-red-800", icon: XCircle },
  };
  const { bg, text, icon: Icon } = config[status] || config.Completed;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${bg} ${text}`}>
      <Icon size={12} />
      {status}
    </span>
  );
}

export function Toast({ title, message, icon: Icon, onClose }) {
  return (
    <div className="fixed top-20 right-6 bg-white border border-[#E2E8F0] shadow-lg rounded-lg p-4 flex items-center gap-3 z-50 max-w-sm animate-in slide-in-from-top-2 fade-in duration-300">
      <div className="bg-emerald-100 p-2 rounded-full text-emerald-800 shrink-0">
        <Icon size={20} />
      </div>
      <div>
        <h4 className="text-sm font-semibold text-[#0F172A]">{title}</h4>
        <p className="text-xs text-[#64748B]">{message}</p>
      </div>
      <button className="ml-auto text-[#64748B] hover:text-[#0F172A] transition" onClick={onClose}>
        <X size={18} />
      </button>
    </div>
  );
}