import { useState, useEffect } from "react";
import { AlertTriangle, DollarSign, Clock, Tag } from "lucide-react";

import StatCard from "../../components/inventoryManagement/common/StatCard";
import FilterBar from "../../components/inventoryManagement/common/FilterBar";
import DataTable from "../../components/inventoryManagement/common/DataTable";
import Pagination from "../../components/inventoryManagement/common/Pagination";
import StatusBadge from "../../components/inventoryManagement/common/StatusBadge";
import EntryModal from "../../components/inventoryManagement/common/EntryModal";
import { nearExpiryClearanceFields } from "../../components/inventoryManagement/common/entryModalConfigs";
import { postInventoryAction } from "../../services/inventoryApi";
import {
  nearExpiryItems,
  categories,
  warehouses,
} from "../../data/inventoryManagement/inventoryData";

const statusVariantMap = {
  "Urgent/Under 1 month": "danger",
  "Near Expiry/1-3 months": "warning",
  "Safe/6+ months": "success",
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
  { key: "batchNumber", label: "Batch Number" },
  {
    key: "expiryDate",
    label: "Expiry Date",
    render: (row) => <span className="text-xs text-on-surface-variant">{row.expiryDate}</span>,
  },
  {
    key: "timeRemaining",
    label: "Time Remaining",
    render: (row) => <span className="text-on-surface-variant">{row.timeRemaining}</span>,
  },
  {
    key: "quantity",
    label: "Quantity",
    align: "right",
    render: (row) => (
      <span className="font-semibold text-on-background">
        {row.quantity.toLocaleString()}
      </span>
    ),
  },
  {
    key: "unit",
    label: "Unit",
    render: (row) => <span className="text-on-surface-variant">{row.unit}</span>,
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

const NearExpiry = () => {
  const [itemsList, setItemsList] = useState(nearExpiryItems);
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
  const countNearExpiry = activeDataset.length;
  const urgentCount = activeDataset.filter((i) => String(i.status).includes("Urgent") || String(i.timeRemaining).includes("30") || String(i.timeRemaining).includes("month")).length;
  const totalValueRisk = activeDataset.reduce((sum, i) => sum + (Number(i.quantity || i.currentQty || 0) * 120), 0);

  const handleClearanceSubmit = async (values) => {
    try {
      await postInventoryAction("reports/expiry/", { action: "clearance", ...values });
    } catch {
      // Graceful fallback
    }

    const clearQty = Number(values.quantity || 50);
    setItemsList((prev) =>
      prev.map((item) => {
        if (
          String(item.sku).toLowerCase() === String(values.sku).toLowerCase() ||
          String(item.name).toLowerCase().includes(String(values.medicineName || "").toLowerCase())
        ) {
          const newQty = Math.max(0, item.quantity - clearQty);
          return {
            ...item,
            quantity: newQty,
            status: newQty === 0 ? "Cleared" : item.status,
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
          Near Expiry Stock
        </h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Monitor stock approaching expiry to minimize waste.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-3">
        <StatCard
          title="Items Near Expiry"
          value={countNearExpiry.toString()}
          footerText="Items requiring attention"
          footerIcon={AlertTriangle}
          footerClass="text-warning"
        />
        <StatCard
          title="Urgent / Under 30 Days"
          value={urgentCount.toString()}
          footerText="High priority disposal risk"
          footerIcon={Clock}
          footerClass="text-error"
        />
        <StatCard
          title="Total Value at Risk"
          value={`₹${totalValueRisk.toLocaleString()}`}
          footerText="Estimated loss if not utilized"
          footerIcon={DollarSign}
          footerClass="text-warning"
        />
      </div>

      <div className="mb-6">
        <FilterBar
          searchPlaceholder="Search by Name, SKU, or Code..."
          categories={categories}
          warehouses={warehouses}
          actionLabel="Clearance Sale"
          actionIcon={Tag}
          onAction={() => setIsModalOpen(true)}
        />
      </div>

      <DataTable columns={columns} defaultRows={itemsList} rows={itemsList} />

      <Pagination totalEntries={itemsList.length} />

      <EntryModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Initiate Clearance / Discount Sale"
        submitLabel="Apply Clearance"
        fields={nearExpiryClearanceFields}
        onSubmit={handleClearanceSubmit}
        endpoint="reports/expiry/"
      />
    </>
  );
};

export default NearExpiry;