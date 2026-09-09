import { useState, useEffect } from "react";
import { ArrowUp, AlertTriangle, Plus } from "lucide-react";

import StatCard from "../../components/inventoryManagement/common/StatCard";
import FilterBar from "../../components/inventoryManagement/common/FilterBar";
import DataTable from "../../components/inventoryManagement/common/DataTable";
import Pagination from "../../components/inventoryManagement/common/Pagination";
import StatusBadge from "../../components/inventoryManagement/common/StatusBadge";
import EntryModal from "../../components/inventoryManagement/common/EntryModal";
import { stockTransferFields } from "../../components/inventoryManagement/common/entryModalConfigs";
import { postInventoryAction } from "../../services/inventoryApi";
import { stockTransferItems, categories, warehouses } from "../../data/inventoryManagement/inventoryData";

const statusVariantMap = {
  Completed: "success",
  "In Transit": "warning",
  Cancelled: "danger",
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
    key: "transferQty",
    label: "Transfer Quantity",
    align: "right",
    render: (row) => (
      <span className="font-semibold text-on-background">
        {row.transferQty.toLocaleString()}
      </span>
    ),
  },
  { key: "fromWarehouse", label: "From Warehouse" },
  { key: "toWarehouse", label: "To Warehouse" },
  {
    key: "transferredBy",
    label: "Transferred By",
    render: (row) => (
      <span className="text-on-surface-variant">{row.transferredBy}</span>
    ),
  },
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

const StockTransfer = () => {
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

  const activeDataset = filteredList !== null ? filteredList : stockTransferItems;

  const handleSubmit = async (values) => {
    await postInventoryAction("transfers/", {
      sku: values.sku,
      medicineName: values.medicineName,
      quantity: values.quantity,
      fromWarehouse: values.fromWarehouse,
      toWarehouse: values.toWarehouse,
    });
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-on-background">
          Stock Transfer
        </h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Manage stock transfers between warehouses and facilities.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-3">
        <StatCard
          title="Total Transfers"
          value={activeDataset.length.toString()}
          footerText="Active record entries"
          footerIcon={ArrowUp}
          footerClass="text-secondary"
        />
        <StatCard
          title="In Transit / Pending"
          value={activeDataset.filter(i => String(i.status).toLowerCase().includes("transit") || String(i.status).toLowerCase().includes("pending")).length.toString()}
          footerText="Requires tracking"
          footerIcon={AlertTriangle}
          footerClass="text-warning"
        />
        <StatCard
          title="Total Quantity Transferred"
          value={activeDataset.reduce((sum, i) => sum + (Number(i.transferQty || i.quantity) || 0), 0).toLocaleString()}
          subtitle="Net transfers"
          footerIcon={ArrowUp}
          footerText="Transfer flow active"
          footerClass="text-secondary"
        />
      </div>

      <div className="mb-6">
        <FilterBar
          searchPlaceholder="Search by Name, SKU, or Code..."
          categories={categories}
          warehouses={warehouses}
          actionLabel="New Transfer"
          actionIcon={Plus}
          onAction={() => setIsModalOpen(true)}
        />
      </div>

      <DataTable columns={columns} endpoint="transfers/" defaultRows={stockTransferItems} />

      <Pagination totalEntries={activeDataset.length} />

      <EntryModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="New Stock Transfer"
        submitLabel="Create Transfer"
        fields={stockTransferFields}
        onSubmit={handleSubmit}
        endpoint="transfers/"
      />
    </>
  );
};

export default StockTransfer;
