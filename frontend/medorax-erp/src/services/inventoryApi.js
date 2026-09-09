export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"
).replace(/\/$/, "");

const endpointByPath = {
  "/inventory": "available-stock/",
  "/inventory/opening": "opening-stock/",
  "/inventory/closing": "closing-stock/",
  "/inventory/available": "available-stock/",
  "/inventory/reserved": "reserved-stock/",
  "/inventory/batches": "batches/",
  "/inventory/adjustments": "ledger/",
  "/inventory/transfers": "transfers/",
  "/inventory/verification": "verify-stock/",
  "/inventory/damaged": "damaged-stock/",
  "/inventory/expired": "expired-stock/",
  "/inventory/near-expiry": "reports/expiry/",
  "/inventory/low-stock": "alerts/low-stock/",
  "/inventory/overstock": "alerts/overstock/",
  "/inventory/stock-ledger": "ledger/",
};

export const getInventoryEndpoint = () =>
  endpointByPath[window.location.pathname] || "available-stock/";

export const getInventoryUrl = (params = {}) => {
  const query = new URLSearchParams(params);
  const endpoint = getInventoryEndpoint();
  return `${API_BASE_URL}/inventory/${endpoint}${query.toString() ? `?${query}` : ""}`;
};

export const getInventoryRows = (payload) => {
  if (Array.isArray(payload)) return payload;
  return Array.isArray(payload?.items) ? payload.items : [];
};

export const normalizeInventoryRow = (row, columns) => {
  const aliases = {
    name: ["name", "medicine_name", "item_name"],
    sku: ["sku", "sku_code"],
    category: ["category"],
    totalQty: ["totalQty", "total_stock", "current_quantity"],
    reservedQty: ["reservedQty", "reserved_stock", "reserved_qty"],
    availableQty: ["availableQty", "available_stock"],
    quantity: [
      "quantity",
      "current_total_qty",
      "current_quantity",
      "total_stock",
      "available_stock",
    ],
    openingQty: ["openingQty", "opening_qty", "opening_stock"],
    closingQty: ["closingQty", "closing_qty", "closing_stock"],
    damagedQty: ["damagedQty", "damaged_qty"],
    expiredQty: ["expiredQty", "expired_qty"],
    reorderThreshold: [
      "reorderThreshold",
      "min_threshold",
      "minimum_stock_level",
    ],
    shortageAmount: [
      "shortageAmount",
      "shortage",
      "excess_quantity",
      "shortfall",
    ],
    currentQty: [
      "currentQty",
      "current_total_qty",
      "current_quantity",
      "current_stock",
    ],
    currentStock: [
      "currentStock",
      "current_stock",
      "current_quantity",
      "current_total_qty",
    ],
    transferQty: ["transferQty", "quantity", "transfer_quantity"],
    fromWarehouse: ["fromWarehouse", "from_warehouse", "source_branch"],
    toWarehouse: ["toWarehouse", "to_warehouse", "destination_branch"],
    transferredBy: ["transferredBy", "transferred_by"],
    systemQty: [
      "systemQty",
      "systemQuantity",
      "current_stock",
      "current_quantity",
    ],
    countedQty: ["countedQty", "physicalQuantity", "physical_count", "actual_stock"],
    difference: ["difference", "variance"],
    adjQty: ["adjQty", "quantity", "quantity_changed"],
    adjustedBy: ["adjustedBy", "performed_by", "performedBy"],
    date: ["date", "created_at", "timestamp", "transfer_date", "verfication_date"],
    timeRemaining: ["timeRemaining", "time_remaining", "days_remaining"],
    excessQty: ["excessQty", "excess_quantity"],
    dateTime: ["dateTime", "created_at", "timestamp"],
    transactionType: ["transactionType", "transaction_type", "movement_type"],
    quantityChanged: ["quantityChanged", "quantity", "quantity_changed"],
    balanceAfter: ["balanceAfter", "balance_after", "new_stock"],
    performedBy: ["performedBy", "performed_by"],
    reference: ["reference", "reference_id", "batch_number"],
    unit: ["unit"],
    status: ["status"],
    reservedFor: ["reservedFor", "reserved_for"],
    reservationDate: ["reservationDate", "reservation_date"],
    reportedBy: ["reportedBy", "reported_by"],
    batchNumber: ["batchNumber", "batch_number"],
    mfgDate: ["mfgDate", "manufacturing_date", "mfg_date"],
    expiryDate: ["expiryDate", "expiry_date"],
    periodStartDate: ["periodStartDate", "period_start_date"],
    periodEndDate: ["periodEndDate", "period_end_date"],
    remarks: ["remarks", "remarks_notes", "notes"],
    itemName: ["itemName", "item_name", "medicine_name"],
    skuCode: ["skuCode", "sku_code", "sku"],
    currentQuantity: ["currentQuantity", "current_quantity"],
    idealMaxThreshold: ["idealMaxThreshold", "ideal_max_threshold"],
    excessQuantity: ["excessQuantity", "excess_quantity"],
    warehouseLocation: ["warehouseLocation", "warehouse_location", "warehouse"],
    location: [
      "location",
      "warehouse_rack",
      "warehouse_location",
      "warehouse",
      "rack_location",
    ],
    lastUpdated: ["lastUpdated", "last_updated", "updated_at", "created_at"],
    reason: ["reason", "notes", "description"],
  };
  const normalized = { ...row };
  columns.forEach(({ key }) => {
    const source = (aliases[key] || [key]).find(
      (candidate) => row[candidate] !== undefined,
    );
    if (source) normalized[key] = row[source];
  });
  if (normalized.location === undefined && (row.warehouse || row.rack_number))
    normalized.location = `${row.warehouse || ""}${row.rack_number ? ` / ${row.rack_number}` : ""}`;
  if (normalized.status)
    normalized.status = String(normalized.status)
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  if (normalized.status === "Out Of Stock") normalized.status = "Out of Stock";
  if (normalized.status === "Available") normalized.status = "In Stock";
  if (normalized.status === "AVAILABLE") normalized.status = "In Stock";
  if (normalized.status === "OUT OF STOCK") normalized.status = "Out of Stock";
  if (normalized.status === "Severe Surplus")
    normalized.status = "Severely Overstocked";
  if (normalized.timeRemaining === undefined && normalized.expiryDate) {
    const days = Math.ceil(
      (new Date(normalized.expiryDate) - new Date()) / 86400000,
    );
    normalized.timeRemaining =
      days < 0 ? "Expired" : `${days} day${days === 1 ? "" : "s"} remaining`;
  }
  if (!normalized.status && normalized.timeRemaining) {
    const days = Number(row.days_remaining);
    normalized.status = Number.isFinite(days)
      ? days < 0
        ? "Expired"
        : days <= 30
          ? "Urgent/Under 1 month"
          : "Near Expiry/1-3 months"
      : String(normalized.timeRemaining).toLowerCase() === "expired"
        ? "Expired"
        : "Near Expiry/1-3 months";
  }
  [
    "totalQty",
    "reservedQty",
    "availableQty",
    "quantity",
    "openingQty",
    "closingQty",
    "damagedQty",
    "expiredQty",
    "reorderThreshold",
    "shortageAmount",
    "currentQuantity",
    "idealMaxThreshold",
    "excessQuantity",
  ].forEach((key) => {
    if (normalized[key] !== undefined)
      normalized[key] = Number(normalized[key]) || 0;
  });
  columns.forEach(({ key }) => {
    if (
      /qty|quantity|amount|threshold|balance|changed/i.test(key) &&
      normalized[key] === undefined &&
      key !== "countedQty" &&
      key !== "difference"
    )
      normalized[key] = 0;
  });
  columns.forEach(({ key }) => {
    if (
      normalized[key] === undefined ||
      normalized[key] === null ||
      normalized[key] === ""
    ) {
      if (key === "countedQty" || key === "difference") {
        normalized[key] = row[key] !== undefined ? row[key] : null;
      } else {
        normalized[key] = key === "lastUpdated" ? "Not recorded" : "-";
      }
    }
  });
  return normalized;
};

