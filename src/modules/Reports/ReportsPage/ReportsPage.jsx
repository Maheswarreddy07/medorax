import React, { useState, useMemo } from "react";
import {
  Search,
  Download,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  ArrowUp,
  MoreVertical,
  Info,
  Users,
  IndianRupee,
  Clock,
  Building,
  Package,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";

const salesData = {
  Daily: {
    stats: { sales: "₹42,134", revenue: "₹620K", transactions: "198", salesTrend: "1.2% vs yesterday", revenueTrend: "steady" },
    rows: [
      { date: "Oct 28, 2023", branch: "Branch 1", sales: "15 Items", trans: "22", rev: "₹4,134.20" },
      { date: "Oct 28, 2023", branch: "Branch 2", sales: "21 Items", trans: "31", rev: "₹8,002.45" },
      { date: "Oct 28, 2023", branch: "Branch 1", sales: "31 Items", trans: "47", rev: "₹11,211.90" },
      { date: "Oct 28, 2023", branch: "Branch 2", sales: "29 Items", trans: "44", rev: "₹11,722.60" },
      { date: "Oct 28, 2023", branch: "Branch 1", sales: "34 Items", trans: "52", rev: "₹5,661.96" },
      { date: "Oct 28, 2023", branch: "Branch 2", sales: "12 Items", trans: "18", rev: "₹2,111.11" },
      { date: "Oct 28, 2023", branch: "Branch 1", sales: "18 Items", trans: "27", rev: "₹3,444.22" },
      { date: "Oct 28, 2023", branch: "Branch 2", sales: "22 Items", trans: "33", rev: "₹6,555.33" },
      { date: "Oct 28, 2023", branch: "Branch 1", sales: "44 Items", trans: "66", rev: "₹15,222.44" },
      { date: "Oct 28, 2023", branch: "Branch 2", sales: "19 Items", trans: "28", rev: "₹4,111.55" },
    ],
  },
  Weekly: {
    stats: { sales: "₹2,10,670", revenue: "₹3.1M", transactions: "987", salesTrend: "5.1% vs last week", revenueTrend: "growing" },
    rows: [
      { date: "Week 43, 2023", branch: "Branch 1", sales: "145 Items", trans: "221", rev: "₹41,342.05" },
      { date: "Week 43, 2023", branch: "Branch 2", sales: "211 Items", trans: "317", rev: "₹80,020.45" },
      { date: "Week 42, 2023", branch: "Branch 1", sales: "313 Items", trans: "470", rev: "₹112,119.07" },
      { date: "Week 42, 2023", branch: "Branch 2", sales: "295 Items", trans: "443", rev: "₹117,225.96" },
      { date: "Week 41, 2023", branch: "Branch 1", sales: "349 Items", trans: "524", rev: "₹56,619.63" },
      { date: "Week 41, 2023", branch: "Branch 2", sales: "120 Items", trans: "180", rev: "₹21,111.10" },
      { date: "Week 40, 2023", branch: "Branch 1", sales: "180 Items", trans: "270", rev: "₹34,442.20" },
      { date: "Week 40, 2023", branch: "Branch 2", sales: "220 Items", trans: "330", rev: "₹65,553.30" },
    ],
  },
  Monthly: {
    stats: { sales: "₹8,42,686", revenue: "₹12.4M", transactions: "3,950", salesTrend: "2.4% vs last month", revenueTrend: "healthy" },
    rows: [
      { date: "Oct 28, 2023", branch: "Branch 1", sales: "295 Items", trans: "442", rev: "₹82,686.41" },
      { date: "Oct 27, 2023", branch: "Branch 2", sales: "423 Items", trans: "634", rev: "₹1,60,040.91" },
      { date: "Oct 26, 2023", branch: "Branch 1", sales: "627 Items", trans: "940", rev: "₹2,24,238.14" },
      { date: "Oct 25, 2023", branch: "Branch 2", sales: "591 Items", trans: "886", rev: "₹2,34,451.92" },
      { date: "Oct 24, 2023", branch: "Branch 1", sales: "699 Items", trans: "1048", rev: "₹1,13,239.26" },
      { date: "Oct 23, 2023", branch: "Branch 2", sales: "312 Items", trans: "468", rev: "₹91,234.56" },
      { date: "Oct 22, 2023", branch: "Branch 1", sales: "455 Items", trans: "682", rev: "₹1,32,456.78" },
      { date: "Oct 21, 2023", branch: "Branch 2", sales: "288 Items", trans: "432", rev: "₹78,901.23" },
      { date: "Oct 20, 2023", branch: "Branch 1", sales: "511 Items", trans: "766", rev: "₹1,45,678.90" },
      { date: "Oct 19, 2023", branch: "Branch 2", sales: "399 Items", trans: "598", rev: "₹1,12,345.67" },
    ],
  },
  Yearly: {
    stats: { sales: "₹10M+", revenue: "₹148M", transactions: "47,400", salesTrend: "12% vs last year", revenueTrend: "excellent" },
    rows: [
      { date: "2023", branch: "Branch 1", sales: "35,400 Items", trans: "53,040", rev: "₹9,922,369.20" },
      { date: "2023", branch: "Branch 2", sales: "50,760 Items", trans: "76,080", rev: "₹19,204,909.20" },
      { date: "2022", branch: "Branch 1", sales: "75,240 Items", trans: "112,800", rev: "₹26,908,576.80" },
      { date: "2022", branch: "Branch 2", sales: "70,920 Items", trans: "106,320", rev: "₹28,134,230.40" },
      { date: "2021", branch: "Branch 1", sales: "83,880 Items", trans: "125,760", rev: "₹13,588,711.20" },
      { date: "2021", branch: "Branch 2", sales: "28,800 Items", trans: "43,200", rev: "₹5,066,664.00" },
      { date: "2020", branch: "Branch 1", sales: "43,200 Items", trans: "64,800", rev: "₹8,266,128.00" },
      { date: "2020", branch: "Branch 2", sales: "52,800 Items", trans: "79,200", rev: "₹15,732,792.00" },
    ],
  },
};

const profitData = {
  Daily: {
    stats: { total: "₹12,450", margin: "24.5%", topProduct: "Paracetamol" },
    rows: [
      { date: "Oct 28, 2023", product: "Paracetamol 500mg", cost: "₹4,200", sale: "₹5,800", margin: "27.5%" },
      { date: "Oct 28, 2023", product: "Amoxicillin 250mg", cost: "₹3,100", sale: "₹4,500", margin: "31.1%" },
      { date: "Oct 28, 2023", product: "Ibuprofen 400mg", cost: "₹2,800", sale: "₹3,600", margin: "22.2%" },
      { date: "Oct 28, 2023", product: "Cetirizine 10mg", cost: "₹1,500", sale: "₹2,200", margin: "31.8%" },
      { date: "Oct 28, 2023", product: "Azithromycin 500mg", cost: "₹4,500", sale: "₹6,100", margin: "26.2%" },
      { date: "Oct 27, 2023", product: "Omeprazole 20mg", cost: "₹2,200", sale: "₹3,100", margin: "29.0%" },
      { date: "Oct 27, 2023", product: "Aspirin 75mg", cost: "₹1,800", sale: "₹2,400", margin: "25.0%" },
    ],
  },
  Weekly: {
    stats: { total: "₹85,200", margin: "25.1%", topProduct: "Amoxicillin" },
    rows: [
      { date: "Week 43", product: "Amoxicillin 250mg", cost: "₹15,500", sale: "₹22,100", margin: "29.8%" },
      { date: "Week 43", product: "Paracetamol 500mg", cost: "₹21,200", sale: "₹28,500", margin: "25.6%" },
      { date: "Week 43", product: "Ibuprofen 400mg", cost: "₹14,800", sale: "₹19,200", margin: "22.9%" },
      { date: "Week 43", product: "Azithromycin 500mg", cost: "₹22,100", sale: "₹30,500", margin: "27.5%" },
      { date: "Week 42", product: "Amoxicillin 250mg", cost: "₹14,900", sale: "₹21,500", margin: "30.6%" },
      { date: "Week 42", product: "Paracetamol 500mg", cost: "₹20,500", sale: "₹27,800", margin: "26.2%" },
    ],
  },
  Monthly: {
    stats: { total: "₹3,45,600", margin: "26.2%", topProduct: "Azithromycin" },
    rows: [
      { date: "Oct 2023", product: "Azithromycin 500mg", cost: "₹85,400", sale: "₹1,18,500", margin: "27.9%" },
      { date: "Oct 2023", product: "Paracetamol 500mg", cost: "₹78,200", sale: "₹1,05,800", margin: "26.0%" },
      { date: "Oct 2023", product: "Amoxicillin 250mg", cost: "₹65,100", sale: "₹92,400", margin: "29.5%" },
      { date: "Oct 2023", product: "Ibuprofen 400mg", cost: "₹55,800", sale: "₹72,600", margin: "23.1%" },
      { date: "Oct 2023", product: "Cetirizine 10mg", cost: "₹32,500", sale: "₹47,200", margin: "31.1%" },
      { date: "Sep 2023", product: "Azithromycin 500mg", cost: "₹82,100", sale: "₹1,14,200", margin: "28.1%" },
      { date: "Sep 2023", product: "Paracetamol 500mg", cost: "₹76,500", sale: "₹1,03,500", margin: "26.0%" },
    ],
  },
  Yearly: {
    stats: { total: "₹42,50,000", margin: "27.8%", topProduct: "Paracetamol" },
    rows: [
      { date: "2023", product: "Paracetamol 500mg", cost: "₹8,54,200", sale: "₹11,85,600", margin: "27.9%" },
      { date: "2023", product: "Azithromycin 500mg", cost: "₹9,25,100", sale: "₹12,95,200", margin: "28.5%" },
      { date: "2023", product: "Amoxicillin 250mg", cost: "₹7,42,800", sale: "₹10,58,400", margin: "29.8%" },
      { date: "2022", product: "Paracetamol 500mg", cost: "₹8,12,500", sale: "₹11,25,400", margin: "27.8%" },
      { date: "2022", product: "Azithromycin 500mg", cost: "₹8,85,200", sale: "₹12,42,100", margin: "28.7%" },
    ],
  },
};

const purchaseData = {
  stats: { total: "₹4,52,300", amount: "₹6.1M", pending: "12" },
  rows: [
    { date: "Oct 28, 2023", supplier: "Global Pharma", items: "150 Boxes", amount: "₹82,686.41", status: "Delivered" },
    { date: "Oct 27, 2023", supplier: "MedLife Solutions", items: "200 Units", amount: "₹1,60,040.91", status: "Pending" },
    { date: "Oct 26, 2023", supplier: "BioCare Dist.", items: "120 Packs", amount: "₹2,24,238.14", status: "Delivered" },
    { date: "Oct 25, 2023", supplier: "HealthLink", items: "85 Boxes", amount: "₹2,34,451.92", status: "Shipped" },
    { date: "Oct 24, 2023", supplier: "Reliant Pharma", items: "300 Units", amount: "₹1,13,239.26", status: "Delivered" },
    { date: "Oct 23, 2023", supplier: "Global Pharma", items: "110 Boxes", amount: "₹65,400.00", status: "Shipped" },
    { date: "Oct 22, 2023", supplier: "MedLife Solutions", items: "250 Units", amount: "₹1,85,200.50", status: "Delivered" },
    { date: "Oct 21, 2023", supplier: "BioCare Dist.", items: "90 Packs", amount: "₹1,45,600.00", status: "Pending" },
    { date: "Oct 20, 2023", supplier: "HealthLink", items: "175 Boxes", amount: "₹3,12,800.75", status: "Delivered" },
    { date: "Oct 19, 2023", supplier: "Reliant Pharma", items: "400 Units", amount: "₹2,05,500.00", status: "Shipped" },
  ],
};

const inventoryData = {
  stats: { total: "45,230", expiring: "128", skus: "3,450" },
  rows: {
    "Stock Movement": [
      { date: "Oct 28, 2023", product: "Paracetamol 500mg", type: "Inward", qty: "+500", branch: "Branch 1" },
      { date: "Oct 28, 2023", product: "Amoxicillin 250mg", type: "Outward", qty: "-120", branch: "Branch 2" },
      { date: "Oct 27, 2023", product: "Ibuprofen 400mg", type: "Inward", qty: "+300", branch: "Branch 1" },
      { date: "Oct 27, 2023", product: "Cetirizine 10mg", type: "Outward", qty: "-85", branch: "Branch 2" },
      { date: "Oct 26, 2023", product: "Azithromycin 500mg", type: "Inward", qty: "+250", branch: "Branch 1" },
      { date: "Oct 26, 2023", product: "Omeprazole 20mg", type: "Outward", qty: "-150", branch: "Branch 1" },
      { date: "Oct 25, 2023", product: "Aspirin 75mg", type: "Inward", qty: "+600", branch: "Branch 2" },
    ],
    "Expiry Reports": [
      { product: "Amoxicillin 250mg", batch: "B-2391", expiry: "Nov 15, 2023", qty: "120", status: "Expiring Soon" },
      { product: "Ibuprofen 400mg", batch: "B-4412", expiry: "Oct 10, 2023", qty: "50", status: "Expired" },
      { product: "Paracetamol 500mg", batch: "B-1102", expiry: "Dec 05, 2024", qty: "500", status: "Active" },
      { product: "Cetirizine 10mg", batch: "B-5531", expiry: "Dec 01, 2023", qty: "85", status: "Expiring Soon" },
      { product: "Azithromycin 500mg", batch: "B-6622", expiry: "Sep 25, 2023", qty: "30", status: "Expired" },
      { product: "Omeprazole 20mg", batch: "B-7744", expiry: "Jan 10, 2025", qty: "250", status: "Active" },
      { product: "Aspirin 75mg", batch: "B-8855", expiry: "Nov 30, 2023", qty: "110", status: "Expiring Soon" },
    ],
  },
};

const gstData = {
  stats: { taxable: "₹4,12,500", collected: "₹74,250", invoices: "145" },
  rows: [
    { invoice: "INV-2023-001", date: "2023-10-28", gstin: "27AADCB2230M1Z2", taxable: "₹12,500", amount: "₹2,250", type: "Sales" },
    { invoice: "INV-2023-002", date: "2023-10-27", gstin: "27BBNML1234K1Z5", taxable: "₹8,200", amount: "₹1,476", type: "Sales" },
    { invoice: "PUR-2023-010", date: "2023-10-26", gstin: "29AADCB2230M1Z2", taxable: "₹45,000", amount: "₹8,100", type: "Purchase" },
    { invoice: "INV-2023-003", date: "2023-10-25", gstin: "27CCDEF5678L1Z9", taxable: "₹15,600", amount: "₹2,808", type: "Sales" },
    { invoice: "INV-2023-004", date: "2023-10-24", gstin: "27DDPQR9012N1Z3", taxable: "₹5,400", amount: "₹972", type: "Sales" },
    { invoice: "PUR-2023-011", date: "2023-10-23", gstin: "24EEFGH3456P1Z7", taxable: "₹28,000", amount: "₹5,040", type: "Purchase" },
    { invoice: "INV-2023-005", date: "2023-10-22", gstin: "27FFIJK7890Q1Z1", taxable: "₹11,200", amount: "₹2,016", type: "Sales" },
    { invoice: "INV-2023-006", date: "2023-10-21", gstin: "27GGLMN1234R1Z4", taxable: "₹9,800", amount: "₹1,764", type: "Sales" },
  ],
};

const customerData = {
  stats: { customers: "1,842", revenue: "₹28.6M", repeatRate: "64%" },
  rows: [
    { name: "Rahul Sharma", orders: "12", spend: "₹14,200", lastPurchase: "Oct 28, 2023", type: "Repeat" },
    { name: "Priya Patel", orders: "1", spend: "₹1,250", lastPurchase: "Oct 27, 2023", type: "One-Time" },
    { name: "Amit Kumar", orders: "8", spend: "₹9,800", lastPurchase: "Oct 25, 2023", type: "Repeat" },
    { name: "Neha Singh", orders: "2", spend: "₹2,400", lastPurchase: "Oct 24, 2023", type: "Repeat" },
    { name: "Vikram Desai", orders: "1", spend: "₹850", lastPurchase: "Oct 22, 2023", type: "One-Time" },
    { name: "Anjali Gupta", orders: "15", spend: "₹21,500", lastPurchase: "Oct 21, 2023", type: "Repeat" },
    { name: "Suresh Reddy", orders: "4", spend: "₹5,600", lastPurchase: "Oct 19, 2023", type: "Repeat" },
    { name: "Pooja Verma", orders: "1", spend: "₹1,100", lastPurchase: "Oct 18, 2023", type: "One-Time" },
    { name: "Ravi Teja", orders: "9", spend: "₹11,200", lastPurchase: "Oct 15, 2023", type: "Repeat" },
    { name: "Meera Nair", orders: "1", spend: "₹950", lastPurchase: "Oct 14, 2023", type: "One-Time" },
  ],
};

const supplierData = {
  stats: {
    totalSuppliers: "48",
    outstanding: "₹12,45,600",
    deliveryRate: "87%",
  },
  rows: [
    { name: "Global Pharma", totalSupplied: "₹18,40,000", lastOrder: "Oct 28, 2023", outstanding: "₹3,45,000" },
    { name: "MedLife Solutions", totalSupplied: "₹9,20,000", lastOrder: "Oct 27, 2023", outstanding: "₹0" },
    { name: "BioCare Dist.", totalSupplied: "₹14,60,000", lastOrder: "Oct 26, 2023", outstanding: "₹1,80,000" },
    { name: "HealthLink", totalSupplied: "₹21,30,000", lastOrder: "Oct 25, 2023", outstanding: "₹0" },
    { name: "Reliant Pharma", totalSupplied: "₹11,75,000", lastOrder: "Oct 24, 2023", outstanding: "₹2,10,000" },
    { name: "Sun Pharma", totalSupplied: "₹8,50,000", lastOrder: "Oct 23, 2023", outstanding: "₹0" },
    { name: "Aurobindo", totalSupplied: "₹16,20,000", lastOrder: "Oct 22, 2023", outstanding: "₹1,20,000" },
    { name: "Cipla Ltd", totalSupplied: "₹22,10,000", lastOrder: "Oct 21, 2023", outstanding: "₹4,50,000" },
    { name: "Dr. Reddy's", totalSupplied: "₹13,80,000", lastOrder: "Oct 20, 2023", outstanding: "₹95,000" },
    { name: "Torrent Pharma", totalSupplied: "₹9,90,000", lastOrder: "Oct 19, 2023", outstanding: "₹0" },
  ],
};

const ROWS_PER_PAGE = 5;

const TABS = [
  { key: "sales", label: "Sales" },
  { key: "purchase", label: "Purchase" },
  { key: "inventory", label: "Inventory" },
  { key: "gst", label: "GST" },
  { key: "profit", label: "Profit" },
  { key: "customer", label: "Customer" },
  { key: "supplier", label: "Supplier" },
];

const STAT_LABELS = {
  sales: ["Total Sales", "Total Revenue", "Total Transactions"],
  purchase: ["Total Purchases", "Total Amount", "Pending Orders"],
  inventory: ["Total Items", "Expiring Items", "Total SKUs"],
  gst: ["Taxable Value", "GST Collected", "Total Invoices"],
  profit: ["Total Profit", "Avg. Margin %", "Best Performing Product"],
  customer: ["Total Customers", "Total Revenue", "Repeat Rate"],
  supplier: ["Total Suppliers", "Total Outstanding", "On-Time Delivery Rate"],
};

const gradientBg = {
  background:
    "linear-gradient(135deg, rgb(37, 99, 235) 0%, rgb(20, 184, 166) 55%, rgb(16, 185, 129) 100%)",
};

function StatCard({ label, value, trendIcon, trendText, trendClass }) {
  return (
    <div className="bg-white rounded-xs p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] border border-[#E2E8F0] hover:shadow-md transition-shadow relative overflow-hidden flex flex-col">
      <div className="absolute left-0 top-0 bottom-0 w-1" style={gradientBg}></div>
      <div className="font-label-md uppercase tracking-wider mb-2 text-[#64748B]">{label}</div>
      <div className="font-headline-lg font-bold text-[#0F172A]">{value}</div>
      <div className={`mt-4 flex items-center gap-1 font-label-md ${trendClass}`}>
        {trendIcon === "arrow_upward" && <ArrowUp size={16} />}
        {trendIcon === "trending_up" && <TrendingUp size={16} />}
        {trendIcon === "info" && <Info size={16} />}
        <span>{trendText}</span>
      </div>
    </div>
  );
}

function Pagination({ page, totalRows, onPageChange }) {
  const totalPages = Math.max(Math.ceil(totalRows / ROWS_PER_PAGE), 1);
  const startIdx = (page - 1) * ROWS_PER_PAGE;
  const endIdx = Math.min(startIdx + ROWS_PER_PAGE, totalRows);
  const startDisplay = totalRows === 0 ? 0 : startIdx + 1;

  const pages = [];
  for (let p = 1; p <= Math.min(totalPages, 3); p++) pages.push(p);

  return (
    <div className="bg-white border-t border-outline-variant/30 p-4 flex items-center justify-between rounded-b-xs">
      <div className="font-label-md text-on-surface-variant">
        Showing <span className="font-bold text-on-surface">{startDisplay}-{endIdx}</span> of{" "}
        <span className="font-bold text-on-surface">{totalRows}</span> entries
      </div>
      <div className="flex items-center gap-2 ml-auto">
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="p-1 rounded border border-outline-variant/50 text-on-surface-variant hover:border-teal-accent hover:text-teal-accent disabled:opacity-50 transition-colors"
        >
          <ChevronLeft size={18} />
        </button>
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className="w-8 h-8 rounded font-label-md font-bold flex items-center justify-center transition-colors"
            style={
              p === page
                ? { backgroundColor: "rgb(0, 60, 144)", color: "white", border: "1px solid transparent" }
                : { backgroundColor: "transparent", border: "1px solid rgba(115,118,134,0.5)", color: "#0d1c2e" }
            }
          >
            {p}
          </button>
        ))}
        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="p-1 rounded border border-outline-variant/50 text-on-surface-variant hover:border-teal-accent hover:text-teal-accent disabled:opacity-50 transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

