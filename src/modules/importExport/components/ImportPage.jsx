import React, { useState } from "react";
import {
  Upload,
  Download,
  Table,
  History,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  CheckCircle,
  Package,
  Users,
  Truck,
  X,
} from "lucide-react";
import { Th, Td, StatusBadge } from "./Shared";
import { tabData, importHistory } from "../importExportPage/data";

export default function ImportPage({ onToast }) {
  const [activeSubTab, setActiveSubTab] = useState("medicines");
  const [isUploaded, setIsUploaded] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const getData = () => tabData[activeSubTab];

  const handleUpload = () => setIsUploaded(true);
  const handleResetUpload = () => setIsUploaded(false);

  const handleFixErrors = () => {
    const data = getData();
    const rowEl = document.getElementById(`preview-row-${data.errorRowIdx}`);
    if (rowEl) {
      rowEl.classList.add("animate-pulse");
      rowEl.style.backgroundColor = "#FEF2F2";
      setTimeout(() => {
        rowEl.classList.remove("animate-pulse");
        rowEl.style.backgroundColor = "";
      }, 2000);
    }
  };

  const handleImportAnyway = () => {
    onToast?.({
      title: "Import Started",
      message: "✓ Import started — 25 rows queued",
      icon: CheckCircle,
    });
    setTimeout(() => setIsUploaded(false), 2000);
  };

  const handleDownloadTemplate = () => {
    const data = getData();
    let csv = data.headers.join(",") + "\n";
    data.rows.slice(0, 2).forEach((row) => {
      csv += row.slice(0, data.headers.length).join(",") + "\n";
    });
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `medorax_${activeSubTab}_template.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const renderPreviewTable = () => {
    const data = getData();
    return (
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead className="bg-[#F8FAFC] text-[#0F172A] font-bold">
          <tr>
            {data.headers.map((h, i) => (
              <Th key={i}>{h}</Th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant/20 text-[#475569]">
          {data.rows.map((row, idx) => {
            const isError = idx === data.errorRowIdx;
            return (
              <tr
                key={idx}
                id={`preview-row-${idx}`}
                className={`transition-colors ${idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"} ${
                  isError ? "border-l-2 border-red-500" : ""
                } hover:bg-slate-50`}
              >
                {row.slice(0, data.headers.length).map((cell, cellIdx) => {
                  const isErrorCell = isError && cellIdx === 0;
                  return (
                    <Td key={cellIdx} isError={isErrorCell}>
                      {isErrorCell ? (
                        <span className="flex items-center gap-1">
                          <AlertCircle size={14} className="text-red-500" />
                          {cell}
                        </span>
                      ) : (
                        cell
                      )}
                    </Td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Sub-tabs & Actions */}
      <div className="bg-white rounded-xs p-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] border border-[#E2E8F0] flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-2 bg-transparent">
          {[
            { key: "medicines", label: "Medicines", icon: Package },
            { key: "customers", label: "Customers", icon: Users },
            { key: "suppliers", label: "Suppliers", icon: Truck },
          ].map((s) => {
            const Icon = s.icon;
            const isActive = activeSubTab === s.key;
            return (
              <button
                key={s.key}
                onClick={() => setActiveSubTab(s.key)}
                className={`pb-2 px-3 text-sm font-medium relative transition-colors flex items-center gap-1.5 ${
                  isActive ? "text-[#004ac6] font-bold" : "text-[#64748B] hover:text-[#0F172A]"
                }`}
              >
                <Icon size={16} />
                {s.label}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-[#2563eb] via-[#14b8a6] to-[#10b981]"></div>
                )}
              </button>
            );
          })}
        </div>
        <button
          onClick={handleDownloadTemplate}
          className="px-4 py-1.5 text-sm font-medium rounded-xs transition flex items-center gap-2"
          style={{ border: "1px solid #0F52BA", color: "#0F52BA", background: "transparent" }}
        >
          <Download size={16} />
          Template
        </button>
      </div>

      {!isUploaded ? (
        <div
          className="border-2 border-dashed border-[#c3c6d7] rounded-xs p-12 text-center bg-white transition-colors hover:border-[#13B8A7]/50 cursor-pointer flex flex-col items-center justify-center min-h-75"
          onClick={handleUpload}
        >
          <Upload size={48} className="text-[#004ac6] mb-4 opacity-60" />
          <h3 className="font-headline-md text-[#0F172A] mb-2">Drag &amp; Drop file to import</h3>
          <p className="text-[#64748B] text-sm mb-6">Supported formats: .csv, .xlsx (Max 50MB)</p>
          <button className="px-6 py-2 bg-white border border-[#E2E8F0] rounded-xs font-medium text-[#004ac6] shadow-sm hover:bg-[#F8FAFC] transition">
            Browse File
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xs border border-[#E2E8F0] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col">
          <div className="p-4 border-b border-outline-variant/30 flex justify-between items-center bg-[#F8FAFC]">
            <h3 className="font-semibold text-[#0F172A] flex items-center gap-2">
              <Table size={18} className="text-[#004ac6]" />
              Data Preview (<span className="font-normal">{activeSubTab.charAt(0).toUpperCase() + activeSubTab.slice(1)}.csv</span>)
            </h3>
            <button onClick={handleResetUpload} className="text-[#64748B] hover:text-[#0F172A] transition">
              <X size={18} />
            </button>
          </div>
          <div className="overflow-x-auto">{renderPreviewTable()}</div>
          <div className="p-4 bg-[#F8FAFC] border-t border-outline-variant/30 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="flex items-center gap-2 text-sm">
              <span className="px-2 py-1 bg-[#e6eeff] rounded text-[#004ac6] font-medium">24 rows ready</span>
              <span className="text-[#64748B]">•</span>
              <span className="px-2 py-1 bg-red-50 text-red-600 rounded font-medium flex items-center gap-1">
                <AlertCircle size={14} />
                1 error found
              </span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleFixErrors}
                className="px-4 py-2 text-red-600 font-medium border border-red-200 rounded-xs hover:bg-red-50 transition text-sm"
              >
                Fix Errors
              </button>
              <button
                onClick={handleImportAnyway}
                className="px-4 py-2 text-white font-medium rounded-xs hover:shadow-md transition text-sm"
                style={{
                  background: "linear-gradient(135deg, rgb(37, 99, 235) 0%, rgb(20, 184, 166) 55%, rgb(16, 185, 129) 100%)",
                }}
              >
                Import Anyway
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xs border border-[#E2E8F0] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="w-full p-4 flex justify-between items-center bg-[#F8FAFC] rounded-t-xs hover:bg-[#e6eeff]/50 transition"
        >
          <h3 className="font-semibold text-[#0F172A] flex items-center gap-2">
            <History size={18} className="text-[#004ac6]" />
            Import History
          </h3>
          {showHistory ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        {showHistory && (
          <div className="border-t border-outline-variant/30 overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#F8FAFC] text-[#0F172A] font-bold">
                <tr>
                  <Th>Date</Th>
                  <Th>File Name</Th>
                  <Th>Type</Th>
                  <Th className="text-right">Rows Added</Th>
                  <Th className="text-center">Status</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 text-[#475569]">
                {importHistory.map((item, idx) => (
                  <tr key={idx} className={`${idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"} hover:bg-slate-50 transition-colors`}>
                    <Td>{item.date}</Td>
                    <Td className="font-medium text-[#0F172A]">{item.file}</Td>
                    <Td>{item.type}</Td>
                    <Td className="text-right">{item.rows}</Td>
                    <td className="py-3 px-4 text-center">
                      <StatusBadge status={item.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}