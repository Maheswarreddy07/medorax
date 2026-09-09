import { useState, useEffect, useCallback } from "react";
import { STAT_LABELS, ROWS_PER_PAGE, customerData } from "../../data/reports/data";
import { StatCard, Pagination, Th, Td } from "./Shared";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

// Stats Component
export function CustomerStats({ stats, customerType = "All Customers", search = "" }) {
  const [liveStats, setLiveStats] = useState(stats || customerData.stats);

  const fetchStats = useCallback(() => {
    const params = new URLSearchParams({
      customerType: customerType || "All Customers",
      ...(search && { search }),
    });
    fetch(`${API_BASE_URL}/api/customers/?${params.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error("Offline");
        return res.json();
      })
      .then((json) => {
        if (json.stats) setLiveStats(json.stats);
      })
      .catch(() => {
        setLiveStats(customerData.stats);
      });
  }, [customerType, search]);

  useEffect(() => {
    if (stats) {
      setLiveStats(stats);
    } else {
      fetchStats();
    }
  }, [stats, fetchStats]);

  const currentStats = liveStats || customerData.stats;
  const [label1, label2, label3] = STAT_LABELS.customer;

  const statItems = [
    {
      value: currentStats?.customers || "1,842",
      icon: "arrow_upward",
      text: "5.4% vs previous period",
      cls: "text-[#006d40]",
    },
    {
      value: currentStats?.revenue || "₹28.6M",
      icon: "trending_up",
      text: "growing",
      cls: "text-[#006d40]",
    },
    {
      value: currentStats?.repeatRate || "64%",
      icon: "info",
      text: "Loyalty metric",
      cls: "text-[#424751]",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        label={label1}
        value={statItems[0].value}
        trendIcon={statItems[0].icon}
        trendText={statItems[0].text}
        trendClass={statItems[0].cls}
      />
      <StatCard
        label={label2}
        value={statItems[1].value}
        trendIcon={statItems[1].icon}
        trendText={statItems[1].text}
        trendClass={statItems[1].cls}
      />
      <StatCard
        label={label3}
        value={statItems[2].value}
        trendIcon={statItems[2].icon}
        trendText={statItems[2].text}
        trendClass={statItems[2].cls}
      />
    </div>
  );
}

// Table Component with default rows parameter & dynamic fallback fetch
export function CustomerTable({ rows, customerType = "All Customers", search = "", page = 1, setPage }) {
  const [liveRows, setLiveRows] = useState(rows || customerData.rows);
  const [loading, setLoading] = useState(false);

  const fetchRows = useCallback(() => {
    const params = new URLSearchParams({
      customerType: customerType || "All Customers",
      ...(search && { search }),
    });
    setLoading(true);
    fetch(`${API_BASE_URL}/api/customers/?${params.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error("Offline");
        return res.json();
      })
      .then((json) => {
        setLiveRows(json.rows || customerData.rows);
        setLoading(false);
      })
      .catch(() => {
        const filtered = (customerData.rows || [])
          .filter((r) => customerType === "All Customers" || r.type === customerType)
          .filter((r) => !search || JSON.stringify(r).toLowerCase().includes(search.toLowerCase()));
        setLiveRows(filtered);
        setLoading(false);
      });
  }, [customerType, search]);

  useEffect(() => {
    if (rows && rows.length > 0) {
      setLiveRows(rows);
    } else {
      fetchRows();
    }
  }, [rows, fetchRows]);

  const displayRows = liveRows;
  const totalRows = displayRows.length;
  const pagedRows = displayRows.slice(
    (page - 1) * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE,
  );

  return (
    <div className="bg-white rounded border border-[#c2c6d3] overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left border-collapse">
          <thead>
            <tr className="bg-[#eff4ff] text-[#121c2a] font-bold">
              <Th>Name</Th>
              <Th>Type</Th>
              <Th>Orders</Th>
              <Th>Spend</Th>
              <Th>Last Purchase</Th>
            </tr>
          </thead>
          <tbody className="text-[14px] text-[#424751]">
            {loading && pagedRows.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-[#424751]">
                  Loading customers...
                </td>
              </tr>
            ) : pagedRows.length > 0 ? (
              pagedRows.map((row, idx) => {
                const bg = idx % 2 === 0 ? "bg-white" : "bg-[#f8f9ff]";
                const typeBadgeClass =
                  row.type === "VIP"
                    ? "bg-[#e8f5e9] text-[#2e7d32] border-[#a5d6a7]"
                    : row.type === "New"
                    ? "bg-[#e3f2fd] text-[#1565c0] border-[#90caf9]"
                    : "bg-[#f5f5f5] text-[#424242] border-[#e0e0e0]";

                return (
                  <tr
                    key={row.id || idx}
                    className={`hover:bg-[#eff4ff] transition-colors border-b border-[#c2c6d3] ${bg}`}
                  >
                    <Td className="text-[#121c2a] font-medium">{row.name}</Td>
                    <Td>
                      <span
                        className={`inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full border ${typeBadgeClass}`}
                      >
                        {row.type}
                      </span>
                    </Td>
                    <Td>{row.orders}</Td>
                    <Td className="font-bold text-[#121c2a]">{row.spend}</Td>
                    <Td>{row.lastPurchase}</Td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="py-8 text-center text-[#424751]">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        page={page}
        totalRows={totalRows}
        onPageChange={setPage}
        rowsPerPage={ROWS_PER_PAGE}
      />
    </div>
  );
}

// Main default export containing interactive triggers
export default function CustomerTab({
  customerType,
  setCustomerType,
  page,
  setPage,
  search,
  setSearch,
}) {
  const [data, setData] = useState({ stats: null, rows: [] });
  const [loading, setLoading] = useState(true);

  const fetchCustomerData = useCallback(() => {
    const params = new URLSearchParams({
      customerType: customerType || "All Customers",
      ...(search && { search }),
    });

    setLoading(true);
    fetch(`${API_BASE_URL}/api/customers/?${params.toString()}`)
      .then((res) => res.json())
      .then((json) => {
        setData({
          stats: json.stats || null,
          rows: json.rows || [],
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching dynamic customer data:", err);
        setLoading(false);
      });
  }, [customerType, search]);

  useEffect(() => {
    fetchCustomerData();
  }, [fetchCustomerData]);

  // Handler for Export CSV Button
  const handleExportCSV = () => {
    if (!data.rows || !data.rows.length) return;
    const headers = ["Name", "Type", "Orders", "Spend", "Last Purchase"];
    const csvRows = [
      headers.join(","),
      ...data.rows.map(
        (r) =>
          `"${r.name}","${r.type}",${r.orders},"${r.spend}","${r.lastPurchase}"`,
      ),
    ];
    const blob = new Blob([csvRows.join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "customer_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading && !data.stats) {
    return (
      <div className="p-6 text-center text-[#424751]">
        Loading dynamic data...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Control Bar containing Search Input, Dropdown Filter, Refresh Button, and CSV Export */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded border border-[#c2c6d3]">
        <div className="flex items-center gap-4 flex-1 min-w-[280px]">
          <input
            type="text"
            placeholder="Search records..."
            value={search || ""}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full px-3 py-2 border border-[#c2c6d3] rounded text-sm outline-none focus:border-blue-500"
          />
          <select
            value={customerType || "All Customers"}
            onChange={(e) => {
              setCustomerType(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 border border-[#c2c6d3] rounded text-sm bg-white outline-none"
          >
            <option value="All Customers">All Customers</option>
            <option value="Regular">Regular</option>
            <option value="VIP">VIP</option>
            <option value="New">New</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          {/* Refresh Button */}
          <button
            onClick={fetchCustomerData}
            title="Refresh Data"
            className="p-2 border border-[#c2c6d3] rounded hover:bg-[#eff4ff] transition-colors text-[#424751]"
          >
            <span className="material-icons text-base">refresh</span>
          </button>

          {/* Export CSV Button */}
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2 bg-[#003366] text-white rounded font-medium text-sm hover:bg-[#002244] transition-colors"
          >
            <span className="material-icons text-base">download</span>
            Export CSV
          </button>
        </div>
      </div>

      <CustomerStats stats={data.stats} customerType={customerType} search={search} />
      <CustomerTable rows={data.rows} customerType={customerType} search={search} page={page} setPage={setPage} />
    </div>
  );
}
