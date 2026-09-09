import { useEffect, useState } from "react";
import {
  ClipboardCheck,
  CheckCircle2,
  AlertTriangle,
  Plus,
} from "lucide-react";

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
import {
  getInventoryUrl,
  postInventoryAction,
  getCurrentUser,
} from "../../services/inventoryApi";

const statusVariantMap = {
  Matched: "success",
  Mismatch: "danger",
  Pending: "warning",
  AVAILABLE: "success",
  OUT_OF_STOCK: "danger",
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
    key: "systemQty",
    label: "System Quantity",
    align: "right",
    render: (row) => (
      <span className="font-semibold text-on-background">
        {row.systemQty?.toLocaleString() || "0"}
      </span>
    ),
  },
  {
    key: "countedQty",
    label: "Physically Counted",
    align: "right",
    render: (row) => (
      <span className="font-semibold text-on-background">
        {row.countedQty !== null && row.countedQty !== undefined
          ? row.countedQty.toLocaleString()
          : "-"}
      </span>
    ),
  },
  {
    key: "difference",
    label: "Difference",
    align: "right",
    render: (row) =>
      row.difference === null || row.difference === undefined ? (
        <span className="text-outline">-</span>
      ) : (
        <span
          className={`font-semibold ${
            row.difference === 0
              ? "text-secondary text-green-600"
              : "text-error text-red-600"
          }`}
        >
          {row.difference}
        </span>
      ),
  },
  {
    key: "verifiedBy",
    label: "Verified By",
    render: (row) => (
      <span className="text-on-surface-variant">{row.verifiedBy}</span>
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
      <StatusBadge
        status={row.status}
        variant={statusVariantMap[row.status] || "warning"}
      />
    ),
  },
];

