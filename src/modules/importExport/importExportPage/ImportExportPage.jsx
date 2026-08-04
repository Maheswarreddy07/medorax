import React, { useState } from "react";
import {
  Upload,
  Download,
  FileSpreadsheet,
  FileText,
  Table,
  History,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  EyeOff,
  Filter,
  ArrowRight,
  Layers,
  Package,
  Users,
  Truck,
  X,
  RefreshCw,
  MoreVertical,
} from "lucide-react";

// ---------- Data ----------
const tabData = {
  medicines: {
    headers: ["#", "Medicine Name", "Generic Name", "Category", "Batch No", "Expiry Date", "MRP", "Stock", "Supplier"],
    rows: [
      ["1", "Amox-500", "Amoxicillin", "Antibiotic", "B101", "2025-10", "120.00", "500", "PharmaCo"],
      ["2", "Para-500", "Paracetamol", "Analgesic", "B102", "2026-01", "40.00", "1200", "HealthInc"],
      ["3", "Ibu-400", "Ibuprofen", "NSAID", "B103", "2024-05", "85.00", "350", "PharmaCo", true, "Missing Expiry"],
      ["4", "Cetri-10", "Cetirizine", "Antihistamine", "B104", "2025-12", "35.00", "800", "MedLife"],
      ["5", "Azi-250", "Azithromycin", "Antibiotic", "B105", "2025-08", "150.00", "400", "HealthInc"],
    ],
    errorRowIdx: 2,
  },
  customers: {
    headers: ["#", "Customer Name", "Phone", "Email", "Address", "City", "Type", "Credit Limit"],
    rows: [
      ["1", "John Doe", "555-0101", "john@email.com", "123 Main St", "NY", "Retail", "1000"],
      ["2", "Jane Smith", "555-0102", "jane@email.com", "456 Oak Ave", "LA", "Wholesale", "5000"],
      ["3", "Bob Johnson", "555-0103", "bob@email.com", "789 Pine Rd", "CHI", "Retail", "1500"],
      ["4", "Alice Brown", "INVALID", "alice.com", "321 Elm St", "HOU", "Retail", "2000", true, "Invalid Phone/Email"],
      ["5", "Charlie Davis", "555-0105", "charlie@email.com", "654 Maple Dr", "PHX", "Wholesale", "10000"],
    ],
    errorRowIdx: 3,
  },
  suppliers: {
    headers: ["#", "Supplier Name", "Contact Person", "Phone", "Email", "City", "GST No", "Payment Terms"],
    rows: [
      ["1", "PharmaCo", "Tom Wilson", "555-0201", "tom@pharmaco.com", "NY", "GST12345", "Net 30"],
      ["2", "HealthInc", "Sarah Lee", "555-0202", "sarah@healthinc.com", "NJ", "GST23456", "Net 45"],
      ["3", "MedLife", "Mike Chen", "555-0203", "mike@medlife.com", "CA", "GST34567", "Net 15"],
      ["4", "BioCare", "Anna Jones", "555-0204", "anna@biocare.com", "TX", "", "Net 30", true, "Missing GST"],
      ["5", "GlobalMeds", "David Kim", "555-0205", "david@globalmeds.com", "IL", "GST56789", "Net 60"],
    ],
    errorRowIdx: 3,
  },
};

const importHistory = [
  { date: "Today, 10:42 AM", file: "suppliers_q3.csv", type: "Suppliers", rows: 45, status: "Completed" },
  { date: "Yesterday, 14:15 PM", file: "customers_batch_1.xlsx", type: "Customers", rows: 128, status: "Completed" },
  { date: "Dec 28, 2023", file: "medicines_reorder.csv", type: "Medicines", rows: 67, status: "Completed" },
  { date: "Dec 22, 2023", file: "suppliers_q4.xlsx", type: "Suppliers", rows: 32, status: "Failed" },
  { date: "Dec 15, 2023", file: "customers_holiday.xlsx", type: "Customers", rows: 89, status: "Completed" },
];