function Th({ children, className = "" }) {
  return (
    <th className={`py-3 px-4 text-[12px] uppercase tracking-wider font-semibold border-b border-[rgba(195,198,215,0.5)] ${className}`}>
      {children}
    </th>
  );
}

function Td({ children, className = "" }) {
  return <td className={`py-3 px-4 ${className}`}>{children}</td>;
}

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

  const salesRows = useMemo(() => {
    let rows = salesData[period].rows;
    if (branch !== "All Branches") rows = rows.filter((r) => r.branch === branch);
    return rows;
  }, [period, branch]);

  const purchaseRows = useMemo(() => {
    let rows = purchaseData.rows;
    if (status !== "All Status") rows = rows.filter((r) => r.status === status);
    if (supplier !== "All Suppliers") rows = rows.filter((r) => r.supplier === supplier);
    return rows;
  }, [status, supplier]);

  const inventoryRows = useMemo(() => inventoryData.rows[inventorySubtype], [inventorySubtype]);

  const gstRows = useMemo(() => {
    const from = new Date(gstFromDate);
    const to = new Date(gstToDate);
    return gstData.rows.filter((r) => {
      const d = new Date(r.date);
      return d >= from && d <= to;
    });
  }, [gstFromDate, gstToDate]);

  const profitRows = useMemo(() => {
    let rows = profitData[period].rows;
    if (profitProduct !== "All Products") {
      rows = rows.filter((r) => r.product.startsWith(profitProduct));
    }
    return rows;
  }, [period, profitProduct]);

  const customerRows = useMemo(() => {
    let rows = customerData.rows;
    if (customerType !== "All Customers") rows = rows.filter((r) => r.type === customerType);
    return rows;
  }, [customerType]);

  const supplierRows = useMemo(() => {
    let rows = supplierData.rows;
    if (supplierFilter !== "All Suppliers") {
      if (supplierFilter === "Has Outstanding") {
        rows = rows.filter((r) => r.outstanding !== "₹0");
      } else if (supplierFilter === "Fully Paid") {
        rows = rows.filter((r) => r.outstanding === "₹0");
      }
    }
    return rows;
  }, [supplierFilter]);

  const currentRows = {
    sales: salesRows,
    purchase: purchaseRows,
    inventory: inventoryRows,
    gst: gstRows,
    profit: profitRows,
    customer: customerRows,
    supplier: supplierRows,
  }[activeTab];

  const totalRows = currentRows.length;
  const totalPages = Math.max(Math.ceil(totalRows / ROWS_PER_PAGE), 1);
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const pagedRows = currentRows.slice((safePage - 1) * ROWS_PER_PAGE, safePage * ROWS_PER_PAGE);

  const stats = useMemo(() => {
    if (activeTab === "sales") {
      const s = salesData[period].stats;
      return [
        { value: s.sales, icon: "arrow_upward", text: s.salesTrend, cls: "text-emerald-600" },
        { value: s.revenue, icon: "trending_up", text: s.revenueTrend, cls: "text-emerald-600" },
        { value: s.transactions, icon: "info", text: "Aggregated transactions", cls: "text-[#64748B]" },
      ];
    }
    if (activeTab === "purchase") {
      return [
        { value: purchaseData.stats.total, icon: "arrow_upward", text: "3.1% vs last month", cls: "text-emerald-600" },
        { value: purchaseData.stats.amount, icon: "trending_up", text: "on track", cls: "text-emerald-600" },
        { value: purchaseData.stats.pending, icon: "info", text: "Needs follow-up", cls: "text-[#64748B]" },
      ];
    }
    if (activeTab === "inventory") {
      return [
        { value: inventoryData.stats.total, icon: "arrow_upward", text: "1.5% vs last month", cls: "text-emerald-600" },
        { value: inventoryData.stats.expiring, icon: "trending_up", text: "needs attention", cls: "text-amber-600" },
        { value: inventoryData.stats.skus, icon: "info", text: "Active SKUs", cls: "text-[#64748B]" },
      ];
    }
    if (activeTab === "gst") {
      return [
        { value: gstData.stats.taxable, icon: "arrow_upward", text: "4.2% vs last period", cls: "text-emerald-600" },
        { value: gstData.stats.collected, icon: "trending_up", text: "steady", cls: "text-emerald-600" },
        { value: gstData.stats.invoices, icon: "info", text: "Total filed", cls: "text-[#64748B]" },
      ];
    }
    if (activeTab === "profit") {
      const s = profitData[period].stats;
      return [
        { value: s.total, icon: "arrow_upward", text: "2.1% vs previous period", cls: "text-emerald-600" },
        { value: s.margin, icon: "trending_up", text: "improving", cls: "text-emerald-600" },
        { value: s.topProduct, icon: "info", text: "Highest margin contributor", cls: "text-[#64748B]" },
      ];
    }
    if (activeTab === "customer") {
      return [
        { value: customerData.stats.customers, icon: "arrow_upward", text: "5.4% vs previous period", cls: "text-emerald-600" },
        { value: customerData.stats.revenue, icon: "trending_up", text: "growing", cls: "text-emerald-600" },
        { value: customerData.stats.repeatRate, icon: "info", text: "Loyalty metric", cls: "text-[#64748B]" },
      ];
    }
    return [
      { value: supplierData.stats.totalSuppliers, icon: "arrow_upward", text: "Active suppliers", cls: "text-emerald-600" },
      { value: supplierData.stats.outstanding, icon: "trending_up", text: "needs settlement", cls: "text-emerald-600" },
      { value: supplierData.stats.deliveryRate, icon: "info", text: "Delivery performance", cls: "text-[#64748B]" },
    ];
  }, [activeTab, period]);

  const [label1, label2, label3] = STAT_LABELS[activeTab];

  const renderHead = () => {
    if (activeTab === "sales") {
      return (
        <tr className="bg-[#F8FAFC] text-[#0F172A] font-bold">
          <Th>Date</Th><Th>Branch</Th><Th>Total Sales</Th><Th>Transactions</Th><Th>Revenue</Th>
          <Th className="text-center">Actions</Th>
        </tr>
      );
    }
    if (activeTab === "purchase") {
      return (
        <tr className="bg-[#F8FAFC] text-[#0F172A] font-bold">
          <Th>Supplier</Th><Th>Date</Th><Th>Items</Th><Th>Amount</Th><Th>Status</Th>
        </tr>
      );
    }
    if (activeTab === "inventory") {
      return inventorySubtype === "Stock Movement" ? (
        <tr className="bg-[#F8FAFC] text-[#0F172A] font-bold">
          <Th>Date</Th><Th>Product</Th><Th>Movement Type</Th><Th>Quantity</Th><Th>Branch</Th>
        </tr>
      ) : (
        <tr className="bg-[#F8FAFC] text-[#0F172A] font-bold">
          <Th>Product</Th><Th>Batch No.</Th><Th>Expiry Date</Th><Th>Quantity</Th><Th>Status</Th>
        </tr>
      );
    }
    if (activeTab === "gst") {
      return (
        <tr className="bg-[#F8FAFC] text-[#0F172A] font-bold">
          <Th>Invoice No.</Th><Th>Date</Th><Th>GSTIN</Th><Th>Taxable Value</Th><Th>GST Amount</Th><Th>Type</Th>
        </tr>
      );
    }
    if (activeTab === "profit") {
      return (
        <tr className="bg-[#F8FAFC] text-[#0F172A] font-bold">
          <Th>Date</Th><Th>Product</Th><Th>Cost</Th><Th>Sale Price</Th><Th>Margin %</Th>
        </tr>
      );
    }
    if (activeTab === "customer") {
      return (
        <tr className="bg-[#F8FAFC] text-[#0F172A] font-bold">
          <Th>Name</Th><Th>Orders</Th><Th>Spend</Th><Th>Last Purchase</Th>
        </tr>
      );
    }
    return (
      <tr className="bg-[#F8FAFC] text-[#0F172A] font-bold">
        <Th>Supplier Name</Th><Th>Total Supplied</Th><Th>Last Order</Th><Th>Outstanding Amount</Th>
      </tr>
    );
  };

  const renderRow = (row, idx) => {
    const bg = idx % 2 === 0 ? "bg-white" : "bg-slate-50/50";
    const trCls = `hover:bg-slate-50 transition-colors border-b border-outline-variant/20 ${bg}`;

    if (activeTab === "sales") {
      return (
        <tr key={idx} className={trCls}>
          <Td className="text-[#0F172A]">{row.date}</Td>
          <Td>{row.branch}</Td>
          <Td>{row.sales}</Td>
          <Td>{row.trans}</Td>
          <Td className="font-bold text-[#0F172A]">{row.rev}</Td>
          <td className="py-3 px-4 text-center">
            <button className="text-teal-accent hover:text-primary transition-colors p-1">
              <MoreVertical size={18} />
            </button>
          </td>
        </tr>
      );
    }
    if (activeTab === "purchase") {
      return (
        <tr key={idx} className={trCls}>
          <Td>{row.supplier}</Td>
          <Td className="text-[#0F172A]">{row.date}</Td>
          <Td>{row.items}</Td>
          <Td className="font-bold text-[#0F172A]">{row.amount}</Td>
          <Td>{row.status}</Td>
        </tr>
      );
    }
    if (activeTab === "inventory") {
      if (inventorySubtype === "Stock Movement") {
        return (
          <tr key={idx} className={trCls}>
            <Td className="text-[#0F172A]">{row.date}</Td>
            <Td>{row.product}</Td>
            <Td>{row.type}</Td>
            <Td className="font-bold text-[#0F172A]">{row.qty}</Td>
            <Td>{row.branch}</Td>
          </tr>
        );
      }
      let badgeClass = "bg-emerald-100 text-emerald-800";
      if (row.status === "Expiring Soon") badgeClass = "bg-teal-100 text-teal-800";
      if (row.status === "Expired") badgeClass = "bg-red-100 text-red-800";
      return (
        <tr key={idx} className={trCls}>
          <Td className="text-[#0F172A]">{row.product}</Td>
          <Td>{row.batch}</Td>
          <Td>{row.expiry}</Td>
          <Td className="font-bold text-[#0F172A]">{row.qty}</Td>
          <td className="py-3 px-4">
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${badgeClass}`}>{row.status}</span>
          </td>
        </tr>
      );
    }
    if (activeTab === "gst") {
      return (
        <tr key={idx} className={trCls}>
          <Td className="text-[#0F172A]">{row.invoice}</Td>
          <Td>{row.date}</Td>
          <Td>{row.gstin}</Td>
          <Td className="font-bold text-[#0F172A]">{row.taxable}</Td>
          <Td className="font-bold text-teal-600">{row.amount}</Td>
          <Td>{row.type}</Td>
        </tr>
      );
    }
    if (activeTab === "profit") {
      return (
        <tr key={idx} className={trCls}>
          <Td className="text-[#0F172A]">{row.date}</Td>
          <Td>{row.product}</Td>
          <Td>{row.cost}</Td>
          <Td className="font-bold text-[#0F172A]">{row.sale}</Td>
          <Td className="font-bold text-[#10B981]">{row.margin}</Td>
        </tr>
      );
    }
    if (activeTab === "customer") {
      return (
        <tr key={idx} className={trCls}>
          <Td className="text-[#0F172A]">{row.name}</Td>
          <Td>{row.orders}</Td>
          <Td className="font-bold text-[#0F172A]">{row.spend}</Td>
          <Td>{row.lastPurchase}</Td>
        </tr>
      );
    }
    const outstandingColor = row.outstanding === "₹0" ? "text-emerald-600" : "text-red-600";
    return (
      <tr key={idx} className={trCls}>
        <Td className="text-[#0F172A]">{row.name}</Td>
        <Td>{row.totalSupplied}</Td>
        <Td>{row.lastOrder}</Td>
        <Td className={`font-bold ${outstandingColor}`}>{row.outstanding}</Td>
      </tr>
    );
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F8FAFC]">
      <main className="flex-1 overflow-y-auto p-6 space-y-6 pt-0">
        <div className="bg-white border-b border-[rgba(115,118,134,0.3)] sticky top-0 z-20 mt-4">
          <div className="flex overflow-x-auto no-scrollbar gap-8 py-2 whitespace-nowrap px-6">
            <div className="flex flex-col gap-2 ">
              <span className="text-[12px] font-bold text-[#004ac6] uppercase tracking-wider opacity-60 px-1">
                Reports
              </span>
              <div className="flex gap-4 overflow-y-hidden pb-2 ">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard label={label1} value={stats[0].value} trendIcon={stats[0].icon} trendText={stats[0].text} trendClass={stats[0].cls} />
          <StatCard label={label2} value={stats[1].value} trendIcon={stats[1].icon} trendText={stats[1].text} trendClass={stats[1].cls} />
          <StatCard label={label3} value={stats[2].value} trendIcon={stats[2].icon} trendText={stats[2].text} trendClass={stats[2].cls} />
        </div>

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

          {["sales", "purchase", "inventory", "profit"].includes(activeTab) && (
            <div className="w-full  md:w-32">
              <select
                value={period}
                onChange={(e) => {
                  setPeriod(e.target.value);
                  setPage(1);
                }}
                className="px-3 py-2 border border-[#c3c6d7] rounded-xs focus:ring-2 focus:ring-teal-accent focus:border-teal-accent outline-none bg-white w-full text-[#0d1c2e]"
              >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
          )}

          {activeTab === "sales" && (
            <div className="flex w-full md:w-auto gap-2">
              <select
                value={branch}
                onChange={(e) => {
                  setBranch(e.target.value);
                  setPage(1);
                }}
                className="flex-1 px-3 py-2 border border-[#c3c6d7] rounded-xs focus:ring-2 focus:ring-teal-accent focus:border-teal-accent outline-none bg-white md:w-48 text-[#0d1c2e]"
              >
                <option value="All Branches">All Branches</option>
                <option value="Branch 1">Branch 1</option>
                <option value="Branch 2">Branch 2</option>
              </select>
            </div>
          )}

          {activeTab === "profit" && (
            <div className="w-full md:w-auto flex gap-3">
              <select
                value={profitProduct}
                onChange={(e) => {
                  setProfitProduct(e.target.value);
                  setPage(1);
                }}
                className="flex-1 px-3 py-2 border border-[#c3c6d7] rounded-xs focus:ring-2 focus:ring-teal-accent focus:border-teal-accent outline-none bg-white md:w-48 text-[#0d1c2e]"
              >
                <option value="All Products">All Products</option>
                <option value="Paracetamol">Paracetamol</option>
                <option value="Amoxicillin">Amoxicillin</option>
                <option value="Ibuprofen">Ibuprofen</option>
                <option value="Azithromycin">Azithromycin</option>
              </select>
            </div>
          )}

          {activeTab === "inventory" && (
            <div className="w-full md:w-auto gap-3 flex">
              <div className="flex border-b border-[#c3c6d7]">
                <button
                  onClick={() => {
                    setInventorySubtype("Stock Movement");
                    setPage(1);
                  }}
                  className={`px-3 py-2 font-bold border-b-2 ${
                    inventorySubtype === "Stock Movement"
                      ? "text-[#004ac6] border-[#004ac6]"
                      : "text-[#434655] border-transparent font-normal"
                  }`}
                >
                  Stock Movement
                </button>
                <button
                  onClick={() => {
                    setInventorySubtype("Expiry Reports");
                    setPage(1);
                  }}
                  className={`px-3 py-2 font-bold border-b-2 ${
                    inventorySubtype === "Expiry Reports"
                      ? "text-[#004ac6] border-[#004ac6]"
                      : "text-[#434655] border-transparent font-normal"
                  }`}
                >
                  Expiry Reports
                </button>
              </div>
            </div>
          )}

          {activeTab === "gst" && (
            <div className="w-full md:w-auto gap-2 flex items-center">
              <input
                type="date"
                value={gstFromDate}
                onChange={(e) => {
                  setGstFromDate(e.target.value);
                  setPage(1);
                }}
                className="px-3 py-2 border border-[#c3c6d7] rounded-xs focus:ring-2 focus:ring-teal-accent focus:border-teal-accent outline-none bg-white md:w-36 text-[#0d1c2e]"
              />
              <span className="text-[#434655]">to</span>
              <input
                type="date"
                value={gstToDate}
                onChange={(e) => {
                  setGstToDate(e.target.value);
                  setPage(1);
                }}
                className="px-3 py-2 border border-[#c3c6d7] rounded-xs focus:ring-2 focus:ring-teal-accent focus:border-teal-accent outline-none bg-white md:w-36 text-[#0d1c2e]"
              />
            </div>
          )}

          {activeTab === "purchase" && (
            <>
              <div className="flex w-full md:w-auto gap-3">
                <select
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                    setPage(1);
                  }}
                  className="flex-1 px-3 py-2 border border-[#c3c6d7] rounded-xs focus:ring-2 focus:ring-teal-accent focus:border-teal-accent outline-none bg-white md:min-w-[120px] md:w-auto text-[#0d1c2e]"
                >
                  <option value="All Status">All Status</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                </select>
              </div>
              <div className="flex w-full md:w-auto gap-3">
                <select
                  value={supplier}
                  onChange={(e) => {
                    setSupplier(e.target.value);
                    setPage(1);
                  }}
                  className="flex-1 px-3 py-2 border border-[#c3c6d7] rounded-xs focus:ring-2 focus:ring-teal-accent focus:border-teal-accent outline-none bg-white md:min-w-[120px] md:w-auto text-[#0d1c2e]"
                >
                  <option value="All Suppliers">All Suppliers</option>
                  <option value="Global Pharma">Global Pharma</option>
                  <option value="MedLife Solutions">MedLife Solutions</option>
                  <option value="BioCare Dist.">BioCare Dist.</option>
                  <option value="HealthLink">HealthLink</option>
                  <option value="Reliant Pharma">Reliant Pharma</option>
                </select>
              </div>
            </>
          )}

          {activeTab === "customer" && (
            <div className="w-full md:w-auto gap-3 flex">
              <select
                value={customerType}
                onChange={(e) => {
                  setCustomerType(e.target.value);
                  setPage(1);
                }}
                className="flex-1 px-3 py-2 border border-[#c3c6d7] rounded-xs focus:ring-2 focus:ring-teal-accent focus:border-teal-accent outline-none bg-white md:w-48 text-[#0d1c2e]"
              >
                <option value="All Customers">All Customers</option>
                <option value="Repeat">Repeat</option>
                <option value="One-Time">One-Time</option>
              </select>
            </div>
          )}

          {activeTab === "supplier" && (
            <div className="w-full md:w-auto gap-3 flex">
              <select
                value={supplierFilter}
                onChange={(e) => {
                  setSupplierFilter(e.target.value);
                  setPage(1);
                }}
                className="flex-1 px-3 py-2 border border-[#c3c6d7] rounded-xs focus:ring-2 focus:ring-teal-accent focus:border-teal-accent outline-none bg-white md:min-w-[140px] md:w-auto text-[#0d1c2e]"
              >
                <option value="All Suppliers">All Suppliers</option>
                <option value="Has Outstanding">Has Outstanding</option>
                <option value="Fully Paid">Fully Paid</option>
              </select>
            </div>
          )}

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

        <div className="bg-white rounded-xs shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] border border-[#E2E8F0] overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left border-collapse">
              <thead>{renderHead()}</thead>
              <tbody className="text-[14px] text-[#475569]">
                {pagedRows.length > 0 ? (
                  pagedRows.map((row, idx) => renderRow(row, idx))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-[#64748B]">
                      No records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <Pagination page={safePage} totalRows={totalRows} onPageChange={setPage} />
        </div>
      </main>
    </div>
  );
}