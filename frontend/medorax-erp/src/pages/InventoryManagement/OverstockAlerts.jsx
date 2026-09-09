import { useState, useEffect } from "react";
import {
  PackageCheck,
  AlertTriangle,
  DollarSign,
  ArrowLeftRight,
} from "lucide-react";

import StatCard from "../../components/inventoryManagement/common/StatCard";
import FilterBar from "../../components/inventoryManagement/common/FilterBar";
import DataTable from "../../components/inventoryManagement/common/DataTable";
import Pagination from "../../components/inventoryManagement/common/Pagination";
import StatusBadge from "../../components/inventoryManagement/common/StatusBadge";
import EntryModal from "../../components/inventoryManagement/common/EntryModal";
import { redistributeStockFields } from "../../components/inventoryManagement/common/entryModalConfigs";
import { postInventoryAction, getCurrentUser } from "../../services/inventoryApi";
import {
  overstockItems,
  categories,
  warehouses,
} from "../../data/inventoryManagement/inventoryData";

const statusVariantMap = {
  Overstocked: "warning",
  "Severely Overstocked": "danger",
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
    key: "idealMaxThreshold",
    label: "Ideal Max Threshold",
    align: "right",
    render: (row) => (
      <span className="text-on-surface-variant">
        {row.idealMaxThreshold.toLocaleString()}
      </span>
    ),
  },
  {
    key: "excessQty",
    label: "Excess Quantity",
    align: "right",
    render: (row) => (
      <span className="font-semibold text-on-tertiary-fixed-variant">
        +{row.excessQty.toLocaleString()}
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

const OverstockAlerts = () => {
  const [itemsList, setItemsList] = useState(overstockItems);
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
  const overstockCount = activeDataset.length;
  const severeCount = activeDataset.filter((i) => String(i.status).toLowerCase().includes("severely") || String(i.status).toLowerCase().includes("critical")).length;
  const excessQtyTotal = activeDataset.reduce((sum, i) => sum + (Number(i.excessQty || i.excess_stock || i.quantity) || 0), 0);
  const excessValueTotal = excessQtyTotal * 150;

  const handleRedistributeSubmit = async (values) => {
    try {
      await postInventoryAction("alerts/overstock/", { action: "redistribute", ...values });
    } catch {
      // Graceful fallback
    }

    const redistQty = Number(values.quantity || 500);
    setItemsList((prev) =>
      prev.map((item) => {
        if (
          String(item.sku).toLowerCase() === String(values.sku).toLowerCase() ||
          String(item.name).toLowerCase().includes(String(values.medicineName || "").toLowerCase())
        ) {
          const newQty = Math.max(item.idealMaxThreshold, item.currentQty - redistQty);
          const newExcess = Math.max(0, newQty - item.idealMaxThreshold);
          return {
            ...item,
            currentQty: newQty,
            excessQty: newExcess,
            status: newExcess > 5000 ? "Severely Overstocked" : (newExcess > 0 ? "Overstocked" : "Balanced"),
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
          Overstock Alerts
        </h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Identify items exceeding ideal maximum stock thresholds.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-3">
        <StatCard
          title="Overstocked Items"
          value={overstockCount.toString()}
          footerText="Items exceeding ideal max thresholds"
          footerIcon={PackageCheck}
          footerClass="text-warning"
        />
        <StatCard
          title="Severely Overstocked"
          value={severeCount.toString()}
          footerText="Critical excess requiring redistribution"
          footerIcon={AlertTriangle}
          footerClass="text-error"
        />
        <StatCard
          title="Excess Stock Value"
          value={`₹${excessValueTotal.toLocaleString()}`}
          footerText="Total capital tied in surplus inventory"
          footerIcon={DollarSign}
          footerClass="text-warning"
        />
      </div>

      <div className="mb-6">
        <FilterBar
          searchPlaceholder="Search by Name, SKU, or Code..."
          categories={categories}
          warehouses={warehouses}
          actionLabel="Redistribute"
          actionIcon={ArrowLeftRight}
          onAction={() => setIsModalOpen(true)}
        />
      </div>

      <DataTable columns={columns} defaultRows={itemsList} rows={itemsList} />

      <Pagination totalEntries={itemsList.length} />

      <EntryModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Stock Redistribution"
        submitLabel="Redistribute Stock"
        fields={redistributeStockFields}
        onSubmit={handleRedistributeSubmit}
        endpoint="alerts/overstock/"
      />
    </>
  );
};

export default OverstockAlerts;
