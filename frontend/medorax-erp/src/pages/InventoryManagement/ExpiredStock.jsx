import { useState, useEffect } from "react";
import { CalendarX, DollarSign, Trash2 } from "lucide-react";

import StatCard from "../../components/inventoryManagement/common/StatCard";
import FilterBar from "../../components/inventoryManagement/common/FilterBar";
import DataTable from "../../components/inventoryManagement/common/DataTable";
import Pagination from "../../components/inventoryManagement/common/Pagination";
import StatusBadge from "../../components/inventoryManagement/common/StatusBadge";
import EntryModal from "../../components/inventoryManagement/common/EntryModal";
import { expiredStockFields } from "../../components/inventoryManagement/common/entryModalConfigs";
import { postInventoryAction } from "../../services/inventoryApi";
import { expiredStockItems, categories, warehouses } from "../../data/inventoryManagement/inventoryData";

const statusVariantMap = {
  "Pending Action": "danger",
  "Under Review": "warning",
  Disposed: "success",
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
    render: (row) => (
      <span className="text-xs text-on-surface-variant">{row.expiryDate}</span>
    ),
  },
  {
    key: "expiredQty",
    label: "Expired Quantity",
    align: "right",
    render: (row) => (
      <span className="font-semibold text-on-background">
        {row.expiredQty.toLocaleString()}
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
      <StatusBadge status={row.status} variant={statusVariantMap[row.status]} />
    ),
  },
];

const ExpiredStock = () => {
  const [expiredList, setExpiredList] = useState(expiredStockItems);
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

  const activeDataset = filteredList !== null ? filteredList : expiredList;
  const totalExpiredQty = activeDataset.reduce((acc, i) => acc + (Number(i.expiredQty || i.quantity || 0)), 0);
  const totalExpiredValue = totalExpiredQty * 140;
  const pendingDisposalCount = activeDataset.filter((i) => String(i.status).toLowerCase().includes("pending") || String(i.status).toLowerCase().includes("quarantined")).length;

  const handleSubmit = async (values) => {
    try {
      await postInventoryAction("expired-stock/", {
        sku: values.sku,
        medicineName: values.medicineName,
        warehouse: values.warehouse,
        quantity: values.quantity,
      });
    } catch {
      // Graceful fallback
    }

    const newItem = {
      id: Date.now(),
      name: values.medicineName || values.itemName || "Expired Item",
      sku: values.sku || `SKU-${Math.floor(Math.random() * 1000)}`,
      batchNumber: "B-" + Math.floor(1000 + Math.random() * 9000),
      expiryDate: new Date().toLocaleDateString(),
      expiredQty: Number(values.quantity || 10),
      unit: values.unit || "Boxes",
      location: values.warehouse || "Main Hub",
      status: "Disposed",
    };

    setExpiredList((prev) => [newItem, ...prev]);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-on-background">
          Expired Stock
        </h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Track and manage expired stock items for disposal.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-3">
        <StatCard
          title="Total Expired Items"
          value={totalExpiredQty.toLocaleString()}
          footerText={`${activeDataset.length} expired batches`}
          footerIcon={CalendarX}
          footerClass="text-error"
        />
        <StatCard
          title="Total Expired Value"
          value={`₹${totalExpiredValue.toLocaleString()}`}
          footerText="Value loss recorded"
          footerIcon={DollarSign}
          footerClass="text-error"
        />
        <StatCard
          title="Pending Disposal"
          value={pendingDisposalCount.toString()}
          footerText="Requires disposal action"
          footerIcon={Trash2}
          footerClass="text-warning"
        />
      </div>

      <div className="mb-6">
        <FilterBar
          searchPlaceholder="Search by Name, SKU, or Code..."
          categories={categories}
          warehouses={warehouses}
          actionLabel="Dispose Stock"
          onAction={() => setIsModalOpen(true)}
        />
      </div>

      <DataTable columns={columns} defaultRows={expiredList} rows={expiredList} />

      <Pagination totalEntries={expiredList.length} />

      <EntryModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Dispose Expired Stock"
        submitLabel="Submit Disposal"
        fields={expiredStockFields}
        onSubmit={handleSubmit}
        endpoint="expired-stock/"
      />
    </>
  );
};

export default ExpiredStock;