const extractRawText = (val) => {
  if (val === null || val === undefined) return "";
  if (typeof val === "string" || typeof val === "number" || typeof val === "boolean") {
    return String(val);
  }
  if (typeof val === "object") {
    if (val.props && val.props.children) {
      if (Array.isArray(val.props.children)) {
        return val.props.children.map(extractRawText).join(" ");
      }
      return extractRawText(val.props.children);
    }
    return "";
  }
  return String(val);
};

export const exportRowsToCsv = (rows, filename = "inventory_export.csv") => {
  if (!rows || rows.length === 0) return;
  const keySet = new Set();
  rows.forEach((row) => {
    Object.keys(row).forEach((k) => {
      if (
        k !== "id" &&
        k !== "medicine_id" &&
        k !== "_id" &&
        k !== "key" &&
        typeof row[k] !== "function"
      ) {
        keySet.add(k);
      }
    });
  });

  const keys = Array.from(keySet);
  if (keys.length === 0) return;

  const headerLine = keys
    .map((k) => `"${k.replace(/([A-Z])/g, " $1").replaceAll("_", " ").trim().toUpperCase()}"`)
    .join(",");

  const rowLines = rows.map((row) =>
    keys
      .map((k) => {
        const text = extractRawText(row[k]);
        return `"${text.replace(/"/g, '""')}"`;
      })
      .join(",")
  );

  const csvString = [headerLine, ...rowLines].join("\r\n");
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const downloadInventoryCsv = (params) => {
  window.dispatchEvent(
    new CustomEvent("inventory-trigger-csv-export", { detail: params }),
  );
};

export const postInventory = async (values) => {
  const payload = {
    ...values,
    quantity: values.quantity ?? values.totalQty,
    opening_qty: values.opening_qty ?? values.openingQty,
    closing_qty: values.closing_qty ?? values.closingQty,
    reserved_qty: values.reserved_qty ?? values.reservedQty,
    damaged_qty: values.damaged_qty ?? values.damagedQty,
    expired_qty: values.expired_qty ?? values.expiredQty,
    warehouse: values.warehouse ?? values.location,
  };
  const response = await fetch(
    `${API_BASE_URL}/inventory/${getInventoryEndpoint()}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );
  if (!response.ok)
    throw new Error(
      (await response.json()).error || "Inventory request failed",
    );
  return response.json();
};

export const getCurrentUser = () => {
  try {
    const userStr =
      localStorage.getItem("user") ||
      localStorage.getItem("currentUser") ||
      localStorage.getItem("auth_user");
    if (userStr) {
      const u = JSON.parse(userStr);
      return (
        u.name ||
        u.full_name ||
        u.username ||
        u.email ||
        "Store Operator"
      );
    }
  } catch {
    // ignore parse error
  }
  return "Store Operator";
};

export const postInventoryAction = async (endpoint, payload = {}) => {
  const currentUser = getCurrentUser();
  const enrichedPayload = {
    transferredBy: currentUser,
    verifiedBy: currentUser,
    reportedBy: currentUser,
    performedBy: currentUser,
    user: currentUser,
    ...payload,
  };
  const response = await fetch(`${API_BASE_URL}/inventory/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(enrichedPayload),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "Inventory action failed");
  return result;
};
