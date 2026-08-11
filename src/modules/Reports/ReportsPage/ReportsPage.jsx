// reports/ReportsPage.jsx
import React, { useState, useMemo } from "react";
import { Search, Download, RefreshCw } from "lucide-react";
import { TABS, ROWS_PER_PAGE } from "./data";
import { StatCard, Pagination, Th, Td, gradientBg } from "../components/Shared";
import SalesTab from "../components/SalesTab";
import PurchaseTab from "../components/PurchaseTab";
import InventoryTab from "../components/InventoryTab";
import GSTTab from "../components/GSTTab";
import ProfitTab from "../components/ProfitTab";
import CustomerTab from "../components/CustomerTab";
import SupplierTab from "../components/SupplierTab";

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("sales");
  const [period, setPeriod] = useState("Monthly");
  const [branch, setBranch] = useState("All Branches");
  const [status, setStatus] = useState("All Status");
  const [supplier, setSupplier] = useState("All Suppliers");
  const [inventorySubtype, setInventorySubtype] = useState("Stock Movement");
  const [gstFromDate, setGstFromDate] = useState("2023-10-01");
  const [gstToDate, setGstToDate] = useState("2023-10-28");
  const [customerType, setCustomerType] = useState("All Customers");
  const [profitProduct, setProfitProduct] = useState("All Products");
  const [supplierFilter, setSupplierFilter] = useState("All Suppliers");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const changeTab = (tab) => {
    setActiveTab(tab);
    setPage(1);
    if (tab === "purchase") {
      setStatus("All Status");
      setSupplier("All Suppliers");
      setPeriod("Monthly");
    }
    if (tab === "customer") setCustomerType("All Customers");
    if (tab === "inventory") setInventorySubtype("Stock Movement");
    if (tab === "supplier") setSupplierFilter("All Suppliers");
  };

  const renderActiveTab = () => {
    const commonProps = {
      page,
      setPage,
      search,
    };

    switch (activeTab) {
      case "sales":
        return <SalesTab {...commonProps} period={period} branch={branch} setPeriod={setPeriod} setBranch={setBranch} />;
      case "purchase":
        return <PurchaseTab {...commonProps} status={status} supplier={supplier} setStatus={setStatus} setSupplier={setSupplier} />;
      case "inventory":
        return <InventoryTab {...commonProps} inventorySubtype={inventorySubtype} setInventorySubtype={setInventorySubtype} />;
      case "gst":
        return <GSTTab {...commonProps} gstFromDate={gstFromDate} gstToDate={gstToDate} setGstFromDate={setGstFromDate} setGstToDate={setGstToDate} />;
      case "profit":
        return <ProfitTab {...commonProps} period={period} profitProduct={profitProduct} setPeriod={setPeriod} setProfitProduct={setProfitProduct} />;
      case "customer":
        return <CustomerTab {...commonProps} customerType={customerType} setCustomerType={setCustomerType} />;
      case "supplier":
        return <SupplierTab {...commonProps} supplierFilter={supplierFilter} setSupplierFilter={setSupplierFilter} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F8FAFC]">
      <main className="flex-1 overflow-y-auto p-6 space-y-6 pt-0">
        {/* Tab Navigation */}
        <div className="bg-white border-b border-[rgba(115,118,134,0.3)] sticky top-0 z-20 mt-4">
          <div className="flex overflow-x-auto no-scrollbar gap-8 py-2 whitespace-nowrap px-6">
            <div className="flex flex-col gap-2">
              <span className="text-[12px] font-bold text-[#004ac6] uppercase tracking-wider opacity-60 px-1">
                Reports
              </span>
              <div className="flex gap-4 overflow-y-hidden pb-2">
                {TABS.map((t) => (
                  <a
                    key={t.key}
                    onClick={() => changeTab(t.key)}
                    className={`text-[16px] text-[#004ac6] relative px-1 cursor-pointer transition-opacity ${
                      activeTab === t.key ? "font-bold opacity-100" : "opacity-80 hover:opacity-100"
                    }`}
                  >
                    {t.label}
                    <div
                      className={`absolute -bottom-[10px] left-0 right-0 h-1 rounded-t-full ${
                        activeTab === t.key ? "" : "hidden"
                      }`}
                      style={gradientBg}
                    ></div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="md:hidden font-bold text-2xl tracking-tight text-[#0d1c2e] mb-4">Reports</div>

        {/* Global Search and Export Bar */}
        <div className="bg-white rounded-xs p-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] border border-[#E2E8F0] flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 w-full md:w-auto">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search reports..."
              className="w-full h-9 pl-9 pr-3 rounded-xs border border-slate-300 bg-white text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {renderActiveTab()?.props.children}

          <div className="flex items-center gap-3 md:ml-4">
            <button
              onClick={() => setPage(1)}
              className="p-2 border border-[#c3c6d7] rounded-xs hover:bg-[#e6eeff] hover:text-teal-accent transition-colors flex items-center justify-center text-[#434655]"
              title="Refresh"
            >
              <RefreshCw size={18} />
            </button>
            <button
              onClick={() => alert("Export CSV")}
              className="flex items-center gap-2 px-4 py-2 border font-bold transition-colors hover:bg-[rgba(15,82,186,0.05)]"
              style={{ border: "1px solid #0F52BA", color: "#0F52BA" }}
            >
              <Download size={18} />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {renderActiveTab()}
      </main>
    </div>
  );
}