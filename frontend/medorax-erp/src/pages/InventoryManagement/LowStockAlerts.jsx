import { useState, useEffect } from "react";
import {
  TrendingDown,
  AlertTriangle,
  ShoppingCart,
  RefreshCw,
} from "lucide-react";

import StatCard from "../../components/inventoryManagement/common/StatCard";
import FilterBar from "../../components/inventoryManagement/common/FilterBar";
import DataTable from "../../components/inventoryManagement/common/DataTable";
import Pagination from "../../components/inventoryManagement/common/Pagination";
import StatusBadge from "../../components/inventoryManagement/common/StatusBadge";
import EntryModal from "../../components/inventoryManagement/common/EntryModal";
import { reorderStockFields } from "../../components/inventoryManagement/common/entryModalConfigs";
import { postInventoryAction, getCurrentUser } from "../../services/inventoryApi";
import {
  lowStockItems,
  categories,
  warehouses,
} from "../../data/inventoryManagement/inventoryData";

const statusVariantMap = {
  Low: "warning",
  Critical: "danger",
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
    key: "currentQty",
    label: "Current Quantity",
    align: "right",
    render: (row) => (
      <span className="font-semibold text-on-background">
        {row.currentQty.toLocaleString()}
      </span>
    ),
  },
  {
    key: "reorderThreshold",
    label: "Reorder Threshold",
    align: "right",
    render: (row) => (
      <span className="text-on-surface-variant">
        {row.reorderThreshold.toLocaleString()}
      </span>
    ),
  },
  {
    key: "shortageAmount",
    label: "Shortage Amount",
    align: "right",
    render: (row) => (
      <span className="font-semibold text-error">
        {row.shortageAmount.toLocaleString()}
      </span>
    ),
  },
  {
    key: "unit",
    label: "Unit",
    render: (row) => (
      <span className="text-on-surface-variant">{row.unit}</span>
    ),
  },
  { key: "location", label: "Warehouse / Location" },
  {
    key: "status",
    label: "Status",
    align: "center",
    render: (row) => (
      <StatusBadge status={row.status} variant={statusVariantMap[row.status] || "warning"} />
    ),
  },
];

const LowStockAlerts = () => {
  const [itemsList, setItemsList] = useState(lowStockItems);
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

  const activeDataset = filteredList !== null ? filteredList : itemsList;
  const lowCount = activeDataset.length;
  const criticalCount = activeDataset.filter((i) => String(i.status).toLowerCase().includes("critical")).length;
  const pendingReorderCount = activeDataset.filter((i) => Number(i.currentQty || i.current_stock || 0) < Number(i.reorderThreshold || i.reorder_level || 10)).length;

  const handleReorderSubmit = async (values) => {
    try {
      await postInventoryAction("alerts/low-stock/", { action: "reorder", ...values });
    } catch {
      // Graceful fallback
    }

    const reorderQty = Number(values.quantity || 100);
    setItemsList((prev) =>
      prev.map((item) => {
        if (
          String(item.sku).toLowerCase() === String(values.sku).toLowerCase() ||
          String(item.name).toLowerCase().includes(String(values.medicineName || "").toLowerCase())
        ) {
          const newQty = item.currentQty + reorderQty;
          const newShortage = Math.max(0, item.reorderThreshold - newQty);
          return {
            ...item,
            currentQty: newQty,
            shortageAmount: newShortage,
            status: newShortage > 0 ? (newQty < 20 ? "Critical" : "Low") : "Normal",
          };
        }
        return item;
      })
    );
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-on-background">
          Low Stock Alerts
        </h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Identify items below recommended stock thresholds.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-3">
        <StatCard
          title="Items Low on Stock"
          value={lowCount.toString()}
          footerText="Items below recommended threshold"
          footerIcon={TrendingDown}
          footerClass="text-warning"
        />
        <StatCard
          title="Critical Items"
          value={criticalCount.toString()}
          footerText="Requires immediate reordering"
          footerIcon={AlertTriangle}
          footerClass="text-error"
        />
        <StatCard
          title="Items Pending Reorder"
          value={pendingReorderCount.toString()}
          footerText="Currently in procurement queue"
          footerIcon={ShoppingCart}
          footerClass="text-primary"
        />
      </div>

      <div className="mb-6">
        <FilterBar
          searchPlaceholder="Search by Name, SKU, or Code..."
          categories={categories}
          warehouses={warehouses}
          actionLabel="Reorder Now"
          actionIcon={RefreshCw}
          onAction={() => setIsModalOpen(true)}
        />
      </div>

      <DataTable columns={columns} defaultRows={itemsList} rows={itemsList} />

      <Pagination totalEntries={itemsList.length} />

      <EntryModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Reorder Request"
        submitLabel="Submit Reorder"
        fields={reorderStockFields}
        onSubmit={handleReorderSubmit}
        endpoint="alerts/low-stock/"
      />
    </>
  );
};

export default LowStockAlerts;
