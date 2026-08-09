import { Package, AlertTriangle, XCircle } from "lucide-react";

import StatCard from "../../components/inventoryManagement/common/StatCard";
import FilterBar from "../../components/inventoryManagement/common/FilterBar";
import DataTable from "../../components/inventoryManagement/common/DataTable";
import Pagination from "../../components/inventoryManagement/common/Pagination";
import StatusBadge from "../../components/inventoryManagement/common/StatusBadge";
import {
  batchItems,
  categories,
  warehouses,
} from "../../data/inventoryManagement/inventoryData";

const statusVariantMap = {
  Active: "success",
  "Near Expiry": "warning",
  Expired: "danger",
};

const columns = [
  {
    key: "batchNumber",
    label: "Batch Number",
    render: (row) => (
      <span className="font-semibold text-[#0F52BA]">{row.batchNumber}</span>
    ),
  },
  { key: "itemName", label: "Item Name" },
  {
    key: "sku",
    label: "SKU / Code",
    render: (row) => <span className="text-xs text-slate-500">{row.sku}</span>,
  },
  {
    key: "mfgDate",
    label: "Mfg Date",
    render: (row) => <span className="text-slate-500">{row.mfgDate}</span>,
  },
  {
    key: "expiryDate",
    label: "Expiry Date",
    render: (row) => (
      <span
        className={
          row.status === "Expired"
            ? "font-semibold text-rose-600"
            : row.status === "Near Expiry"
              ? "font-semibold text-amber-600"
              : "text-slate-500"
        }
      >
        {row.expiryDate}
      </span>
    ),
  },
  {
    key: "quantity",
    label: "Qty",
    align: "right",
    render: (row) => (
      <span className="font-semibold text-slate-900">
        {row.quantity.toLocaleString()}
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
    key: "status",
    label: "Status",
    align: "center",
    render: (row) => (
      <StatusBadge status={row.status} variant={statusVariantMap[row.status]} />
    ),
  },
];

const BatchManagement = () => {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Batch Management
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Track and manage all product batches across facilities.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-3">
        <StatCard
          title="Total Batches"
          value="1,248"
          subtitle="Across 12 facilities"
          footerIcon={Package}
          footerText="Inventory"
        />
        <StatCard
          title="Batches Near Expiry"
          value="42"
          subtitle="Requires attention"
          footerIcon={AlertTriangle}
          footerText="Warning"
          footerClass="text-amber-600"
        />
        <StatCard
          title="Expired Batches"
          value="7"
          subtitle="Pending disposal"
          footerIcon={XCircle}
          footerText="Error"
          footerClass="text-rose-600"
        />
      </div>

      <div className="mb-6">
        <FilterBar
          searchPlaceholder="Search by Batch, Item, or SKU..."
          categories={categories}
          warehouses={warehouses}
          actionLabel="Add Batch"
          onAction={() => {}}
        />
      </div>

      <DataTable columns={columns} rows={batchItems} />

      <Pagination totalEntries={1248} totalPages={250} />
    </>
  );
};

export default BatchManagement;