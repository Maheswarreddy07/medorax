import { useState, useEffect } from "react";
import { PackageX, DollarSign, AlertTriangle, Plus } from "lucide-react";

import StatCard from "../../components/inventoryManagement/common/StatCard";
import FilterBar from "../../components/inventoryManagement/common/FilterBar";
import DataTable from "../../components/inventoryManagement/common/DataTable";
import Pagination from "../../components/inventoryManagement/common/Pagination";
import StatusBadge from "../../components/inventoryManagement/common/StatusBadge";
import EntryModal from "../../components/inventoryManagement/common/EntryModal";
import { damagedStockFields } from "../../components/inventoryManagement/common/entryModalConfigs";
import { postInventoryAction, getCurrentUser } from "../../services/inventoryApi";
import { damagedStockItems, categories, warehouses } from "../../data/inventoryManagement/inventoryData";

const statusVariantMap = {
  "Pending Action": "danger",
  "Under Review": "warning",
  "Resolved/Disposed": "success",
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
  {
    key: "damagedQty",
    label: "Damaged Qty",
    align: "right",
    render: (row) => (
      <span className="font-semibold text-on-background">
        {row.damagedQty?.toLocaleString?.() ?? row.damagedQty}
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
  { key: "location", label: "Warehouse / Location" },
  { key: "reason", label: "Reason" },
  {
    key: "reportedBy",
    label: "Reported By",
    render: (row) => (
      <span className="text-on-surface-variant">{row.reportedBy || getCurrentUser()}</span>
    ),
  },
  {
    key: "date",
    label: "Date",
    render: (row) => (
      <span className="text-xs text-on-surface-variant">{row.date}</span>
    ),
  },
  {
    key: "status",
    label: "Status",
    align: "center",
    render: (row) => (
      <StatusBadge status={row.status} variant={statusVariantMap[row.status] || "danger"} />
    ),
  },
];

const DamagedStock = () => {
  const [damagedList, setDamagedList] = useState(damagedStockItems);
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

  const activeDataset = filteredList !== null ? filteredList : damagedList;
  const totalDamagedQty = activeDataset.reduce((acc, i) => acc + (Number(i.damagedQty || i.quantity || 0)), 0);
  const totalDamagedValue = totalDamagedQty * 130;
  const pendingDisposalCount = activeDataset.filter((i) => String(i.status).toLowerCase().includes("pending") || String(i.status).toLowerCase().includes("review")).length;

  const handleSubmit = async (values) => {
    try {
      await postInventoryAction("damaged-stock/", {
        sku: values.sku,
        medicineName: values.medicineName,
        warehouse: values.warehouse,
        quantity: values.quantity,
      });
    } catch {
      // Graceful fallback for mock mode
    }

    const newItem = {
      id: Date.now(),
      name: values.medicineName || values.itemName || "Damaged Item",
      sku: values.sku || `SKU-${Math.floor(Math.random() * 1000)}`,
      damagedQty: Number(values.quantity || 10),
      unit: values.unit || "Boxes (50s)",
      location: values.warehouse || "Main Hub",
      reason: values.reason || "Mishandling",
      reportedBy: getCurrentUser(),
      date: "Today, " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "Pending Action",
    };

    setDamagedList((prev) => [newItem, ...prev]);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-on-background">
          Damaged Stock
        </h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Track and manage damaged stock items for disposal.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-3">
        <StatCard
          title="Total Damaged Items"
          value={totalDamagedQty.toLocaleString()}
          footerText={`${activeDataset.length} damaged records`}
          footerIcon={PackageX}
        />
        <StatCard
          title="Total Damaged Value"
          value={`₹${totalDamagedValue.toLocaleString()}`}
          footerText="Estimated loss"
          footerIcon={DollarSign}
        />
        <StatCard
          title="Pending Disposal"
          value={pendingDisposalCount.toString()}
          footerText="Requires immediate action"
          footerIcon={AlertTriangle}
          footerClass="text-warning"
        />
      </div>

      <div className="mb-6">
        <FilterBar
          searchPlaceholder="Search by Name, SKU, or Code..."
          categories={categories}
          warehouses={warehouses}
          actionLabel="Report Damage"
          actionIcon={Plus}
          onAction={() => setIsModalOpen(true)}
        />
      </div>

      <DataTable columns={columns} defaultRows={damagedList} rows={damagedList} />

      <Pagination totalEntries={damagedList.length} />

      <EntryModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Report Damaged Stock"
        submitLabel="Submit Report"
        fields={damagedStockFields}
        onSubmit={handleSubmit}
        endpoint="damaged-stock/"
      />
    </>
  );
};

export default DamagedStock;
