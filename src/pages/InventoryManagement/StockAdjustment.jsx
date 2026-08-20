import { useState } from "react";
import { ArrowUp, AlertTriangle, Plus, X } from "lucide-react";

import StatCard from "../../components/inventoryManagement/common/StatCard";
import FilterBar from "../../components/inventoryManagement/common/FilterBar";
import DataTable from "../../components/inventoryManagement/common/DataTable";
import Pagination from "../../components/inventoryManagement/common/Pagination";
import StatusBadge from "../../components/inventoryManagement/common/StatusBadge";
import {
  stockAdjustmentItems,
  categories,
  warehouses,
} from "../../data/inventoryManagement/inventoryData";

const statusVariantMap = {
  Approved: "success",
  Pending: "warning",
  Rejected: "danger",
};

const columns = [
  {
    key: "name",
    label: "Item Name",
    render: (row) => (
      <span className="font-medium text-slate-900">{row.name}</span>
    ),
  },
  {
    key: "sku",
    label: "SKU / Item Code",
    render: (row) => (
      <span className="text-xs text-slate-500">{row.sku}</span>
    ),
  },
  {
    key: "currentStock",
    label: "Current Stock",
    align: "right",
    render: (row) => (
      <span className="font-semibold text-slate-900">
        {row.currentStock.toLocaleString()}
      </span>
    ),
  },
  {
    key: "adjQty",
    label: "Adj. Qty (+/-)",
    align: "right",
    render: (row) => (
      <span
        className={`font-semibold ${
          row.adjQty < 0 ? "text-rose-600" : "text-emerald-600"
        }`}
      >
        {row.adjQty > 0 ? `+${row.adjQty}` : row.adjQty}
      </span>
    ),
  },
  {
    key: "adjustedBy",
    label: "Adjusted By",
    render: (row) => <span className="text-slate-500">{row.adjustedBy}</span>,
  },
  { key: "reason", label: "Reason" },
  {
    key: "date",
    label: "Date",
    render: (row) => <span className="text-xs text-slate-500">{row.date}</span>,
  },
  {
    key: "status",
    label: "Status",
    align: "center",
    render: (row) => (
      <StatusBadge status={row.status} variant={statusVariantMap[row.status]} />
    ),
  },
];

const StockAdjustment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Stock Adjustment
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage stock quantity adjustments and approvals.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-3">
        <StatCard
          title="Total Adjustments Today"
          value="14,285"
          footerText="2.4% vs last month"
          footerIcon={ArrowUp}
          footerClass="text-emerald-600"
        />
        <StatCard
          title="Pending Approvals"
          value="12"
          footerText="Requires immediate attention"
          footerIcon={AlertTriangle}
          footerClass="text-amber-600"
        />
        <StatCard
          title="Total Quantity Adjusted"
          value="342"
          subtitle="Net adjustment for the period"
          footerIcon={AlertTriangle}
          footerText="Warning"
          footerClass="text-rose-600"
        />
      </div>

      <div className="mb-6">
        <FilterBar
          searchPlaceholder="Search by Name, SKU, or Code..."
          categories={categories}
          warehouses={warehouses}
          actionLabel="New Adjustment"
          actionIcon={Plus}
          onAction={() => setIsModalOpen(true)}
        />
      </div>

      <DataTable columns={columns} rows={stockAdjustmentItems} />

      <Pagination />

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <h2 className="text-lg font-bold text-slate-900">
                New Stock Adjustment
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 p-6">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-600">
                  Item Name / SKU
                </label>
                <select className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
                  <option>Amoxicillin 500mg Caps - MED-AMX-050</option>
                  <option>Ibuprofen 400mg Tabs - MED-IBU-400</option>
                  <option>Lisinopril 10mg Tabs - MED-LIS-010</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-600">
                  Current Stock Quantity
                </label>
                <input
                  type="text"
                  readOnly
                  value="12,400"
                  className="h-11 cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-500 outline-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-600">
                  Adjustment Type
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                    <input
                      type="radio"
                      name="adj_type"
                      defaultChecked
                      className="text-[#0F52BA] focus:ring-[#0F52BA]"
                    />
                    Decrease
                  </label>
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                    <input
                      type="radio"
                      name="adj_type"
                      className="text-[#0F52BA] focus:ring-[#0F52BA]"
                    />
                    Increase
                  </label>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-600">
                  Adjustment Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  placeholder="e.g. 50"
                  className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-600">
                  Reason
                </label>
                <select className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
                  <option>Damaged</option>
                  <option>Miscount</option>
                  <option>Return</option>
                  <option>Expired</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-600">
                  Notes
                </label>
                <textarea
                  rows="3"
                  placeholder="Add any relevant details..."
                  className="resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-200 bg-white px-6 py-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="h-11 rounded-xl border border-slate-200 px-5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                className="h-11 rounded-xl bg-linear-to-r from-[#0F52BA] to-[#13B8A7] px-6 text-sm font-semibold text-white shadow-md shadow-blue-200/50 transition hover:opacity-95"
              >
                Submit Adjustment
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StockAdjustment;