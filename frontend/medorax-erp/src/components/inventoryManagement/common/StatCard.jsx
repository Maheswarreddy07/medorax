import { useEffect, useState } from "react";
import {
  getInventoryRows,
  getInventoryUrl,
} from "../../../services/inventoryApi";

const numberFrom = (row, keys) => {
  const key = keys.find(
    (candidate) => row[candidate] !== undefined && row[candidate] !== null,
  );
  return key ? Number(row[key]) || 0 : 0;
};

const formatNumber = (value) => Number(value || 0).toLocaleString();

const getStockPercentage = (rows) => {
  const total = rows.reduce(
    (sum, row) =>
      sum +
      numberFrom(row, [
        "total_stock",
        "current_stock",
        "current_quantity",
        "quantity",
      ]),
    0,
  );
  const available = rows.reduce(
    (sum, row) =>
      sum +
      numberFrom(row, ["available_stock", "available_quantity", "quantity"]),
    0,
  );
  return total ? Math.round((available / total) * 100) : 0;
};

const calculateCardValue = (title, rows, payload) => {
  const normalizedTitle = title.toLowerCase();
  const summary = payload?.summary || {};
  const quantities = rows.map((row) =>
    numberFrom(row, [
      "quantity",
      "current_stock",
      "current_quantity",
      "current_total_qty",
      "total_stock",
      "available_stock",
      "batch_quantity",
    ]),
  );
  const totalQuantity = quantities.reduce(
    (total, quantity) => total + quantity,
    0,
  );
  const totalValue = rows.reduce(
    (total, row, index) =>
      total + numberFrom(row, ["total_value", "value", "stock_value"]) ||
      quantities[index],
    0,
  );
  const countBy = (predicate) => rows.filter(predicate).length;

  if (normalizedTitle.includes("mismatch"))
    return formatNumber(
      summary.mismatches ?? countBy((row) => row.difference ?? row.variance),
    );
  if (normalizedTitle.includes("verified"))
    return formatNumber(
      summary.verified ??
        countBy(
          (row) => row.countedQty !== null && row.countedQty !== undefined,
        ),
    );
  if (normalizedTitle.includes("completion"))
    return formatNumber(summary.verified || 0);
  if (
    normalizedTitle.includes("batches near expiry") ||
    normalizedTitle.includes("items near expiry")
  )
    return formatNumber(rows.length);
  if (
    normalizedTitle.includes("expired batches") ||
    normalizedTitle.includes("expired items")
  )
    return formatNumber(
      countBy((row) =>
        String(row.status || "")
          .toLowerCase()
          .includes("expired"),
      ),
    );
  if (
    normalizedTitle.includes("low stock") ||
    normalizedTitle.includes("critical items") ||
    normalizedTitle.includes("pending reorder")
  )
    return formatNumber(rows.length);
  if (
    normalizedTitle.includes("total batches") ||
    normalizedTitle.includes("total transactions") ||
    normalizedTitle.includes("total transfers")
  )
    return formatNumber(rows.length);
  if (normalizedTitle.includes("reserved"))
    return formatNumber(
      rows.reduce(
        (total, row) =>
          total +
          numberFrom(row, ["reserved_stock", "reserved_qty", "reservedQty"]),
        0,
      ),
    );
  if (normalizedTitle.includes("available"))
    return formatNumber(
      rows.reduce(
        (total, row) =>
          total +
          numberFrom(row, [
            "available_stock",
            "available_qty",
            "availableQty",
            "quantity",
          ]),
        0,
      ),
    );
  if (
    normalizedTitle.includes("stock value") ||
    normalizedTitle.includes("value at risk") ||
    normalizedTitle.includes("excess stock value") ||
    normalizedTitle.includes("damaged value")
  )
    return `$${formatNumber(totalValue)}`;
  if (
    normalizedTitle.includes("quantity adjusted") ||
    normalizedTitle.includes("quantity transferred")
  )
    return formatNumber(totalQuantity);
  if (normalizedTitle.includes("stock in"))
    return formatNumber(
      rows.reduce(
        (total, row) =>
          total +
          Math.max(numberFrom(row, ["quantity", "quantity_changed"]), 0),
        0,
      ),
    );
  if (normalizedTitle.includes("stock out"))
    return formatNumber(
      rows.reduce(
        (total, row) =>
          total +
          Math.abs(
            Math.min(numberFrom(row, ["quantity", "quantity_changed"]), 0),
          ),
        0,
      ),
    );
  return formatNumber(summary.totalItems ?? (rows.length || totalQuantity));
};

// Shared KPI stat card used across all inventory pages
const StatCard = ({
  title,
  value,
  subtitle,
  footerIcon,
  footerText,
  footerClass = "text-on-surface-variant",
}) => {
  const [displayValue, setDisplayValue] = useState(value !== undefined && value !== null ? value : "0");
  const [dynamicFooter, setDynamicFooter] = useState(footerText);

  useEffect(() => {
    if (value !== undefined && value !== null) {
      setDisplayValue(value);
    }
  }, [value]);

  useEffect(() => {
    setDynamicFooter(footerText);
  }, [footerText]);

  useEffect(() => {
    const handleFilteredData = (e) => {
      if (value !== undefined && value !== null) return; // Parent handles calculation via value prop
      if (e.detail && Array.isArray(e.detail.rows)) {
        const rows = e.detail.rows;
        setDisplayValue(calculateCardValue(title, rows, e.detail));
        if (typeof footerText === "string" && footerText.includes("%")) {
          setDynamicFooter(`${getStockPercentage(rows)}% of current stock available`);
        }
      }
    };

    window.addEventListener("inventory-filtered-data", handleFilteredData);
    return () => window.removeEventListener("inventory-filtered-data", handleFilteredData);
  }, [title, value, footerText]);

  const FooterIcon = footerIcon;
  return (
    <div className="relative overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="absolute inset-y-0 left-0 w-1 bg-primary" />
      <p className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
        {title}
      </p>
      <h3 className="mt-2 text-[28px] font-bold leading-9 text-on-background">
        {displayValue}
      </h3>
      {(dynamicFooter || FooterIcon) && (
        <div
          className={`mt-4 flex items-center gap-1.5 text-xs font-medium ${footerClass}`}
        >
          {FooterIcon && <FooterIcon size={14} strokeWidth={2.5} />}
          <span>{dynamicFooter}</span>
        </div>
      )}
      {subtitle && <p className="mt-4 text-xs text-outline">{subtitle}</p>}
    </div>
  );
};

export default StatCard;
