import { useState, useEffect } from "react";
import { ArrowUp, TrendingUp, AlertTriangle, Edit, Trash2, Eye } from "lucide-react";

import StatCard from "../../components/inventoryManagement/common/StatCard";
import FilterBar from "../../components/inventoryManagement/common/FilterBar";
import DataTable from "../../components/inventoryManagement/common/DataTable";
import Pagination from "../../components/inventoryManagement/common/Pagination";
import StatusBadge from "../../components/inventoryManagement/common/StatusBadge";
import EntryModal from "../../components/inventoryManagement/common/EntryModal";
import { addStockFields } from "../../components/inventoryManagement/common/entryModalConfigs";
import {
  currentStockItems,
  categories,
  warehouses,
} from "../../data/inventoryManagement/inventoryData";

const statusVariantMap = {
  "In Stock": "success",
  "Low Stock": "warning",
  "Out of Stock": "danger",
};

const CurrentStock = () => {
  const [stockList, setStockList] = useState(currentStockItems);
  const [filteredList, setFilteredList] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [openActionId, setOpenActionId] = useState(null);

  useEffect(() => {
    const handleFilteredData = (e) => {
      if (e.detail && Array.isArray(e.detail.rows)) {
        setFilteredList(e.detail.rows);
      }
    };
    window.addEventListener("inventory-filtered-data", handleFilteredData);
    return () => window.removeEventListener("inventory-filtered-data", handleFilteredData);
  }, []);

  const activeDataset = filteredList !== null ? filteredList : stockList;
  const totalItemsCount = activeDataset.reduce((acc, curr) => acc + (Number(curr.quantity || curr.total_stock || curr.available_stock || 0)), 0);
  const totalStockValue = activeDataset.reduce((acc, curr) => acc + ((Number(curr.quantity || curr.total_stock || curr.available_stock || 0)) * 150), 0);
  const lowStockCount = activeDataset.filter((item) => item.status === "Low Stock" || (Number(item.quantity || item.total_stock || 0)) < 100).length;

  const handleSaveStock = (formData) => {
    if (editingRow) {
      setStockList((prev) =>
        prev.map((item) =>
          item.id === editingRow.id
            ? {
                ...item,
                quantity: Number(formData.quantity) || item.quantity,
                location: formData.location || item.location,
                unit: formData.unit || item.unit,
                status: Number(formData.quantity) > 100 ? "In Stock" : "Low Stock",
              }
            : item,
        ),
      );
      setEditingRow(null);
    } else {
      const newItem = {
        id: Date.now(),
        name: formData.name || "New Item",
        sku: formData.sku || `SKU-${Math.floor(Math.random() * 1000)}`,
        category: formData.category || "General",
        quantity: Number(formData.quantity) || 0,
        unit: formData.unit || "Units",
        location: formData.location || "Main Hub",
        status: Number(formData.quantity) > 100 ? "In Stock" : "Low Stock",
        lastUpdated: "Just now",
      };
      setStockList((prev) => [newItem, ...prev]);
      setIsAddModalOpen(false);
    }
  };

  const handleDelete = (id) => {
    setStockList((prev) => prev.filter((item) => item.id !== id));
    setOpenActionId(null);
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
      label: "SKU / Code",
      render: (row) => (
        <span className="text-xs text-on-surface-variant">{row.sku}</span>
      ),
    },
    { key: "category", label: "Category" },
    {
      key: "quantity",
      label: "Qty",
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
      render: (row) => (
        <span className="text-on-surface-variant">{row.unit}</span>
      ),
    },
    { key: "location", label: "Location" },
    {
      key: "status",
      label: "Status",
      align: "center",
      render: (row) => (
        <StatusBadge status={row.status} variant={statusVariantMap[row.status] || "primary"} />
      ),
    },
    {
      key: "lastUpdated",
      label: "Last Updated",
      render: (row) => (
        <span className="text-xs text-on-surface-variant">{row.lastUpdated}</span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      align: "center",
      render: (row) => (
        <div className="relative inline-block text-left">
          <button
            type="button"
            onClick={() => setOpenActionId(openActionId === row.id ? null : row.id)}
            className="flex items-center justify-center rounded-lg border border-outline-variant px-2.5 py-1 text-xs font-semibold text-primary transition hover:bg-primary/10"
          >
            Actions
          </button>
          {openActionId === row.id && (
            <div className="absolute right-0 z-30 mt-1 w-36 rounded-xl border border-outline-variant bg-surface p-1 shadow-lg ring-1 ring-black/5">
              <button
                type="button"
                onClick={() => {
                  setEditingRow(row);
                  setOpenActionId(null);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-xs text-on-background hover:bg-surface-container-low"
              >
                <Edit size={14} className="text-primary" />
                Edit Stock
              </button>
              <button
                type="button"
                onClick={() => handleDelete(row.id)}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-xs text-tertiary hover:bg-tertiary-container/20"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-on-background">
          Current Stock
        </h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Monitor real-time inventory levels across all warehouses.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-3">
        <StatCard
          title="Total Items"
          value={totalItemsCount.toLocaleString()}
          footerText={`${stockList.length} unique SKUs`}
          footerIcon={ArrowUp}
          footerClass="text-secondary"
        />
        <StatCard
          title="Total Stock Value"
          value={`₹${totalStockValue.toLocaleString()}`}
          footerText="Inventory healthy"
          footerIcon={TrendingUp}
          footerClass="text-secondary"
        />
        <StatCard
          title="Low Stock Items"
          value={lowStockCount.toLocaleString()}
          footerText={`${lowStockCount} require reorder`}
          footerIcon={AlertTriangle}
          footerClass="text-tertiary"
        />
      </div>

      <div className="mb-6">
        <FilterBar
          searchPlaceholder="Search by Name, SKU, or Code..."
          categories={categories}
          warehouses={warehouses}
          actionLabel="Add Stock"
          onAction={() => setIsAddModalOpen(true)}
        />
      </div>

      <DataTable columns={columns} rows={stockList} />

      <Pagination totalEntries={stockList.length} />

      <EntryModal
        open={isAddModalOpen || Boolean(editingRow)}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingRow(null);
        }}
        title={editingRow ? `Edit Stock - ${editingRow.name}` : "Add New Stock"}
        submitLabel={editingRow ? "Update Stock" : "Add Stock"}
        fields={addStockFields}
        initialValues={editingRow || {}}
        onSubmit={handleSaveStock}
      />
    </>
  );
};

export default CurrentStock;
