import { useEffect, useState, useRef } from "react";
import {
  getInventoryRows,
  getInventoryUrl,
  normalizeInventoryRow,
  exportRowsToCsv,
} from "../../../services/inventoryApi";

const DataTable = ({ columns, rows, defaultRows, rowKey = "id" }) => {
  const initialData = (rows && rows.length > 0) ? rows : (defaultRows || []);
  const [tableRows, setTableRows] = useState(initialData);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    warehouse: "",
    page: 1,
    limit: 5,
  });
  const [refreshVersion, setRefreshVersion] = useState(0);

  const columnsRef = useRef(columns);
  columnsRef.current = columns;
  const rowsRef = useRef(rows);
  rowsRef.current = rows;
  const defaultRowsRef = useRef(defaultRows);
  defaultRowsRef.current = defaultRows;

  const currentPage = filters.page || 1;
  const limit = filters.limit || 5;
  const startIndex = (currentPage - 1) * limit;
  const displayedRows = tableRows.slice(startIndex, startIndex + limit);

  const filterDataset = (sourceList, currentFilters) => {
    const activeColumns = columnsRef.current || columns;
    const normalizedList = (sourceList || []).map((row) =>
      normalizeInventoryRow(row, activeColumns),
    );
    const search = String(currentFilters.search || "").toLowerCase().trim();
    const category = String(currentFilters.category || "").toLowerCase().trim();
    const warehouse = String(currentFilters.warehouse || "").toLowerCase().trim();

    return normalizedList.filter((row) => {
      const searchable = Object.values(row)
        .map((v) => (v === null || v === undefined ? "" : String(v)))
        .join(" ")
        .toLowerCase();
      const matchesSearch = !search || searchable.includes(search);
      const rowCategory = String(row.category || "").toLowerCase();
      const matchesCategory =
        !category || rowCategory === category || rowCategory.includes(category);
      const rowLoc = String(
        row.location ||
          row.warehouse ||
          row.warehouseLocation ||
          row.warehouse_rack ||
          "",
      ).toLowerCase();
      const matchesWarehouse = !warehouse || rowLoc.includes(warehouse);
      return matchesSearch && matchesCategory && matchesWarehouse;
    });
  };

  const filterKey = `${window.location.pathname}_${filters.search}_${filters.category}_${filters.warehouse}_${filters.page}_${filters.limit}_${refreshVersion}`;

  useEffect(() => {
    let isMounted = true;
    const loadRows = async () => {
      const currentRows = rowsRef.current;
      const currentDefaultRows = defaultRowsRef.current;
      let rawDataset = (currentRows && currentRows.length > 0) ? currentRows : (currentDefaultRows || []);
      try {
        const response = await fetch(getInventoryUrl(filters));
        if (response.ok) {
          const payload = await response.json();
          const fetchedRows = getInventoryRows(payload);
          if (fetchedRows && fetchedRows.length > 0) {
            rawDataset = fetchedRows;
          }
        }
      } catch {
        // Fallback to provided rows or defaultRows if API is unreachable
      }

      if (!isMounted) return;

      const filteredLiveRows = filterDataset(rawDataset, filters);
      setTableRows(filteredLiveRows);

      window.dispatchEvent(
        new CustomEvent("inventory-total-change", {
          detail: filteredLiveRows.length,
        }),
      );
      window.dispatchEvent(
        new CustomEvent("inventory-filtered-data", {
          detail: { rows: filteredLiveRows, total: filteredLiveRows.length },
        }),
      );
    };

    loadRows();
    return () => {
      isMounted = false;
    };
  }, [filterKey, refreshVersion]);

  useEffect(() => {
    if (rows && rows.length > 0) {
      const filteredLiveRows = filterDataset(rows, filters);
      setTableRows(filteredLiveRows);
    }
  }, [rows]);

  useEffect(() => {
    const onFiltersChange = (event) =>
      setFilters((previous) => ({ ...previous, ...event.detail, page: 1 }));
    const onRefresh = () => setRefreshVersion((version) => version + 1);
    const onPageChange = (event) =>
      setFilters((previous) => ({ ...previous, page: event.detail }));
    const onExportCsv = () => {
      const pageTitle = document.title || "inventory";
      const filename = `${pageTitle.toLowerCase().replace(/[^a-z0-9]/g, "_")}_export_${Date.now()}.csv`;
      exportRowsToCsv(tableRows, filename);
    };

    window.addEventListener("inventory-filters-change", onFiltersChange);
    window.addEventListener("inventory-refresh", onRefresh);
    window.addEventListener("inventory-page-change", onPageChange);
    window.addEventListener("inventory-trigger-csv-export", onExportCsv);

    return () => {
      window.removeEventListener("inventory-filters-change", onFiltersChange);
      window.removeEventListener("inventory-refresh", onRefresh);
      window.removeEventListener("inventory-page-change", onPageChange);
      window.removeEventListener("inventory-trigger-csv-export", onExportCsv);
    };
  }, [tableRows]);

  return (
    <div className="overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-lowest shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-surface-container-low">
            <tr className="text-sm text-on-surface-variant">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-4 text-left font-semibold ${
                    column.align === "right"
                      ? "text-right"
                      : column.align === "center"
                        ? "text-center"
                        : ""
                  }`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {displayedRows.map((row, index) => (
              <tr
                key={row[rowKey] ?? index}
                className="transition-colors hover:bg-surface-container-low"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`px-6 py-4 text-sm ${
                      column.align === "right"
                        ? "text-right"
                        : column.align === "center"
                          ? "text-center"
                          : ""
                    }`}
                  >
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