const columns = [
  "SKU",
  "Name",
  "Category",
  "Batch No.",
  "Expiry Date",
  "Quantity",
  "Unit Price",
  "Supplier ID",
  "Status",
];

// ---------- Sub Components ----------
function Th({ children, className = "" }) {
  return (
    <th
      className={`py-3 px-4 text-[12px] uppercase tracking-wider font-semibold border-b border-[rgba(195,198,215,0.5)] ${className}`}
    >
      {children}
    </th>
  );
}

function Td({ children, className = "", isError = false }) {
  if (isError) {
    return (
      <td className={`py-3 px-4 text-red-700 ${className}`}>
        <span className="flex items-center gap-1">
          <AlertCircle size={14} className="text-red-500 flex-shrink-0" />
          {children}
        </span>
      </td>
    );
  }
  return <td className={`py-3 px-4 ${className}`}>{children}</td>;
}

function StatusBadge({ status }) {
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

function Toast({ title, message, icon: Icon, onClose }) {
  return (
    <div className="fixed top-[80px] right-6 bg-white border border-[#E2E8F0] shadow-lg rounded-lg p-4 flex items-center gap-3 z-50 max-w-sm animate-in slide-in-from-top-2 fade-in duration-300">
      <div className="bg-emerald-100 p-2 rounded-full text-emerald-800 flex-shrink-0">
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

// ---------- Main Component ----------
export default function ImportExportPage() {
  const [activeTab, setActiveTab] = useState("import");
  const [activeSubTab, setActiveSubTab] = useState("medicines");
  const [isUploaded, setIsUploaded] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [toast, setToast] = useState(null);
  const [selectedColumns, setSelectedColumns] = useState(columns.map((c) => ({ name: c, checked: true })));

  // ---------- Import Handlers ----------
  const getData = () => tabData[activeSubTab];

  const handleUpload = () => {
    setIsUploaded(true);
  };

  const handleResetUpload = () => {
    setIsUploaded(false);
  };

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
    setToast({
      title: "Import Started",
      message: "✓ Import started — 25 rows queued",
      icon: CheckCircle,
    });
    setTimeout(() => {
      setToast(null);
      setIsUploaded(false);
    }, 2000);
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

  // ---------- Export Handlers ----------
  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setToast({
        title: "Export Complete",
        message: "medicines_inventory.csv has been downloaded.",
        icon: CheckCircle,
      });
      setTimeout(() => setToast(null), 3000);
    }, 1500);
  };

  const toggleColumn = (index) => {
    setSelectedColumns((prev) =>
      prev.map((col, i) =>
        i === index ? { ...col, checked: !col.checked } : col
      )
    );
  };

  const toggleAllColumns = () => {
    const allChecked = selectedColumns.every((c) => c.checked);
    setSelectedColumns((prev) =>
      prev.map((col) => ({ ...col, checked: !allChecked }))
    );
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

  // ---------- Render ----------
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F8FAFC]">
      {toast && (
        <Toast
          title={toast.title}
          message={toast.message}
          icon={toast.icon}
          onClose={() => setToast(null)}
        />
      )}

      <main className="flex-1 overflow-y-auto p-6 space-y-6 pt-0">
        <div className="bg-white border-b border-[rgba(115,118,134,0.3)] sticky top-0 z-20 mt-4">
          <div className="flex overflow-x-auto no-scrollbar gap-8 py-2 whitespace-nowrap px-6">
            <div className="flex flex-col gap-2 overflow-y-hidden">
              <span className="text-[12px]  font-bold text-[#004ac6] uppercase tracking-wider opacity-60 px-1">
                Data Management
              </span>
              <div className="flex gap-4 pb-2">
                {[
                  { key: "import", label: "Import", icon: Upload },
                  { key: "export", label: "Export", icon: Download },
                ].map((t) => {
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.key}
                      onClick={() => setActiveTab(t.key)}
                      className={`text-[16px] text-[#004ac6] relative px-1 cursor-pointer transition-opacity flex items-center gap-1.5 ${
                        activeTab === t.key ? "font-bold opacity-100" : "opacity-80 hover:opacity-100"
                      }`}
                    >
                      {t.label}
                      <div
                        className={`absolute -bottom-[10px] left-0 right-0 h-1 rounded-t-full ${
                          activeTab === t.key ? "" : "hidden"
                        }`}
                        style={{
                          background:
                            "linear-gradient(135deg, rgb(37, 99, 235) 0%, rgb(20, 184, 166) 55%, rgb(16, 185, 129) 100%)",
                        }}
                      ></div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Import Tab Content */}
        {activeTab === "import" && (
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
                        isActive
                          ? "text-[#004ac6] font-bold"
                          : "text-[#64748B] hover:text-[#0F172A]"
                      }`}
                    >
                      <Icon size={16} />
                      {s.label}
                      {isActive && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#2563eb] via-[#14b8a6] to-[#10b981]"></div>
                      )}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={handleDownloadTemplate}
                className="px-4 py-1.5 text-sm font-medium rounded-xs transition flex items-center gap-2"
                style={{
                  border: "1px solid #0F52BA",
                  color: "#0F52BA",
                  background: "transparent",
                }}
              >
                <Download size={16} />
                Template
              </button>
            </div>

            {/* Upload Area */}
            {!isUploaded ? (
              <div
                className="border-2 border-dashed border-[#c3c6d7] rounded-xs p-12 text-center bg-white transition-colors hover:border-[#13B8A7]/50 cursor-pointer flex flex-col items-center justify-center min-h-[300px]"
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
              /* Preview Area */
              <div className="bg-white rounded-xs border border-[#E2E8F0] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col">
                <div className="p-4 border-b border-outline-variant/30 flex justify-between items-center bg-[#F8FAFC]">
                  <h3 className="font-semibold text-[#0F172A] flex items-center gap-2">
                    <Table size={18} className="text-[#004ac6]" />
                    Data Preview (<span className="font-normal">{activeSubTab.charAt(0).toUpperCase() + activeSubTab.slice(1)}.csv</span>)
                  </h3>
                  <button
                    onClick={handleResetUpload}
                    className="text-[#64748B] hover:text-[#0F172A] transition"
                  >
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
                        background:
                          "linear-gradient(135deg, rgb(37, 99, 235) 0%, rgb(20, 184, 166) 55%, rgb(16, 185, 129) 100%)",
                      }}
                    >
                      Import Anyway
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Import History */}
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
                        <tr
                          key={idx}
                          className={`${idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"} hover:bg-slate-50 transition-colors`}
                        >
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
        )}

        {/* Export Tab Content */}
        {activeTab === "export" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left: Configuration */}
              <div className="lg:col-span-2 space-y-6">
                {/* Data Type Selection */}
                <div className="bg-white rounded-xs border border-[#E2E8F0] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] p-6">
                  <h3 className="font-semibold text-[#0F172A] mb-4 flex items-center gap-2">
                    <Layers size={18} className="text-[#004ac6]" />
                    Select Data Type
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { key: "medicines", label: "Medicines Inventory", icon: Package },
                      { key: "customers", label: "Customer Records", icon: Users },
                      { key: "suppliers", label: "Supplier Directory", icon: Truck },
                    ].map((type) => {
                      const Icon = type.icon;
                      return (
                        <label key={type.key} className="cursor-pointer">
                          <input
                            type="radio"
                            name="export-type"
                            defaultChecked={type.key === "medicines"}
                            className="peer sr-only"
                          />
                          <div className="p-4 rounded-xs border-2 border-[#c3c6d7] peer-checked:border-[#004ac6] peer-checked:bg-[#e6eeff]/30 transition flex flex-col items-center text-center gap-2 hover:bg-[#F8FAFC]">
                            <Icon size={28} className="text-[#004ac6]" />
                            <span className="font-medium text-sm">{type.label}</span>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Format & Columns */}
                <div className="bg-white rounded-xs border border-[#E2E8F0] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] p-6">
                  <h3 className="font-semibold text-[#0F172A] mb-4 flex items-center gap-2">
                    <Filter size={18} className="text-[#004ac6]" />
                    Format &amp; Columns
                  </h3>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-[#64748B] mb-2">Export Format</label>
                    <div className="flex gap-4 flex-wrap">
                      {[
                        { key: "csv", label: "CSV (.csv)", icon: FileSpreadsheet },
                        { key: "xlsx", label: "Excel (.xlsx)", icon: FileSpreadsheet },
                        { key: "pdf", label: "PDF (.pdf)", icon: FileText },
                      ].map((format) => {
                        const Icon = format.icon;
                        return (
                          <label key={format.key} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="format"
                              defaultChecked={format.key === "csv"}
                              className="text-[#004ac6] focus:ring-[#004ac6] h-4 w-4"
                            />
                            <span className="text-sm flex items-center gap-1">
                              <Icon size={14} />
                              {format.label}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                  <div className="border-t border-outline-variant/30 pt-4">
                    <div className="flex justify-between items-center mb-3">
                      <label className="block text-sm font-medium text-[#64748B]">Select Columns</label>
                      <button
                        onClick={toggleAllColumns}
                        className="text-xs text-[#004ac6] font-medium hover:underline"
                      >
                        {selectedColumns.every((c) => c.checked) ? "Deselect All" : "Select All"}
                      </button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {selectedColumns.map((col, idx) => (
                        <label key={idx} className="flex items-center gap-2 text-sm cursor-pointer hover:text-[#0F172A]">
                          <input
                            type="checkbox"
                            checked={col.checked}
                            onChange={() => toggleColumn(idx)}
                            className="text-[#004ac6] rounded focus:ring-[#004ac6]"
                          />
                          {col.name}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Summary & Action */}
              <div className="space-y-6">
                <div className="bg-white rounded-xs border border-[#E2E8F0] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] p-6 flex flex-col h-full">
                  <h3 className="font-semibold text-[#0F172A] mb-4">Export Summary</h3>
                  <div className="space-y-3 flex-1">
                    <div className="flex justify-between text-sm pb-2 border-b border-outline-variant/30">
                      <span className="text-[#64748B]">Data Source</span>
                      <span className="font-medium text-[#0F172A]">Medicines Inventory</span>
                    </div>
                    <div className="flex justify-between text-sm pb-2 border-b border-outline-variant/30">
                      <span className="text-[#64748B]">Columns Selected</span>
                      <span className="font-medium text-[#0F172A]">
                        {selectedColumns.filter((c) => c.checked).length} of {selectedColumns.length}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm pb-2 border-b border-outline-variant/30">
                      <span className="text-[#64748B]">Est. Row Count</span>
                      <span className="font-medium text-[#0F172A]">~15,420</span>
                    </div>
                    <div className="mt-4 relative rounded-xs border border-[#E2E8F0] overflow-hidden bg-[#F8FAFC] h-24">
                      <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] z-10 flex items-center justify-center">
                        <span className="text-xs font-medium text-[#64748B] flex items-center gap-1">
                          <EyeOff size={14} />
                          Preview Blurred
                        </span>
                      </div>
                      <table className="w-full text-[8px] text-[#64748B] opacity-50">
                        <tbody>
                          <tr className="border-b border-[#E2E8F0]">
                            <th className="p-1">SKU</th>
                            <th className="p-1">Name</th>
                            <th className="p-1">Cat</th>
                          </tr>
                          <tr>
                            <td className="p-1">M-01</td>
                            <td className="p-1">Data</td>
                            <td className="p-1">A</td>
                          </tr>
                          <tr>
                            <td className="p-1">M-02</td>
                            <td className="p-1">Data</td>
                            <td className="p-1">B</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <button
                    onClick={handleExport}
                    disabled={isExporting}
                    className="mt-6 w-full py-3 text-white font-bold rounded-xs shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                    style={{
                      background:
                        "linear-gradient(135deg, rgb(37, 99, 235) 0%, rgb(20, 184, 166) 55%, rgb(16, 185, 129) 100%)",
                    }}
                  >
                    {isExporting ? (
                      <>
                        <RefreshCw size={16} className="animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Export Data Now
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}