import { useState, useEffect } from "react";
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
      <span className="text-xs text-on-surface-variant">{row.dateTime}</span>
    ),
  },
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
            ? "text-on-secondary-fixed-variant"
            : "text-on-error-container"
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
      <span className="font-semibold text-on-background">
        {row.balanceAfter.toLocaleString()}
      </span>
    ),
  },
  { key: "performedBy", label: "Performed By" },
  { key: "reference", label: "Reference / Batch" },
];

const StockLedger = () => {
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

  const activeDataset = filteredList !== null ? filteredList : stockLedgerItems;
  const stockInTotal = activeDataset.reduce((sum, i) => sum + (i.stockIn || (String(i.transactionType).toLowerCase().includes("in") ? Math.abs(Number(i.quantityChanged || i.quantity || 100)) : 0)), 0);
  const stockOutTotal = activeDataset.reduce((sum, i) => sum + (i.stockOut || (String(i.transactionType).toLowerCase().includes("out") ? Math.abs(Number(i.quantityChanged || i.quantity || 50)) : 0)), 0);

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-on-background">
          Stock Ledger
        </h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Audit trail of all stock transactions across warehouses.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-3">
        <StatCard
          title="Total Transactions"
          value={stockLedgerItems.length.toLocaleString()}
          footerText="Total inventory movements recorded"
          footerIcon={Clock}
        />
        <StatCard
          title="Stock In (Total)"
          value={stockInTotal.toLocaleString()}
          footerText="Total items received across all categories"
          footerIcon={TrendingUp}
          footerClass="text-secondary"
        />
        <StatCard
          title="Stock Out (Total)"
          value={stockOutTotal.toLocaleString()}
          footerText="Total items dispatched or consumed"
          footerIcon={TrendingDown}
          footerClass="text-error"
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

      <Pagination totalEntries={stockLedgerItems.length} />
    </>
  );
};

export default StockLedger;