const PhysicalVerification = () => {
  const [rows, setRows] = useState(physicalVerificationItems);
  const [summary, setSummary] = useState({
    totalItems: physicalVerificationItems.length,
    verified: physicalVerificationItems.filter((r) => r.status === "Matched").length,
    mismatches: physicalVerificationItems.filter((r) => r.status === "Mismatch").length,
  });
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ sku: "", countedQty: "" });

  // ─── CENTRAL REUSABLE FETCH FUNCTION ───
  const loadTableData = () => {
    fetch(getInventoryUrl())
      .then((response) => {
        if (!response.ok) throw new Error("Backend offline");
        return response.json();
      })
      .then((payload) => {
        // Handle varying Django serialization layout distributions safely
        const activeItems = Array.isArray(payload)
          ? payload
          : payload.items || payload.data || [];

        if (activeItems.length === 0) return;

        const mappedRows = activeItems.map((item) => {
          const sys =
            item.system_quantity ?? item.systemQty ?? item.total_stock ?? 0;
          const cnt = item.counted_quantity ?? item.countedQty ?? null;

          // Fallback calculation logic for auditing changes
          let diff = item.difference;
          if ((diff === null || diff === undefined) && cnt !== null) {
            diff = cnt - sys;
          }

          return {
            id: item.id,
            name: item.name || item.medicine_name || "Generic Medicine",
            sku: item.sku || "N/A",
            systemQty: sys,
            countedQty: cnt,
            difference: diff,
            verifiedBy: item.verified_by || item.verifiedBy || getCurrentUser(),
            date: item.date || new Date().toLocaleDateString(),
            status:
              item.status ||
              (cnt !== null
                ? diff === 0
                  ? "Matched"
                  : "Mismatch"
                : "Pending"),
          };
        });

        setRows(mappedRows);

        // Map values directly to metrics analytics cards at the top
        setSummary(
          payload.summary || {
            totalItems: mappedRows.length,
            verified: mappedRows.filter(
              (r) => r.status === "Matched" || r.status === "AVAILABLE",
            ).length,
            mismatches: mappedRows.filter(
              (r) => r.status === "Mismatch" || r.status === "OUT_OF_STOCK",
            ).length,
          },
        );
      })
      .catch(() => {
        // Keep fallback items in mock/disconnected mode
      });
  };

  useEffect(() => {
    loadTableData();
  }, []);

  // ─── ACTION POST WORKER FOR COUNT LOGGING ───
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await postInventoryAction("verify-stock/", {
        sku: formData.sku,
        quantity: parseInt(formData.countedQty, 10),
        physicalCount: parseInt(formData.countedQty, 10),
      });
    } catch (err) {
      console.error("Error pushing verification transaction logs:", err);
    }

    const countedVal = parseInt(formData.countedQty, 10) || 0;
    const currentUser = getCurrentUser();
    const currentDate = "Today, " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setRows((prevRows) => {
      const existingIndex = prevRows.findIndex(
        (r) => String(r.sku).toLowerCase() === String(formData.sku).toLowerCase()
      );

      let updatedRows = [...prevRows];
      if (existingIndex >= 0) {
        const item = updatedRows[existingIndex];
        const sysQty = Number(item.systemQty || 0);
        const diff = countedVal - sysQty;
        updatedRows[existingIndex] = {
          ...item,
          countedQty: countedVal,
          difference: diff,
          verifiedBy: currentUser,
          date: currentDate,
          status: diff === 0 ? "Matched" : "Mismatch",
        };
      } else {
        const sysQty = 100;
        const diff = countedVal - sysQty;
        updatedRows.unshift({
          id: Date.now(),
          name: formData.sku.toUpperCase() + " Medicine",
          sku: formData.sku,
          systemQty: sysQty,
          countedQty: countedVal,
          difference: diff,
          verifiedBy: currentUser,
          date: currentDate,
          status: diff === 0 ? "Matched" : "Mismatch",
        });
      }

      setSummary({
        totalItems: updatedRows.length,
        verified: updatedRows.filter((r) => r.status === "Matched" || r.status === "AVAILABLE").length,
        mismatches: updatedRows.filter((r) => r.status === "Mismatch" || r.status === "OUT_OF_STOCK").length,
      });

      return updatedRows;
    });

    // Close overlay and wipe fields clean
    setShowForm(false);
    setFormData({ sku: "", countedQty: "" });
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-on-background">
          Physical Stock Verification
        </h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Verify physical stock counts against system records.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-3">
        <StatCard
          title="Total Items to Verify"
          value={summary.totalItems.toLocaleString()}
          subtitle="Scheduled for today"
          footerIcon={ClipboardCheck}
          footerText="Verification"
        />
        <StatCard
          title="Items Verified"
          value={summary.verified.toLocaleString()}
          subtitle={`${summary.totalItems ? Math.round((summary.verified / summary.totalItems) * 100) : 0}% completion rate`}
          footerIcon={CheckCircle2}
          footerText="Completed"
          footerClass="text-secondary"
        />
        <StatCard
          title="Mismatches Found"
          value={summary.mismatches.toLocaleString()}
          subtitle="Requires immediate reconciliation"
          footerIcon={AlertTriangle}
          footerText="Warning"
          footerClass="text-error"
        />
      </div>

      <div className="mb-6">
        <FilterBar
          searchPlaceholder="Search by Name, SKU, or Code..."
          categories={categories}
          warehouses={warehouses}
          actionLabel="Start Verification"
          actionIcon={Plus}
          onAction={() => setShowForm(true)}
        />
      </div>

      <DataTable columns={columns} defaultRows={rows} rows={rows} />

      <Pagination />

      {/* ─── MODAL DIALOG POPUP FORM INTERFACE OVERLAY ─── */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 bg-white shadow-2xl rounded-2xl border border-gray-100 animate-fade-in">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <ClipboardCheck className="text-blue-600" />
              Stock Auditing Form
            </h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Medicine SKU / Item Code
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Asp-500"
                  value={formData.sku}
                  onChange={(e) =>
                    setFormData({ ...formData, sku: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 border-gray-300 text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Physically Counted Quantity
                </label>
                <input
                  type="number"
                  required
                  placeholder="Enter numerical stock value"
                  value={formData.countedQty}
                  onChange={(e) =>
                    setFormData({ ...formData, countedQty: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 border-gray-300 text-gray-900"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition"
                >
                  Submit Counts
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PhysicalVerification;
