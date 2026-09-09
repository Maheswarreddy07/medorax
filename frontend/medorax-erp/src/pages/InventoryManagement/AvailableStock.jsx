import { useState, useEffect } from "react";
import { ArrowUp, TrendingUp, Info } from "lucide-react";

import StatCard from "../../components/inventoryManagement/common/StatCard";
import FilterBar from "../../components/inventoryManagement/common/FilterBar";
import DataTable from "../../components/inventoryManagement/common/DataTable";
import Pagination from "../../components/inventoryManagement/common/Pagination";
import StatusBadge from "../../components/inventoryManagement/common/StatusBadge";
import EntryModal from "../../components/inventoryManagement/common/EntryModal";
import { availableStockFields } from "../../components/inventoryManagement/common/entryModalConfigs";
import { postInventory } from "../../services/inventoryApi";
import {
  availableStockItems,
  categories,
  warehouses,
} from "../../data/inventoryManagement/inventoryData";

const statusVariantMap = {
  Available: "success",
  "Partially Reserved": "warning",
  "Fully Reserved": "danger",
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
    key: "totalQty",
    label: "Total Stock Quantity",
    align: "right",
    render: (row) => (
      <span className="font-semibold text-on-background">
        {row.totalQty.toLocaleString()}
      </span>
    ),
  },
  {
    key: "reservedQty",
    label: "Reserved Quantity",
    align: "right",
    render: (row) => (
      <span className="text-on-surface-variant">{row.reservedQty.toLocaleString()}</span>
    ),
  },
  {
    key: "availableQty",
    label: "Available Quantity",
    align: "right",
    render: (row) => (
      <span className="font-semibold text-on-background">
        {row.availableQty.toLocaleString()}
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
      <StatusBadge status={row.status} variant={statusVariantMap[row.status] || "success"} />
    ),
  },
];

const AvailableStock = () => {
  const [stockList, setStockList] = useState(availableStockItems);
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

  const handleSaveStock = async (values) => {
    try {
      await postInventory(values);
    } catch {
      // Graceful fallback for offline mode
    }

    const totalQty = Number(values.totalQty || values.quantity || 100);
    const reservedQty = Number(values.reservedQty || 0);
    const availableQty = Math.max(0, totalQty - reservedQty);

    const newItem = {
      id: Date.now(),
      name: values.name || values.medicineName || values.itemName || "New Stock Item",
      sku: values.sku || `SKU-${Math.floor(Math.random() * 1000)}`,
      category: values.category || "General",
      totalQty: totalQty,
      reservedQty: reservedQty,
      availableQty: availableQty,
      unit: values.unit || "Boxes (50s)",
      location: values.location || values.warehouse || "Main Hub",
      status: availableQty > 0 ? (reservedQty > 0 ? "Partially Reserved" : "Available") : "Fully Reserved",
    };

    setStockList((prev) => [newItem, ...prev]);
    setIsModalOpen(false);
  };

  const activeDataset = filteredList !== null ? filteredList : stockList;
  const totalAvailableQty = activeDataset.reduce((acc, item) => acc + (Number(item.availableQty || item.available_stock || item.quantity || 0)), 0);
  const totalReservedQty = activeDataset.reduce((acc, item) => acc + (Number(item.reservedQty || item.reserved_stock || 0)), 0);

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-on-background">
          Available Stock
        </h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          View stock that is currently available for use or sale.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-3">
        <StatCard
          title="Total Available Items"
          value={totalAvailableQty.toLocaleString()}
          footerText={`${activeDataset.length} items recorded`}
          footerIcon={ArrowUp}
          footerClass="text-secondary"
        />
        <StatCard
          title="Total Available Stock Value"
          value={`₹${(totalAvailableQty * 200).toLocaleString()}`}
          footerText="Inventory healthy"
          footerIcon={TrendingUp}
          footerClass="text-secondary"
        />
        <StatCard
          title="Reserved vs Available Ratio"
          value={`${totalReservedQty} / ${totalAvailableQty}`}
          footerText="Stock status good"
          footerIcon={Info}
          footerClass="text-secondary"
        />
      </div>

      <div className="mb-6">
        <FilterBar
          searchPlaceholder="Search by Name, SKU, or Code..."
          categories={categories}
          warehouses={warehouses}
          actionLabel="Add Stock"
          onAction={() => setIsModalOpen(true)}
        />
      </div>

      <DataTable columns={columns} defaultRows={stockList} rows={stockList} />

      <Pagination totalEntries={stockList.length} />

      <EntryModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Available Stock"
        submitLabel="Add Stock"
        fields={availableStockFields}
        onSubmit={handleSaveStock}
      />
    </>
  );
};

export default AvailableStock;
