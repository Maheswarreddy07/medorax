import { useState, useEffect } from "react";
import { ArrowUp, TrendingUp, Info } from "lucide-react";

import StatCard from "../../components/inventoryManagement/common/StatCard";
import FilterBar from "../../components/inventoryManagement/common/FilterBar";
import DataTable from "../../components/inventoryManagement/common/DataTable";
import Pagination from "../../components/inventoryManagement/common/Pagination";
import StatusBadge from "../../components/inventoryManagement/common/StatusBadge";
import EntryModal from "../../components/inventoryManagement/common/EntryModal";
import { reservedStockFields } from "../../components/inventoryManagement/common/entryModalConfigs";
import {
  reservedStockItems,
  warehouses,
} from "../../data/inventoryManagement/inventoryData";

const statusVariantMap = {
  Confirmed: "success",
  Pending: "warning",
  Expired: "danger",
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
  { key: "category", label: "Category" },
  {
    key: "reservedQty",
    label: "Reserved Quantity",
    align: "right",
    render: (row) => (
      <span className="font-semibold text-on-background">
        {row.reservedQty.toLocaleString()}
      </span>
    ),
  },
  { key: "reservedFor", label: "Reserved For" },
  {
    key: "unit",
    label: "Unit",
    render: (row) => <span className="text-on-surface-variant">{row.unit}</span>,
  },
  { key: "location", label: "Warehouse / Location" },
  {
    key: "reservationDate",
    label: "Reservation Date",
    render: (row) => <span className="text-xs text-on-surface-variant">{row.reservationDate}</span>,
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

const ReservedStock = () => {
  const [reservedList, setReservedList] = useState(reservedStockItems);
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

  const handleSave = (formData) => {
    const newItem = {
      id: Date.now(),
      name: formData.name || formData.itemName || "New Reservation",
      sku: formData.sku || formData.skuCode || `SKU-${Math.floor(Math.random() * 1000)}`,
      category: formData.category || "General",
      reservedQty: Number(formData.reservedQty || formData.quantity || 100),
      reservedFor: formData.reservedFor || "General Order",
      unit: formData.unit || "Boxes",
      location: formData.location || formData.warehouse || "Main Hub",
      reservationDate: "Just now",
      status: formData.status || "Pending",
    };
    setReservedList((prev) => [newItem, ...prev]);
    setIsModalOpen(false);
  };

  const activeDataset = filteredList !== null ? filteredList : reservedList;
  const totalReservedQty = activeDataset.reduce((acc, curr) => acc + (Number(curr.reservedQty || curr.reserved_stock || curr.quantity || 0)), 0);
  const pendingCount = activeDataset.filter(i => String(i.status).toLowerCase().includes("pending")).length;

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-on-background">
          Reserved Stock
        </h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Track stock reserved for pending orders and commitments.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-3">
        <StatCard
          title="Total Reserved Items"
          value={totalReservedQty.toLocaleString()}
          footerText={`${activeDataset.length} reservations`}
          footerIcon={ArrowUp}
          footerClass="text-secondary"
        />
        <StatCard
          title="Total Reserved Stock Value"
          value={`₹${(totalReservedQty * 250).toLocaleString()}`}
          footerText="Inventory healthy"
          footerIcon={TrendingUp}
          footerClass="text-secondary"
        />
        <StatCard
          title="Pending Reservations"
          value={`${pendingCount} Pending`}
          footerText="Action required"
          footerIcon={Info}
          footerClass="text-secondary"
        />
      </div>

      <div className="mb-6">
        <FilterBar
          searchPlaceholder="Search by Name, SKU, or Code..."
          warehouses={warehouses}
          actionLabel="Add Reservation"
          onAction={() => setIsModalOpen(true)}
        />
      </div>

      <DataTable columns={columns} defaultRows={reservedList} rows={reservedList} />

      <Pagination totalEntries={reservedList.length} />

      <EntryModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Reservation"
        submitLabel="Add Reservation"
        fields={reservedStockFields}
        onSubmit={handleSave}
      />
    </>
  );
};

export default ReservedStock;
