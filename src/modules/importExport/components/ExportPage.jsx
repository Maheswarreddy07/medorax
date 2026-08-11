import React, { useState } from "react";
import {
  FileSpreadsheet,
  FileText,
  Layers,
  Filter,
  ArrowRight,
  Package,
  Users,
  Truck,
  EyeOff,
  RefreshCw,
  CheckCircle,
} from "lucide-react";
import { exportColumns } from "../importExportPage/data";

export default function ExportPage({ onToast }) {
  const [isExporting, setIsExporting] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState(
    exportColumns.map((c) => ({ name: c, checked: true }))
  );

  const toggleColumn = (index) => {
    setSelectedColumns((prev) =>
      prev.map((col, i) => (i === index ? { ...col, checked: !col.checked } : col))
    );
  };

  const toggleAllColumns = () => {
    const allChecked = selectedColumns.every((c) => c.checked);
    setSelectedColumns((prev) => prev.map((col) => ({ ...col, checked: !allChecked })));
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      onToast?.({
        title: "Export Complete",
        message: "medicines_inventory.csv has been downloaded.",
        icon: CheckCircle,
      });
    }, 1500);
  };

  return (
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
                <button onClick={toggleAllColumns} className="text-xs text-[#004ac6] font-medium hover:underline">
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

        {/* Right: Summary */}
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
                background: "linear-gradient(135deg, rgb(37, 99, 235) 0%, rgb(20, 184, 166) 55%, rgb(16, 185, 129) 100%)",
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
  );
}