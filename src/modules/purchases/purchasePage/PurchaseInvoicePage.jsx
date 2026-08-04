import React, { useState, useCallback, useMemo, useEffect } from "react";
import {
  ChevronDown,
  Plus,
  Trash2,
  Save,
  CheckCircle,
  BadgeCheck,
  ShieldCheck,
  Undo2,
  Receipt,
  CloudUpload,
  Info,
  AlertTriangle,
  Calendar,
  Package,
  FileText,
  X,
  RefreshCw,
  Download,
  Search,
} from "lucide-react";

const initialReceivedItems = [
  { id: 1, name: "Ibuprofen 400mg", ordered: 100, received: 100, batch: "IBU-001", expiry: "2026-10" },
  { id: 2, name: "Vitamin D3 60K UI", ordered: 200, received: 200, batch: "VIT-D-22", expiry: "2025-05" },
];

const poOptions = [
  "PO-2026-0138 (Global Pharma)",
  "PO-2026-0141 (MedLife Solutions)",
  "PO-2026-0142 (BioCare Dist.)",
];

const creditNotes = [
  { number: "CN-2024-001", date: "Oct 20, 2024", amount: 150.0, status: "APPLIED" },
  { number: "CN-2024-045", date: "Oct 25, 2024", amount: 45.5, status: "PENDING" },
];

const returnReasons = ["Damaged Goods", "Expired Near Expiry", "Wrong Item Supplied", "Other"];

const gradientBg = {
  background:
    "linear-gradient(135deg, rgb(37, 99, 235) 0%, rgb(20, 184, 166) 55%, rgb(16, 185, 129) 100%)",
};

function StatCard({ label, value, subtext, icon: Icon, iconColor = "text-[#004ac6]" }) {
  return (
    <div className="bg-white rounded-xs p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] border border-[#E2E8F0] hover:shadow-md transition-shadow relative overflow-hidden flex flex-col">
      <div className="absolute left-0 top-0 bottom-0 w-1" style={gradientBg}></div>
      <div className="flex items-center justify-between mb-2">
        <div className="font-label-md uppercase tracking-wider text-[#64748B]">{label}</div>
        {Icon && <Icon size={18} className={iconColor} />}
      </div>
      <div className="font-headline-lg font-bold text-[#0F172A]">{value}</div>
      {subtext && <div className="mt-2 text-sm text-[#64748B]">{subtext}</div>}
    </div>
  );
}

