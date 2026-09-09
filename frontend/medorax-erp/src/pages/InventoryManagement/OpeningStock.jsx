import { useState, useEffect } from "react";
import { ArrowUp, TrendingUp, Info } from "lucide-react";

import StatCard from "../../components/inventoryManagement/common/StatCard";
import FilterBar from "../../components/inventoryManagement/common/FilterBar";
import DataTable from "../../components/inventoryManagement/common/DataTable";
import Pagination from "../../components/inventoryManagement/common/Pagination";
import EntryModal from "../../components/inventoryManagement/common/EntryModal";
import { openingStockFields } from "../../components/inventoryManagement/common/entryModalConfigs";
import { postInventory } from "../../services/inventoryApi";
import {
  openingStockItems,
  categories,
  warehouses,
} from "../../data/inventoryManagement/inventoryData";

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
    key: "openingQty",
    label: "Opening Qty",
    align: "right",
    render: (row) => (
      <span className="font-semibold text-on-background">
        {row.openingQty.toLocaleString()}
      </span>
    ),
  },
  {
    key: "unit",
    label: "Unit",
    render: (row) => <span className="text-on-surface-variant">{row.unit}</span>,
  },
  { key: "location", label: "Location" },
  {
    key: "remarks",
    label: "Remarks / Notes",
    align: "center",
    render: (row) => (
      <span className="text-xs text-on-surface-variant">{row.remarks}</span>
    ),
  },
  {
    key: "periodStartDate",
    label: "Period Start Date",
    render: (row) => <span className="text-xs text-on-surface-variant">{row.periodStartDate}</span>,
  },
];

const OpeningStock = () => {
  const [stockList, setStockList] = useState(openingStockItems);
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

  const handleAddOpeningStock = async (values) => {
    try {
      await postInventory(values);
    } catch {
      // Graceful fallback
    }

    const newItem = {
      id: Date.now(),
      name: values.name || values.itemName || "New Opening Item",
      sku: values.sku || `SKU-${Math.floor(Math.random() * 1000)}`,
      category: values.category || "General",
      openingQty: Number(values.openingQty || values.quantity || 100),
      unit: values.unit || "Boxes",
      location: values.location || values.warehouse || "Main Hub",
      remarks: values.remarks || "Initial stock entry",
      periodStartDate: new Date().toLocaleDateString(),
    };

    setStockList((prev) => [newItem, ...prev]);
    setIsModalOpen(false);
  };

  const activeDataset = filteredList !== null ? filteredList : stockList;
  const totalOpeningQty = activeDataset.reduce((acc, item) => acc + (Number(item.openingQty || item.opening_qty || item.quantity || 0)), 0);
  const totalOpeningValue = totalOpeningQty * 160;

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-on-background">
          Opening Stock
        </h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Review stock quantities at the start of the reporting period.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-3">
        <StatCard
          title="Total Opening Items"
          value={totalOpeningQty.toLocaleString()}
          footerText={`${stockList.length} categories`}
          footerIcon={ArrowUp}
          footerClass="text-secondary"
        />
        <StatCard
          title="Total Opening Stock Value"
          value={`₹${totalOpeningValue.toLocaleString()}`}
          footerText="Inventory healthy"
          footerIcon={TrendingUp}
          footerClass="text-secondary"
        />
        <StatCard
          title="Period Start Date"
          value={new Date(new Date().getFullYear(), new Date().getMonth(), 1).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}
          footerText="Opening balance period"
          footerIcon={Info}
          footerClass="text-secondary"
        />
      </div>

      <div className="mb-6">
        <FilterBar
          searchPlaceholder="Search by Name, SKU, or Code..."
          categories={categories}
          warehouses={warehouses}
          actionLabel="Add Opening Stock"
          onAction={() => setIsModalOpen(true)}
        />
      </div>

      <DataTable columns={columns} defaultRows={stockList} rows={stockList} />

      <Pagination totalEntries={stockList.length} />

      <EntryModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Opening Stock"
        submitLabel="Add Opening Stock"
        fields={openingStockFields}
        onSubmit={handleAddOpeningStock}
      />
    </>
  );
};

export default OpeningStock;
