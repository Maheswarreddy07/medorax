import { useState } from "react";
import { ArrowUp, TrendingUp, Info } from "lucide-react";

import StatCard from "../../components/inventoryManagement/common/StatCard";
import FilterBar from "../../components/inventoryManagement/common/FilterBar";
import DataTable from "../../components/inventoryManagement/common/DataTable";
import Pagination from "../../components/inventoryManagement/common/Pagination";
import StatusBadge from "../../components/inventoryManagement/common/StatusBadge";
import StockTabs from "../../components/inventoryManagement/common/StockTabs";
import EntryModal from "../../components/inventoryManagement/common/EntryModal";
import { availableStockFields } from "../../components/inventoryManagement/common/entryModalConfigs";
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
      <span className="font-medium text-slate-900">{row.name}</span>
    ),
  },
  {
    key: "sku",
    label: "SKU / Item Code",
    render: (row) => (
      <span className="text-xs text-slate-500">{row.sku}</span>
    ),
  },
  { key: "category", label: "Category" },
  {
    key: "totalQty",
    label: "Total Stock Quantity",
    align: "right",
    render: (row) => (
      <span className="font-semibold text-slate-900">
        {row.totalQty.toLocaleString()}
      </span>
    ),
  },
  {
    key: "reservedQty",
    label: "Reserved Quantity",
    align: "right",
    render: (row) => (
      <span className="text-slate-600">{row.reservedQty.toLocaleString()}</span>
    ),
  },
  {
    key: "availableQty",
    label: "Available Quantity",
    align: "right",
    render: (row) => (
      <span className="font-semibold text-slate-900">
        {row.availableQty.toLocaleString()}
      </span>
    ),
  },
  {
    key: "unit",
    label: "Unit",
    render: (row) => <span className="text-slate-500">{row.unit}</span>,
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

const AvailableStock = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Available Stock
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          View stock that is currently available for use or sale.
        </p>
      </div>

      <StockTabs />

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-3">
        <StatCard
          title="Total Available Items"
          value="14,285"
          footerText="2.4% vs last month"
          footerIcon={ArrowUp}
          footerClass="text-emerald-600"
        />
        <StatCard
          title="Total Available Stock Value"
          value="$2.4M"
          footerText="Inventory healthy"
          footerIcon={TrendingUp}
          footerClass="text-emerald-600"
        />
        <StatCard
          title="Reserved vs Available Ratio"
          value="Oct 31, 2023"
          footerText="No action required"
          footerIcon={Info}
          footerClass="text-emerald-600"
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

      <DataTable columns={columns} rows={availableStockItems} />

      <Pagination />

      <EntryModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Available Stock"
        submitLabel="Add Stock"
        fields={availableStockFields}
        onSubmit={() => {}}
      />
    </>
  );
};

export default AvailableStock;