function Pagination({ page, totalRows, onPageChange }) {
  const totalPages = Math.max(Math.ceil(totalRows / 5), 1);
  const startIdx = (page - 1) * 5;
  const endIdx = Math.min(startIdx + 5, totalRows);
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
          <ChevronDown className="rotate-90" size={18} />
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
          <ChevronDown className="-rotate-90" size={18} />
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

const PurchaseInvoicePage = () => {
  const [activeTab, setActiveTab] = useState("receive-goods");
  const [selectedPO, setSelectedPO] = useState("PO-2026-0141 (MedLife Solutions)");
  const [invoiceNo, setInvoiceNo] = useState("INV-9921-X");
  const [invoiceDate, setInvoiceDate] = useState("2024-10-25");
  const [receivedDate, setReceivedDate] = useState("2024-10-26");
  const [receivedItems, setReceivedItems] = useState(initialReceivedItems);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [currentBatchItemId, setCurrentBatchItemId] = useState(null);
  const [itemBatches, setItemBatches] = useState({});
  const [creditNoteNumber, setCreditNoteNumber] = useState("");
  const [creditNoteAmount, setCreditNoteAmount] = useState("");
  const [returnReason, setReturnReason] = useState("Damaged Goods");
  const [returnDate, setReturnDate] = useState("2024-10-27");
  const [returnQuantities, setReturnQuantities] = useState({});
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const TABS = [
    { key: "receive-goods", label: "Receive Goods", icon: Package },
    { key: "batch-entry", label: "Batch Entry", icon: BadgeCheck },
    { key: "expiry-entry", label: "Expiry Entry", icon: Calendar },
    { key: "purchase-return", label: "Purchase Return", icon: Undo2 },
    { key: "credit-notes", label: "Credit Notes", icon: Receipt },
  ];

  useEffect(() => {
    const initialBatches = {};
    receivedItems.forEach((item) => {
      initialBatches[item.id] = [{ batchNo: item.batch || "", qty: item.received }];
    });
    setItemBatches(initialBatches);
  }, []);

  const totals = useMemo(() => {
    let totalOrdered = 0;
    let totalReceived = 0;
    receivedItems.forEach((item) => {
      totalOrdered += item.ordered;
      totalReceived += item.received;
    });
    return { totalOrdered, totalReceived, variance: totalReceived - totalOrdered };
  }, [receivedItems]);

  const updateItemData = useCallback((id, field, value) => {
    setReceivedItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const updated = { ...item, [field]: field === "received" ? parseInt(value) || 0 : value };
        return updated;
      })
    );
  }, []);

  const getBatchesForItem = useCallback(
    (itemId) => {
      return itemBatches[itemId] || [{ batchNo: "", qty: 0 }];
    },
    [itemBatches]
  );

  const updateBatchValue = useCallback((itemId, idx, field, value) => {
    setItemBatches((prev) => {
      const batches = [...(prev[itemId] || [])];
      if (field === "qty") {
        batches[idx] = { ...batches[idx], qty: parseInt(value) || 0 };
      } else {
        batches[idx] = { ...batches[idx], batchNo: value };
      }
      return { ...prev, [itemId]: batches };
    });
  }, []);

  const addBatchRow = useCallback((itemId) => {
    setItemBatches((prev) => {
      const batches = [...(prev[itemId] || [])];
      batches.push({ batchNo: "", qty: 0 });
      return { ...prev, [itemId]: batches };
    });
  }, []);

  const removeBatchRow = useCallback((itemId, idx) => {
    setItemBatches((prev) => {
      const batches = [...(prev[itemId] || [])];
      batches.splice(idx, 1);
      return { ...prev, [itemId]: batches };
    });
  }, []);

  const calculateBatchTotal = useCallback(
    (itemId) => {
      const batches = itemBatches[itemId] || [];
      return batches.reduce((acc, curr) => acc + curr.qty, 0);
    },
    [itemBatches]
  );

  const calculateShelfLife = useCallback((expiryStr) => {
    if (!expiryStr) return { months: 0, status: "UNKNOWN", badgeClass: "bg-slate-100 text-slate-500" };
    const now = new Date();
    const expiry = new Date(expiryStr + "-01");
    const months = (expiry.getFullYear() - now.getFullYear()) * 12 + (expiry.getMonth() - now.getMonth());
    let status = "OK";
    let badgeClass = "bg-emerald-50 text-emerald-600 border border-emerald-200";
    if (months <= 0) {
      status = "EXPIRED";
      badgeClass = "bg-red-50 text-red-600 border border-red-200";
    } else if (months <= 6) {
      status = "NEAR EXPIRY";
      badgeClass = "bg-orange-50 text-orange-600 border border-orange-200";
    }
    return { months, status, badgeClass };
  }, []);

  const expiryStats = useMemo(() => {
    let total = 0,
      near = 0,
      expired = 0;
    receivedItems.forEach((item) => {
      const batches = itemBatches[item.id] || [{ batchNo: item.batch, qty: item.received }];
      batches.forEach((b) => {
        const life = calculateShelfLife(item.expiry);
        if (life.status === "EXPIRED") expired++;
        else if (life.status === "NEAR EXPIRY") near++;
        total++;
      });
    });
    return { total, near, expired };
  }, [receivedItems, itemBatches, calculateShelfLife]);

  const updateReturnQuantity = useCallback((itemId, value) => {
    const val = parseInt(value) || 0;
    setReturnQuantities((prev) => ({ ...prev, [itemId]: val }));
  }, []);

  const getReturnTotal = useCallback(() => {
    return Object.values(returnQuantities).reduce((acc, curr) => acc + curr, 0);
  }, [returnQuantities]);

  const estimatedCredit = useMemo(() => {
    return getReturnTotal() * 5.25;
  }, [getReturnTotal]);

  const switchTab = useCallback((tab) => {
    setActiveTab(tab);
    setPage(1);
  }, []);

  const handleConfirm = useCallback(() => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setToastType("success");
      setToastMessage(
        activeTab === "receive-goods"
          ? "Receipt confirmed successfully!"
          : activeTab === "batch-entry"
          ? "Batches confirmed successfully!"
          : activeTab === "expiry-entry"
          ? "Invoice finalized successfully!"
          : activeTab === "purchase-return"
          ? "Return request submitted!"
          : "Credit note saved successfully!"
      );
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1500);
  }, [activeTab]);

  const handleSaveDraft = useCallback(() => {
    setToastType("info");
    setToastMessage("Draft saved successfully!");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  }, []);

  const closeToast = useCallback(() => {
    setShowToast(false);
  }, []);

  const renderReceiveGoods = () => {
    const totalRows = receivedItems.length;
    const totalPages = Math.max(Math.ceil(totalRows / 5), 1);
    const safePage = Math.min(Math.max(page, 1), totalPages);
    const pagedItems = receivedItems.slice((safePage - 1) * 5, safePage * 5);

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xs p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] border border-[#E2E8F0]">
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-[#E2E8F0]">
            <h3 className="font-title-lg text-[#0F172A]">Receipt Details</h3>
            <span className="font-label-md text-[#004ac6] bg-[#e6eeff] px-3 py-1 rounded-xs font-bold">GRN-2026-0089</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-[#0F172A]">Select Purchase Order *</label>
              <div className="relative">
                <select
                  value={selectedPO}
                  onChange={(e) => setSelectedPO(e.target.value)}
                  className="w-full bg-white border border-[#E2E8F0] rounded-xs px-3 py-2 text-[#0F172A] appearance-none focus:border-[#13B8A7] focus:ring-1 focus:ring-[#13B8A7] font-body-md shadow-sm outline-none"
                >
                  <option disabled>Choose a PO...</option>
                  {poOptions.map((po) => (
                    <option key={po} value={po}>
                      {po}
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737686] pointer-events-none" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-[#0F172A]">Supplier</label>
              <input
                type="text"
                value="MedLife Solutions"
                readOnly
                className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xs px-3 py-2 text-[#64748B] cursor-not-allowed font-body-md outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-[#0F172A]">PO Date</label>
              <input
                type="text"
                value="2024-10-22"
                readOnly
                className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xs px-3 py-2 text-[#64748B] cursor-not-allowed font-body-md outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-[#0F172A]">Invoice No. *</label>
              <input
                type="text"
                value={invoiceNo}
                onChange={(e) => setInvoiceNo(e.target.value)}
                placeholder="Enter Invoice Number"
                className="w-full bg-white border border-[#E2E8F0] rounded-xs px-3 py-2 text-[#0F172A] focus:border-[#13B8A7] focus:ring-1 focus:ring-[#13B8A7] font-body-md shadow-sm outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-[#0F172A]">Invoice Date *</label>
              <input
                type="date"
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
                className="w-full bg-white border border-[#E2E8F0] rounded-xs px-3 py-2 text-[#0F172A] focus:border-[#13B8A7] focus:ring-1 focus:ring-[#13B8A7] font-body-md shadow-sm outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-[#0F172A]">Goods Received Date *</label>
              <input
                type="date"
                value={receivedDate}
                onChange={(e) => setReceivedDate(e.target.value)}
                className="w-full bg-white border border-[#E2E8F0] rounded-xs px-3 py-2 text-[#0F172A] focus:border-[#13B8A7] focus:ring-1 focus:ring-[#13B8A7] font-body-md shadow-sm outline-none"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xs shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] border border-[#E2E8F0] overflow-hidden flex flex-col">
          <div className="p-4 border-b border-outline-variant/30 flex justify-between items-center bg-[#F8FAFC]">
            <h3 className="font-semibold text-[#0F172A] flex items-center gap-2">
              <Package size={18} className="text-[#004ac6]" />
              Received Items
            </h3>
            <button className="text-[#64748B] font-label-md font-medium flex items-center gap-1 hover:text-[#004ac6] transition-colors border border-[#E2E8F0] px-3 py-1 rounded-xs hover:bg-[#F8FAFC]">
              <Plus size={14} />
              Add Extra Item
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F8FAFC] font-label-md text-[#0F172A] border-b border-outline-variant/20 uppercase tracking-wider text-[11px]">
                  <Th>#</Th>
                  <Th>Item Name</Th>
                  <Th className="text-right">Ordered</Th>
                  <Th className="text-right w-32">Received</Th>
                  <Th className="w-40">Batch No.</Th>
                  <Th className="w-40">Expiry Date</Th>
                  <Th className="text-center">Status</Th>
                </tr>
              </thead>
              <tbody className="font-body-md text-[#475569] divide-y divide-[#E2E8F0]">
                {pagedItems.map((item, idx) => (
                  <tr
                    key={item.id}
                    className={`${idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"} hover:bg-slate-50 transition-colors`}
                  >
                    <Td className="text-[#64748B]">{(safePage - 1) * 5 + idx + 1}</Td>
                    <Td className="font-medium text-[#0F172A]">{item.name}</Td>
                    <Td className="text-right text-[#64748B]">{item.ordered}</Td>
                    <Td>
                      <input
                        type="number"
                        min="0"
                        value={item.received}
                        onChange={(e) => updateItemData(item.id, "received", e.target.value)}
                        className="w-full text-right bg-white border border-[#E2E8F0] rounded-xs p-1.5 focus:border-[#13B8A7] focus:ring-1 focus:ring-[#13B8A7] outline-none shadow-sm"
                      />
                    </Td>
                    <Td>
                      <input
                        type="text"
                        value={item.batch}
                        onChange={(e) => updateItemData(item.id, "batch", e.target.value)}
                        placeholder="Batch No"
                        className="w-full bg-white border border-[#E2E8F0] rounded-xs p-1.5 focus:border-[#13B8A7] focus:ring-1 focus:ring-[#13B8A7] outline-none shadow-sm"
                      />
                    </Td>
                    <Td>
                      <input
                        type="month"
                        value={item.expiry}
                        onChange={(e) => updateItemData(item.id, "expiry", e.target.value)}
                        className="w-full bg-white border border-[#E2E8F0] rounded-xs p-1.5 focus:border-[#13B8A7] focus:ring-1 focus:ring-[#13B8A7] outline-none shadow-sm"
                      />
                    </Td>
                    <Td className="text-center">
                      <span className="inline-flex px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-200">
                        COMPLETE
                      </span>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination page={safePage} totalRows={totalRows} onPageChange={setPage} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xs p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] border border-[#E2E8F0]">
            <h3 className="font-semibold text-[#0F172A] mb-3 flex items-center gap-2">
              <FileText size={18} className="text-[#004ac6]" />
              Delivery Notes
            </h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any remarks regarding damaged goods, delays, etc."
              className="w-full h-24 bg-white border border-[#E2E8F0] rounded-xs p-3 font-body-md focus:border-[#13B8A7] focus:ring-1 focus:ring-[#13B8A7] outline-none resize-none shadow-sm"
            />
          </div>
          <div className="bg-white rounded-xs p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] border border-[#E2E8F0] flex flex-col justify-center relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1" style={gradientBg}></div>
            <h3 className="font-semibold text-[#0F172A] mb-4 pb-2 border-b border-[#E2E8F0]">Summary</h3>
            <div className="flex justify-between items-center mb-3">
              <span className="font-body-md text-[#64748B]">Total Ordered Qty:</span>
              <span className="font-label-md font-bold text-[#0F172A]">{totals.totalOrdered}</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="font-body-md text-[#64748B]">Total Received Qty:</span>
              <span className="font-label-md font-bold text-[#004ac6]">{totals.totalReceived}</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-[#E2E8F0]">
              <span className="font-body-md text-[#64748B] font-medium">Variance:</span>
              <span className={`font-label-md font-bold ${totals.variance === 0 ? "text-emerald-600" : "text-red-600"}`}>
                {totals.variance > 0 ? "+" : ""}{totals.variance}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderBatchEntry = () => {
    const selectedItem = receivedItems.find((item) => item.id === currentBatchItemId);
    const batchTotal = selectedItem ? calculateBatchTotal(selectedItem.id) : 0;
    const batches = selectedItem ? itemBatches[selectedItem.id] || [] : [];

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xs p-6 border border-[#E2E8F0] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
          <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
            <div className="flex-1">
              <label className="block font-label-md text-[#0F172A] mb-1.5">Select Received Item</label>
              <div className="relative">
                <select
                  value={currentBatchItemId || ""}
                  onChange={(e) => setCurrentBatchItemId(parseInt(e.target.value) || null)}
                  className="w-full bg-white border border-[#E2E8F0] rounded-xs px-4 py-2.5 font-body-md focus:ring-2 focus:ring-[#004ac6]/20 focus:border-[#004ac6] outline-none transition-all appearance-none"
                >
                  <option value="">Select an item to enter batches...</option>
                  {receivedItems.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name} ({item.batch || "No Single Batch"})
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737686] pointer-events-none" />
              </div>
            </div>
            <div className="bg-slate-50 px-4 py-2.5 rounded-xs border border-[#E2E8F0] flex flex-col min-w-[140px]">
              <span className="text-[10px] uppercase text-[#64748B] font-bold tracking-wider">Total Received</span>
              <span className="text-xl font-bold text-[#0F172A]">{selectedItem?.received || "-"}</span>
            </div>
          </div>

          {selectedItem && (
            <div>
              <div className="overflow-x-auto mb-4">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="text-left border-b border-[#E2E8F0] font-label-md text-[#64748B] uppercase tracking-wider text-[11px]">
                      <Th className="w-12">#</Th>
                      <Th>Batch Number</Th>
                      <Th className="w-48 text-right">Quantity</Th>
                      <Th className="w-16 text-center">Action</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {batches.map((batch, idx) => (
                      <tr key={idx} className={`${idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"} border-b border-[#E2E8F0] hover:bg-slate-50/50 transition-colors`}>
                        <Td className="text-[#64748B]">{idx + 1}</Td>
                        <Td>
                          <input
                            type="text"
                            value={batch.batchNo}
                            onChange={(e) => updateBatchValue(selectedItem.id, idx, "batchNo", e.target.value)}
                            placeholder="Enter Batch #"
                            className="w-full bg-white border border-[#E2E8F0] rounded-xs px-3 py-2 font-body-md outline-none focus:border-[#13B8A7]"
                          />
                        </Td>
                        <Td>
                          <input
                            type="number"
                            value={batch.qty}
                            onChange={(e) => updateBatchValue(selectedItem.id, idx, "qty", e.target.value)}
                            className="w-full text-right bg-white border border-[#E2E8F0] rounded-xs px-3 py-2 font-body-md outline-none focus:border-[#13B8A7]"
                          />
                        </Td>
                        <Td className="text-center">
                          <button onClick={() => removeBatchRow(selectedItem.id, idx)} className="text-[#94A3B8] hover:text-red-600 transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </Td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-slate-50/50">
                      <td className="py-3 px-4" colSpan="2">
                        <button onClick={() => addBatchRow(selectedItem.id)} className="flex items-center gap-2 text-[#004ac6] font-bold text-label-md hover:underline">
                          <Plus size={16} />
                          Add Batch Row
                        </button>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex flex-col items-end">
                          <span className="text-[10px] text-[#64748B] font-bold uppercase tracking-wider">Total Entered</span>
                          <span className="text-lg font-bold text-[#0F172A]">{batchTotal}</span>
                        </div>
                      </td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div className={`flex items-center gap-3 p-4 rounded-xs border ${
                batchTotal === selectedItem.received
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                  : batchTotal > selectedItem.received
                  ? "bg-red-50 border-red-200 text-red-700"
                  : "bg-blue-50 border-blue-200 text-blue-700"
              }`}>
                {batchTotal === selectedItem.received ? (
                  <CheckCircle size={18} />
                ) : batchTotal > selectedItem.received ? (
                  <AlertTriangle size={18} />
                ) : (
                  <Info size={18} />
                )}
                <span className="font-label-md">
                  {batchTotal === selectedItem.received
                    ? "All quantities accounted for. Batch entry complete."
                    : batchTotal > selectedItem.received
                    ? `Overage: Entered quantity (${batchTotal}) exceeds received quantity (${selectedItem.received}).`
                    : `Pending: ${selectedItem.received - batchTotal} more items to be assigned to batches.`}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderExpiryEntry = () => {
    const hasAlerts = expiryStats.expired > 0 || expiryStats.near > 0;

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard label="Total Batches" value={expiryStats.total} icon={Package} />
          <StatCard label="Near Expiry" value={expiryStats.near} icon={AlertTriangle} iconColor="text-orange-500" subtext="Requires attention" />
          <StatCard label="Expired" value={expiryStats.expired} icon={X} iconColor="text-red-500" subtext="Needs immediate action" />
        </div>

        <div className="bg-white rounded-xs shadow-sm border border-[#E2E8F0] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F8FAFC] font-label-md text-[#0F172A] border-b border-outline-variant/20 uppercase tracking-wider text-[11px]">
                  <Th>Item Name</Th>
                  <Th>Batch No.</Th>
                  <Th className="w-48">Expiry Date</Th>
                  <Th className="w-40">Shelf Life</Th>
                  <Th className="text-center">Status</Th>
                </tr>
              </thead>
              <tbody className="font-body-md text-[#475569] divide-y divide-[#E2E8F0]">
                {receivedItems.map((item) => {
                  const batches = itemBatches[item.id] || [{ batchNo: item.batch, qty: item.received }];
                  return batches.map((batch, idx) => {
                    const life = calculateShelfLife(item.expiry);
                    const rowBg = life.status === "EXPIRED"
                      ? "bg-red-50 hover:bg-red-100/50"
                      : life.status === "NEAR EXPIRY"
                      ? "bg-orange-50 hover:bg-orange-100/50"
                      : "hover:bg-slate-50";
                    return (
                      <tr key={`${item.id}-${idx}`} className={`transition-colors border-b border-[#E2E8F0] ${rowBg}`}>
                        <Td className="font-medium text-[#0F172A]">{item.name}</Td>
                        <Td className="text-[#64748B] font-mono text-[13px]">{batch.batchNo || "-"}</Td>
                        <Td>
                          <input
                            type="month"
                            value={item.expiry}
                            onChange={(e) => updateItemData(item.id, "expiry", e.target.value)}
                            className="bg-transparent border border-[#E2E8F0] rounded p-1 outline-none focus:border-[#13B8A7]"
                          />
                        </Td>
                        <Td>
                          <span className="text-[#64748B] font-medium">{life.months} months</span>
                        </Td>
                        <Td className="text-center">
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${life.badgeClass}`}>
                            {life.status}
                          </span>
                        </Td>
                      </tr>
                    );
                  });
                })}
              </tbody>
            </table>
          </div>
        </div>

        {hasAlerts && (
          <div className="p-4 rounded-xs bg-red-50 border border-red-200 flex items-center gap-3 text-red-700">
            <AlertTriangle size={18} className="flex-shrink-0" />
            <p className="font-body-md font-medium">Some items have expired or are nearing expiry. Please verify before confirming receipt.</p>
          </div>
        )}
      </div>
    );
  };

  const renderPurchaseReturn = () => {
    const totalRows = receivedItems.length;
    const totalPages = Math.max(Math.ceil(totalRows / 5), 1);
    const safePage = Math.min(Math.max(page, 1), totalPages);
    const pagedItems = receivedItems.slice((safePage - 1) * 5, safePage * 5);

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xs p-6 border border-[#E2E8F0] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
          <h3 className="font-semibold text-[#0F172A] mb-4 pb-2 border-b border-[#E2E8F0] flex items-center gap-2">
            <Undo2 size={18} className="text-[#004ac6]" />
            Return Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-[#0F172A]">Reason for Return</label>
              <div className="relative">
                <select
                  value={returnReason}
                  onChange={(e) => setReturnReason(e.target.value)}
                  className="w-full bg-white border border-[#E2E8F0] rounded-xs px-3 py-2 text-[#0F172A] appearance-none focus:border-[#13B8A7] focus:ring-1 focus:ring-[#13B8A7] font-body-md shadow-sm outline-none"
                >
                  {returnReasons.map((reason) => (
                    <option key={reason} value={reason}>
                      {reason}
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737686] pointer-events-none" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-[#0F172A]">Return Date</label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full bg-white border border-[#E2E8F0] rounded-xs px-3 py-2 text-[#0F172A] focus:border-[#13B8A7] focus:ring-1 focus:ring-[#13B8A7] font-body-md shadow-sm outline-none"
              />
            </div>
          </div>

          <h3 className="font-semibold text-[#0F172A] mb-4 pb-2 border-b border-[#E2E8F0]">Items to Return</h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F8FAFC] font-label-md text-[#0F172A] border-b border-outline-variant/20 uppercase tracking-wider text-[11px]">
                  <Th>Item Name</Th>
                  <Th>Batch No.</Th>
                  <Th className="text-right">Received Qty</Th>
                  <Th className="text-right w-32">Return Qty</Th>
                  <Th className="text-center">Status</Th>
                </tr>
              </thead>
              <tbody className="font-body-md text-[#475569] divide-y divide-[#E2E8F0]">
                {pagedItems.map((item, idx) => {
                  const returnQty = returnQuantities[item.id] || 0;
                  const isReturning = returnQty > 0;
                  return (
                    <tr key={item.id} className={`${idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"} hover:bg-slate-50 transition-colors border-b border-[#E2E8F0]`}>
                      <Td className="font-medium text-[#0F172A]">{item.name}</Td>
                      <Td className="text-[#64748B]">{item.batch}</Td>
                      <Td className="text-right text-[#64748B]">{item.received}</Td>
                      <Td>
                        <input
                          type="number"
                          min="0"
                          max={item.received}
                          value={returnQty}
                          onChange={(e) => updateReturnQuantity(item.id, e.target.value)}
                          className="w-full text-right bg-white border border-[#E2E8F0] rounded p-1.5 outline-none focus:border-[#13B8A7]"
                        />
                      </Td>
                      <Td className="text-center">
                        <span className={`inline-flex px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                          isReturning
                            ? "bg-red-50 text-red-600 border border-red-200"
                            : "bg-slate-100 text-[#64748B] border border-[#E2E8F0]"
                        }`}>
                          {isReturning ? "RETURN" : "NO RETURN"}
                        </span>
                      </Td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Pagination page={safePage} totalRows={totalRows} onPageChange={setPage} />
          <div className="bg-slate-50 p-4 rounded-xs border border-[#E2E8F0] flex justify-between items-center">
            <span className="font-body-md text-[#64748B] font-medium">Estimated Credit Amount</span>
            <span className="font-headline-md font-bold text-[#004ac6]">₹{estimatedCredit.toFixed(2)}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderCreditNotes = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xs border border-[#E2E8F0] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
          <h3 className="font-semibold text-[#0F172A] mb-4 pb-2 border-b border-[#E2E8F0] flex items-center gap-2">
            <Receipt size={18} className="text-[#004ac6]" />
            Record New Credit Note
          </h3>
          <div className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-[#0F172A]">Credit Note Number *</label>
              <input
                type="text"
                value={creditNoteNumber}
                onChange={(e) => setCreditNoteNumber(e.target.value)}
                placeholder="Enter CN Number"
                className="w-full bg-white border border-[#E2E8F0] rounded-xs px-3 py-2 font-body-md focus:border-[#13B8A7] outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-[#0F172A]">Amount (₹) *</label>
              <input
                type="number"
                value={creditNoteAmount}
                onChange={(e) => setCreditNoteAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-white border border-[#E2E8F0] rounded-xs px-3 py-2 font-body-md focus:border-[#13B8A7] outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-[#0F172A]">Upload Document</label>
              <div className="border-2 border-dashed border-[#E2E8F0] rounded-xs p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                <CloudUpload size={36} className="text-[#64748B] mx-auto mb-2" />
                <p className="font-body-md text-[#64748B]">Drag &amp; Drop or <span className="text-[#004ac6] font-medium">Browse</span></p>
              </div>
            </div>
            <button className="w-full bg-slate-100 text-[#64748B] font-medium py-2 rounded-xs hover:bg-slate-200 transition-colors font-label-md">
              Add Credit Note
            </button>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xs border border-[#E2E8F0] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
          <h3 className="font-semibold text-[#0F172A] mb-4 pb-2 border-b border-[#E2E8F0]">Credit Note History</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F8FAFC] font-label-md text-[#0F172A] border-b border-outline-variant/20 uppercase tracking-wider text-[11px]">
                  <Th>CN Number</Th>
                  <Th>Date</Th>
                  <Th className="text-right">Amount</Th>
                  <Th className="text-center">Status</Th>
                </tr>
              </thead>
              <tbody className="font-body-md text-[#475569] divide-y divide-[#E2E8F0]">
                {creditNotes.map((cn, idx) => (
                  <tr key={cn.number} className={`${idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"} hover:bg-slate-50 transition-colors`}>
                    <Td className="font-medium text-[#0F172A]">{cn.number}</Td>
                    <Td className="text-[#64748B]">{cn.date}</Td>
                    <Td className="text-right font-medium">₹{cn.amount.toFixed(2)}</Td>
                    <Td className="text-center">
                      <span className={`inline-flex px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                        cn.status === "APPLIED"
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                          : "bg-amber-50 text-amber-600 border border-amber-200"
                      }`}>
                        {cn.status}
                      </span>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const getTabConfig = () => {
    switch (activeTab) {
      case "receive-goods":
        return { title: "Purchase Invoice", icon: CheckCircle, text: "Confirm Receipt" };
      case "batch-entry":
        return { title: "Batch Management", icon: BadgeCheck, text: "Confirm Batches" };
      case "expiry-entry":
        return { title: "Expiry & Shelf Life", icon: ShieldCheck, text: "Finalize Invoice" };
      case "purchase-return":
        return { title: "Purchase Return", icon: Undo2, text: "Submit Return Request" };
      case "credit-notes":
        return { title: "Credit Notes", icon: Receipt, text: "Save Notes" };
      default:
        return { title: "Purchase Invoice", icon: CheckCircle, text: "Confirm" };
    }
  };

  const tabConfig = getTabConfig();
  const TabIcon = tabConfig.icon;

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F8FAFC]">
      {showToast && (
        <div className="fixed top-[80px] right-6 bg-white border border-[#E2E8F0] shadow-lg rounded-lg p-4 flex items-center gap-3 z-50 max-w-sm animate-in slide-in-from-top-2 fade-in duration-300">
          <div className={`p-2 rounded-full flex-shrink-0 ${
            toastType === "success"
              ? "bg-emerald-100 text-emerald-800"
              : toastType === "error"
              ? "bg-red-100 text-red-800"
              : "bg-blue-100 text-blue-800"
          }`}>
            {toastType === "success" ? <CheckCircle size={20} /> : toastType === "error" ? <AlertTriangle size={20} /> : <Info size={20} />}
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#0F172A]">{toastType === "success" ? "Success" : toastType === "error" ? "Error" : "Info"}</h4>
            <p className="text-xs text-[#64748B]">{toastMessage}</p>
          </div>
          <button className="ml-auto text-[#64748B] hover:text-[#0F172A] transition" onClick={closeToast}>
            <X size={18} />
          </button>
        </div>
      )}

      <main className="flex-1 overflow-y-auto p-6 space-y-6 pt-0">
        <div className="bg-white border-b border-[rgba(115,118,134,0.3)] sticky top-0 z-20 mt-4">
          <div className="flex overflow-x-auto no-scrollbar gap-8 py-2 whitespace-nowrap px-6">
            <div className="flex flex-col gap-2">
              <span className="text-[12px] font-bold text-[#004ac6] uppercase tracking-wider opacity-60 px-1">
                Purchase Invoice
              </span>
              <div className="flex gap-4 overflow-y-hidden pb-2">
                {TABS.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.key;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => switchTab(tab.key)}
                      className={`text-[16px] text-[#004ac6] relative px-1 cursor-pointer transition-opacity flex items-center gap-1.5 ${
                        isActive ? "font-bold opacity-100" : "opacity-80 hover:opacity-100"
                      }`}
                    >
                      <Icon size={16} />
                      {tab.label}
                      <div
                        className={`absolute -bottom-[10px] left-0 right-0 h-1 rounded-t-full ${isActive ? "" : "hidden"}`}
                        style={gradientBg}
                      ></div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <h2 className="font-headline-lg-mobile md:hidden text-[#0F172A] mb-4 mt-4 font-bold tracking-tight">
          {tabConfig.title}
        </h2>

        <div className="bg-white rounded-xs p-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] border border-[#E2E8F0] flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 w-full md:w-auto">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full h-9 pl-9 pr-3 rounded-xs border border-slate-300 bg-white text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>

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
              <span>Export</span>
            </button>
          </div>
        </div>

        {activeTab === "receive-goods" && renderReceiveGoods()}
        {activeTab === "batch-entry" && renderBatchEntry()}
        {activeTab === "expiry-entry" && renderExpiryEntry()}
        {activeTab === "purchase-return" && renderPurchaseReturn()}
        {activeTab === "credit-notes" && renderCreditNotes()}
      </main>

      <div className="bg-white border-t border-[#E2E8F0] p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20 flex justify-between items-center fixed bottom-0 left-0 md:left-64 right-0">
        <button className="px-6 py-2 text-[#64748B] font-label-md hover:bg-slate-50 border border-transparent hover:border-[#E2E8F0] rounded-xs transition-all">
          Cancel
        </button>
        <div className="flex gap-3">
          <button
            onClick={handleSaveDraft}
            className="px-6 py-2 border rounded-xs font-label-md transition-colors hover:bg-[rgba(15,82,186,0.05)] hidden sm:flex items-center gap-2"
            style={{ border: "1px solid #0F52BA", color: "#0F52BA" }}
          >
            <Save size={16} />
            Save Draft
          </button>
          <button
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="px-8 py-2 rounded-xs font-label-md shadow-sm flex items-center gap-2 text-white hover:opacity-90 transition-opacity disabled:opacity-70"
            style={gradientBg}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              <>
                <TabIcon size={18} />
                {tabConfig.text}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseInvoicePage;