import { ClipboardCheck, CheckCircle2, AlertTriangle, Plus } from "lucide-react";

import StatCard from "../../components/inventoryManagement/common/StatCard";
import FilterBar from "../../components/inventoryManagement/common/FilterBar";
import DataTable from "../../components/inventoryManagement/common/DataTable";
import Pagination from "../../components/inventoryManagement/common/Pagination";
import StatusBadge from "../../components/inventoryManagement/common/StatusBadge";
import {
  physicalVerificationItems,
  categories,
  warehouses,
} from "../../data/inventoryManagement/inventoryData";

const statusVariantMap = {
  Matched: "success",
  Mismatch: "danger",
  Pending: "warning",
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
  {
    key: "systemQty",
    label: "System Quantity",
    align: "right",
    render: (row) => (
      <span className="font-semibold text-slate-900">
        {row.systemQty.toLocaleString()}
      </span>
    ),
  },
  {
    key: "countedQty",
    label: "Physically Counted",
    align: "right",
    render: (row) => (
      <span className="font-semibold text-slate-900">
        {row.countedQty !== null ? row.countedQty.toLocaleString() : "-"}
      </span>
    ),
  },
  {
    key: "difference",
    label: "Difference",
    align: "right",
    render: (row) =>
      row.difference === null ? (
        <span className="text-slate-400">-</span>
      ) : (
        <span
          className={`font-semibold ${
            row.difference === 0 ? "text-emerald-600" : "text-rose-600"
          }`}
        >
          {row.difference}
        </span>
      ),
  },
  {
    key: "verifiedBy",
    label: "Verified By",
    render: (row) => <span className="text-slate-500">{row.verifiedBy}</span>,
  },
  {
    key: "date",
    label: "Date",
    render: (row) => <span className="text-xs text-slate-500">{row.date}</span>,
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

const PhysicalVerification = () => {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Physical Stock Verification
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Verify physical stock counts against system records.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-3">
        <StatCard
          title="Total Items to Verify"
          value="14,285"
          subtitle="Scheduled for today"
          footerIcon={ClipboardCheck}
          footerText="Verification"
        />
        <StatCard
          title="Items Verified"
          value="12,142"
          subtitle="85% completion rate"
          footerIcon={CheckCircle2}
          footerText="Completed"
          footerClass="text-emerald-600"
        />
        <StatCard
          title="Mismatches Found"
          value="342"
          subtitle="Requires immediate reconciliation"
          footerIcon={AlertTriangle}
          footerText="Warning"
          footerClass="text-rose-600"
        />
      </div>

      <div className="mb-6">
        <FilterBar
          searchPlaceholder="Search by Name, SKU, or Code..."
          categories={categories}
          warehouses={warehouses}
          actionLabel="Start Verification"
          actionIcon={Plus}
          onAction={() => {}}
        />
      </div>

      <DataTable columns={columns} rows={physicalVerificationItems} />

      <Pagination />
    </>
  );
};

export default PhysicalVerification;
