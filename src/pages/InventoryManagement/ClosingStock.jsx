import { TrendingUp, CheckCircle2, Info } from "lucide-react";

import StatCard from "../../components/inventoryManagement/common/StatCard";
import FilterBar from "../../components/inventoryManagement/common/FilterBar";
import DataTable from "../../components/inventoryManagement/common/DataTable";
import Pagination from "../../components/inventoryManagement/common/Pagination";
import StockTabs from "../../components/inventoryManagement/common/StockTabs";
import {
  closingStockItems,
  categories,
  warehouses,
} from "../../data/inventoryManagement/inventoryData";

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
    label: "SKU / Code",
    render: (row) => (
      <span className="text-xs text-slate-500">{row.sku}</span>
    ),
  },
  { key: "category", label: "Category" },
  {
    key: "closingQty",
    label: "Closing Stock Quantity",
    align: "right",
    render: (row) => (
      <span className="font-semibold text-slate-900">
        {row.closingQty.toLocaleString()}
      </span>
    ),
  },
  {
    key: "unit",
    label: "Unit",
    render: (row) => <span className="text-slate-500">{row.unit}</span>,
  },
  { key: "location", label: "Location" },
  {
    key: "remarks",
    label: "Remarks / Notes",
    align: "center",
    render: (row) => (
      <span className="text-xs text-slate-500">{row.remarks}</span>
    ),
  },
  {
    key: "periodEndDate",
    label: "Period End Date",
    render: (row) => <span className="text-xs text-slate-500">{row.periodEndDate}</span>,
  },
];

const ClosingStock = () => {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Closing Stock
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Review stock quantities at the end of the reporting period.
        </p>
      </div>

      <StockTabs />

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-3">
        <StatCard
          title="Total Closing Items"
          value="14,285"
          footerText="2.4% vs last month"
          footerIcon={TrendingUp}
          footerClass="text-emerald-600"
        />
        <StatCard
          title="Total Closing Stock Value"
          value="$2.4M"
          footerText="Inventory healthy"
          footerIcon={CheckCircle2}
          footerClass="text-emerald-600"
        />
        <StatCard
          title="Period End Date"
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
          actionLabel="Add Closing Stock"
          onAction={() => {}}
        />
      </div>

      <DataTable columns={columns} rows={closingStockItems} />

      <Pagination />
    </>
  );
};

export default ClosingStock;