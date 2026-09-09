import { useState, useEffect } from "react";
import { ArrowUp, AlertTriangle, Plus, X } from "lucide-react";

import StatCard from "../../components/inventoryManagement/common/StatCard";
import FilterBar from "../../components/inventoryManagement/common/FilterBar";
import DataTable from "../../components/inventoryManagement/common/DataTable";
import Pagination from "../../components/inventoryManagement/common/Pagination";
import StatusBadge from "../../components/inventoryManagement/common/StatusBadge";
import { postInventoryAction } from "../../services/inventoryApi";
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
      <span className="font-medium text-on-background">{row.name}</span>
    ),
  },
  {
    key: "sku",
    label: "SKU / Item Code",
    render: (row) => (
      <span className="text-xs text-on-surface-variant">{row.sku}</span>
    ),
  },
  {
    key: "currentStock",
    label: "Current Stock",
    align: "right",
    render: (row) => (
      <span className="font-semibold text-on-background">
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
          row.adjQty < 0 ? "text-error" : "text-secondary"
        }`}
      >
        {row.adjQty > 0 ? `+${row.adjQty}` : row.adjQty}
      </span>
    ),
  },
  {
    key: "adjustedBy",
    label: "Adjusted By",
    render: (row) => (
      <span className="text-on-surface-variant">{row.adjustedBy}</span>
    ),
  },
  { key: "reason", label: "Reason" },
  {
    key: "date",
    label: "Date",
    render: (row) => (
      <span className="text-xs text-on-surface-variant">{row.date}</span>
    ),
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
  const [filteredList, setFilteredList] = useState(null);

  useEffect(() => {
    const handleFilteredData = (e) => {
      if (e.detail && Array.isArray(e.detail.rows)) {
        setFilteredList(e.detail.rows);
      }
    };
    window.addEventListener("inventory-filtered-data", handleFilteredData);
    return () => window.removeEventListener("inventory-filtered-data", handleFilteredData);
  }, []);

  const activeDataset = filteredList !== null ? filteredList : stockAdjustmentItems;

  const submitAdjustment = async () => {
    const selection = document.getElementById("adjustment-medicine").value;
    const quantity = document.getElementById("adjustment-quantity").value;
    const type = document.querySelector('input[name="adj_type"]:checked').value;
    const reason = document.getElementById("adjustment-reason").value;
    await postInventoryAction("adjust/", {
      sku: selection.split(" - ").pop(),
      quantity,
      adjustmentType: type,
      reason,
    });
    setIsModalOpen(false);
    window.dispatchEvent(new CustomEvent("inventory-refresh"));
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-on-background">
          Stock Adjustment
        </h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Manage stock quantity adjustments and approvals.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-3">
        <StatCard
          title="Total Adjustments"
          value={activeDataset.length.toLocaleString()}
          footerText="Active adjustments recorded"
          footerIcon={ArrowUp}
          footerClass="text-secondary"
        />
        <StatCard
          title="Pending Approvals"
          value={activeDataset.filter((i) => String(i.status).toLowerCase().includes("pending") || String(i.status).toLowerCase().includes("review")).length.toString()}
          footerText="Requires immediate attention"
          footerIcon={AlertTriangle}
          footerClass="text-warning"
        />
        <StatCard
          title="Total Quantity Adjusted"
          value={activeDataset.reduce((sum, i) => sum + Math.abs(Number(i.adjustedQty || i.adjQty || i.quantity || 0)), 0).toLocaleString()}
          subtitle="Net adjustment quantity"
          footerIcon={ArrowUp}
          footerText="Adjustments processed"
          footerClass="text-secondary"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-surface-container-lowest shadow-xl">
            <div className="flex items-center justify-between border-b border-outline-variant px-6 py-4">
              <h2 className="text-lg font-bold text-on-background">
                New Stock Adjustment
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1 text-outline transition hover:bg-surface-container hover:text-on-surface-variant"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 p-6">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-on-surface-variant">
                  Item Name / SKU
                </label>
                <select
                  id="adjustment-medicine"
                  className="h-11 rounded-xl border border-outline-variant bg-surface-container-lowest px-3 text-sm text-on-surface-variant outline-none transition focus:border-primary focus:ring-2 focus:ring-primary-fixed"
                >
                  <option>Amoxicillin 500mg Caps - MED-AMX-050</option>
                  <option>Ibuprofen 400mg Tabs - MED-IBU-400</option>
                  <option>Lisinopril 10mg Tabs - MED-LIS-010</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-on-surface-variant">
                  Current Stock Quantity
                </label>
                <input
                  type="text"
                  readOnly
                  value="12,400"
                  className="h-11 cursor-not-allowed rounded-xl border border-outline-variant bg-surface-container-low px-3 text-sm text-on-surface-variant outline-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-on-surface-variant">
                  Adjustment Type
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-on-surface-variant">
                    <input
                      type="radio"
                      name="adj_type"
                      value="Decrease"
                      defaultChecked
                      className="text-primary focus:ring-primary"
                    />
                    Decrease
                  </label>
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-on-surface-variant">
                    <input
                      type="radio"
                      name="adj_type"
                      value="Increase"
                      className="text-primary focus:ring-primary"
                    />
                    Increase
                  </label>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-on-surface-variant">
                  Adjustment Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  placeholder="e.g. 50"
                  id="adjustment-quantity"
                  className="h-11 rounded-xl border border-outline-variant bg-surface-container-lowest px-3 text-sm text-on-surface-variant outline-none transition focus:border-primary focus:ring-2 focus:ring-primary-fixed"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-on-surface-variant">
                  Reason
                </label>
                <select
                  id="adjustment-reason"
                  className="h-11 rounded-xl border border-outline-variant bg-surface-container-lowest px-3 text-sm text-on-surface-variant outline-none transition focus:border-primary focus:ring-2 focus:ring-primary-fixed"
                >
                  <option>Damaged</option>
                  <option>Miscount</option>
                  <option>Return</option>
                  <option>Expired</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-on-surface-variant">
                  Notes
                </label>
                <textarea
                  rows="3"
                  placeholder="Add any relevant details..."
                  className="resize-none rounded-xl border border-outline-variant bg-surface-container-lowest px-3 py-2 text-sm text-on-surface-variant outline-none transition focus:border-primary focus:ring-2 focus:ring-primary-fixed"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-outline-variant bg-surface-container-lowest px-6 py-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="h-11 rounded-xl border border-outline-variant px-5 text-sm font-medium text-on-surface-variant transition hover:bg-surface-container-low"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={submitAdjustment}
                className="h-11 rounded-xl bg-linear-to-r from-primary to-primary-container px-6 text-sm font-semibold text-on-primary shadow-md shadow-primary-fixed/50 transition hover:opacity-95"
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
