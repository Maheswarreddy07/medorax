import { Clock, TrendingUp, TrendingDown, Download } from "lucide-react";

import StatCard from "../../components/inventoryManagement/common/StatCard";
import FilterBar from "../../components/inventoryManagement/common/FilterBar";
import DataTable from "../../components/inventoryManagement/common/DataTable";
import Pagination from "../../components/inventoryManagement/common/Pagination";
import StatusBadge from "../../components/inventoryManagement/common/StatusBadge";
import {
  stockLedgerItems,
  categories,
  warehouses,
} from "../../data/inventoryManagement/inventoryData";

const statusVariantMap = {
  "Stock In": "success",
  "Stock Out": "danger",
  Adjustment: "info",
};

const columns = [
  {
    key: "dateTime",
    label: "Date & Time",
    render: (row) => (
      <span className="text-xs text-slate-500">{row.dateTime}</span>
    ),
  },
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
  {
    key: "transactionType",
    label: "Transaction Type",
    render: (row) => (
      <StatusBadge
        status={row.transactionType}
        variant={statusVariantMap[row.transactionType]}
      />
    ),
  },
  {
    key: "quantityChanged",
    label: "Quantity Changed",
    align: "right",
    render: (row) => (
      <span
        className={`font-semibold ${
          row.quantityChanged >= 0
            ? "text-emerald-700"
            : "text-rose-700"
        }`}
      >
        {row.quantityChanged >= 0 ? "+" : ""}
        {row.quantityChanged.toLocaleString()}
      </span>
    ),
  },
  {
    key: "balanceAfter",
    label: "Balance After",
    align: "right",
    render: (row) => (
      <span className="font-semibold text-slate-900">
        {row.balanceAfter.toLocaleString()}
      </span>
    ),
  },
  { key: "performedBy", label: "Performed By" },
  { key: "reference", label: "Reference / Batch" },
];

const StockLedger = () => {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Stock Ledger
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Audit trail of all stock transactions across warehouses.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-3">
        <StatCard
          title="Total Transactions Today"
          value="1,284"
          footerText="Total inventory movements recorded today"
          footerIcon={Clock}
        />
        <StatCard
          title="Stock In (Total)"
          value="8,450"
          footerText="Total items received across all categories"
          footerIcon={TrendingUp}
          footerClass="text-emerald-600"
        />
        <StatCard
          title="Stock Out (Total)"
          value="7,166"
          footerText="Total items dispatched or consumed"
          footerIcon={TrendingDown}
          footerClass="text-rose-600"
        />
      </div>

      <div className="mb-6">
        <FilterBar
          searchPlaceholder="Search by Name, SKU, or Code..."
          categories={categories}
          warehouses={warehouses}
          actionLabel="Export CSV"
          actionIcon={Download}
          onAction={() => {}}
        />
      </div>

      <DataTable columns={columns} rows={stockLedgerItems} />

      <Pagination />
    </>
  );
};

export default StockLedger;
