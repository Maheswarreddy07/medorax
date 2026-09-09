// reports/mockData.js
const _now = new Date();
const getFormattedDate = (daysAgo = 0) => {
  const d = new Date(_now);
  d.setDate(d.getDate() - daysAgo);
  return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
};
const getISODate = (daysAgo = 0) => {
  const d = new Date(_now);
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().slice(0, 10);
};
const getWeekDate = (weeksAgo = 0) => {
  const d = new Date(_now);
  d.setDate(d.getDate() - weeksAgo * 7);
  const startOfYear = new Date(d.getFullYear(), 0, 1);
  const weekNum = Math.ceil((((d - startOfYear) / 86400000) + startOfYear.getDay() + 1) / 7);
  return 'Week ' + weekNum + ', ' + d.getFullYear();
};
const getMonthYearDate = (monthsAgo = 0) => {
  const d = new Date(_now);
  d.setMonth(d.getMonth() - monthsAgo);
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};
const getYearStr = (yearsAgo = 0) => {
  return String(_now.getFullYear() - yearsAgo);
};

export const salesData = {
  Daily: {
    stats: { sales: "₹42,134", revenue: "₹620K", transactions: "198", salesTrend: "1.2% vs yesterday", revenueTrend: "steady" },
    rows: [
      { date: getFormattedDate(0), branch: "Branch 1", sales: "15 Items", trans: "22", rev: "₹4,134.20" },
      { date: getFormattedDate(0), branch: "Branch 2", sales: "21 Items", trans: "31", rev: "₹8,002.45" },
      { date: getFormattedDate(0), branch: "Branch 1", sales: "31 Items", trans: "47", rev: "₹11,211.90" },
      { date: getFormattedDate(0), branch: "Branch 2", sales: "29 Items", trans: "44", rev: "₹11,722.60" },
      { date: getFormattedDate(0), branch: "Branch 1", sales: "34 Items", trans: "52", rev: "₹5,661.96" },
      { date: getFormattedDate(0), branch: "Branch 2", sales: "12 Items", trans: "18", rev: "₹2,111.11" },
      { date: getFormattedDate(1), branch: "Branch 1", sales: "18 Items", trans: "27", rev: "₹3,444.22" },
      { date: getFormattedDate(1), branch: "Branch 2", sales: "22 Items", trans: "33", rev: "₹6,555.33" },
      { date: getFormattedDate(1), branch: "Branch 1", sales: "44 Items", trans: "66", rev: "₹15,222.44" },
      { date: getFormattedDate(1), branch: "Branch 2", sales: "19 Items", trans: "28", rev: "₹4,111.55" },
      { date: getFormattedDate(2), branch: "Branch 1", sales: "25 Items", trans: "38", rev: "₹7,891.23" },
      { date: getFormattedDate(2), branch: "Branch 2", sales: "33 Items", trans: "50", rev: "₹12,345.67" },
      { date: getFormattedDate(2), branch: "Branch 1", sales: "16 Items", trans: "24", rev: "₹3,789.45" },
      { date: getFormattedDate(2), branch: "Branch 2", sales: "41 Items", trans: "62", rev: "₹18,901.88" },
      { date: getFormattedDate(3), branch: "Branch 1", sales: "28 Items", trans: "42", rev: "₹9,876.54" },
      { date: getFormattedDate(3), branch: "Branch 2", sales: "37 Items", trans: "56", rev: "₹14,321.98" },
      { date: getFormattedDate(3), branch: "Branch 1", sales: "14 Items", trans: "21", rev: "₹2,456.78" },
      { date: getFormattedDate(3), branch: "Branch 2", sales: "23 Items", trans: "35", rev: "₹7,654.32" },
      { date: getFormattedDate(4), branch: "Branch 1", sales: "39 Items", trans: "59", rev: "₹16,543.21" },
      { date: getFormattedDate(4), branch: "Branch 2", sales: "26 Items", trans: "39", rev: "₹8,765.43" },
    ],
  },
  Weekly: {
    stats: { sales: "₹2,10,670", revenue: "₹3.1M", transactions: "987", salesTrend: "5.1% vs last week", revenueTrend: "growing" },
    rows: [
      { date: getWeekDate(0), branch: "Branch 1", sales: "145 Items", trans: "221", rev: "₹41,342.05" },
      { date: getWeekDate(0), branch: "Branch 2", sales: "211 Items", trans: "317", rev: "₹80,020.45" },
      { date: getWeekDate(1), branch: "Branch 1", sales: "313 Items", trans: "470", rev: "₹112,119.07" },
      { date: getWeekDate(1), branch: "Branch 2", sales: "295 Items", trans: "443", rev: "₹117,225.96" },
      { date: getWeekDate(2), branch: "Branch 1", sales: "349 Items", trans: "524", rev: "₹56,619.63" },
      { date: getWeekDate(2), branch: "Branch 2", sales: "120 Items", trans: "180", rev: "₹21,111.10" },
      { date: getWeekDate(3), branch: "Branch 1", sales: "180 Items", trans: "270", rev: "₹34,442.20" },
      { date: getWeekDate(3), branch: "Branch 2", sales: "220 Items", trans: "330", rev: "₹65,553.30" },
      { date: getWeekDate(4), branch: "Branch 1", sales: "198 Items", trans: "297", rev: "₹45,678.90" },
      { date: getWeekDate(4), branch: "Branch 2", sales: "165 Items", trans: "248", rev: "₹32,109.87" },
      { date: getWeekDate(5), branch: "Branch 1", sales: "267 Items", trans: "401", rev: "₹78,901.23" },
      { date: getWeekDate(5), branch: "Branch 2", sales: "189 Items", trans: "284", rev: "₹54,321.98" },
    ],
  },
  Monthly: {
    stats: { sales: "₹8,42,686", revenue: "₹12.4M", transactions: "3,950", salesTrend: "2.4% vs last month", revenueTrend: "healthy" },
    rows: [
      { date: getFormattedDate(0), branch: "Branch 1", sales: "295 Items", trans: "442", rev: "₹82,686.41" },
      { date: getFormattedDate(1), branch: "Branch 2", sales: "423 Items", trans: "634", rev: "₹1,60,040.91" },
      { date: getFormattedDate(2), branch: "Branch 1", sales: "627 Items", trans: "940", rev: "₹2,24,238.14" },
      { date: getFormattedDate(3), branch: "Branch 2", sales: "591 Items", trans: "886", rev: "₹2,34,451.92" },
      { date: getFormattedDate(4), branch: "Branch 1", sales: "699 Items", trans: "1048", rev: "₹1,13,239.26" },
      { date: getFormattedDate(5), branch: "Branch 2", sales: "312 Items", trans: "468", rev: "₹91,234.56" },
      { date: getFormattedDate(6), branch: "Branch 1", sales: "455 Items", trans: "682", rev: "₹1,32,456.78" },
      { date: getFormattedDate(7), branch: "Branch 2", sales: "288 Items", trans: "432", rev: "₹78,901.23" },
      { date: getFormattedDate(8), branch: "Branch 1", sales: "511 Items", trans: "766", rev: "₹1,45,678.90" },
      { date: getFormattedDate(9), branch: "Branch 2", sales: "399 Items", trans: "598", rev: "₹1,12,345.67" },
      { date: getFormattedDate(10), branch: "Branch 1", sales: "234 Items", trans: "351", rev: "₹67,890.12" },
      { date: getFormattedDate(11), branch: "Branch 2", sales: "456 Items", trans: "684", rev: "₹1,98,765.43" },
      { date: getFormattedDate(12), branch: "Branch 1", sales: "378 Items", trans: "567", rev: "₹1,23,456.78" },
      { date: getFormattedDate(13), branch: "Branch 2", sales: "543 Items", trans: "814", rev: "₹2,34,567.89" },
    ],
  },
  Yearly: {
    stats: { sales: "₹10M+", revenue: "₹148M", transactions: "47,400", salesTrend: "12% vs last year", revenueTrend: "excellent" },
    rows: [
      { date: getYearStr(0), branch: "Branch 1", sales: "35,400 Items", trans: "53,040", rev: "₹9,922,369.20" },
      { date: getYearStr(0), branch: "Branch 2", sales: "50,760 Items", trans: "76,080", rev: "₹19,204,909.20" },
      { date: getYearStr(1), branch: "Branch 1", sales: "75,240 Items", trans: "112,800", rev: "₹26,908,576.80" },
      { date: getYearStr(1), branch: "Branch 2", sales: "70,920 Items", trans: "106,320", rev: "₹28,134,230.40" },
      { date: getYearStr(2), branch: "Branch 1", sales: "83,880 Items", trans: "125,760", rev: "₹13,588,711.20" },
      { date: getYearStr(2), branch: "Branch 2", sales: "28,800 Items", trans: "43,200", rev: "₹5,066,664.00" },
      { date: getYearStr(3), branch: "Branch 1", sales: "43,200 Items", trans: "64,800", rev: "₹8,266,128.00" },
      { date: getYearStr(3), branch: "Branch 2", sales: "52,800 Items", trans: "79,200", rev: "₹15,732,792.00" },
      { date: "2019", branch: "Branch 1", sales: "61,200 Items", trans: "91,800", rev: "₹18,543,210.50" },
      { date: "2019", branch: "Branch 2", sales: "45,600 Items", trans: "68,400", rev: "₹12,987,654.30" },
    ],
  },
};

export const profitData = {
  Daily: {
    stats: { total: "₹12,450", margin: "24.5%", topProduct: "Paracetamol" },
    rows: [
      { date: getFormattedDate(0), product: "Paracetamol 500mg", cost: "₹4,200", sale: "₹5,800", margin: "27.5%" },
      { date: getFormattedDate(0), product: "Amoxicillin 250mg", cost: "₹3,100", sale: "₹4,500", margin: "31.1%" },
      { date: getFormattedDate(0), product: "Ibuprofen 400mg", cost: "₹2,800", sale: "₹3,600", margin: "22.2%" },
      { date: getFormattedDate(0), product: "Cetirizine 10mg", cost: "₹1,500", sale: "₹2,200", margin: "31.8%" },
      { date: getFormattedDate(0), product: "Azithromycin 500mg", cost: "₹4,500", sale: "₹6,100", margin: "26.2%" },
      { date: getFormattedDate(1), product: "Omeprazole 20mg", cost: "₹2,200", sale: "₹3,100", margin: "29.0%" },
      { date: getFormattedDate(1), product: "Aspirin 75mg", cost: "₹1,800", sale: "₹2,400", margin: "25.0%" },
      { date: getFormattedDate(1), product: "Loratadine 10mg", cost: "₹1,200", sale: "₹1,700", margin: "29.4%" },
      { date: getFormattedDate(2), product: "Metformin 500mg", cost: "₹2,500", sale: "₹3,400", margin: "26.5%" },
      { date: getFormattedDate(2), product: "Amlodipine 5mg", cost: "₹3,200", sale: "₹4,300", margin: "25.6%" },
      { date: getFormattedDate(2), product: "Losartan 50mg", cost: "₹2,800", sale: "₹3,900", margin: "28.2%" },
      { date: getFormattedDate(3), product: "Pantoprazole 40mg", cost: "₹1,900", sale: "₹2,600", margin: "26.9%" },
      { date: getFormattedDate(3), product: "Diclofenac 50mg", cost: "₹1,600", sale: "₹2,200", margin: "27.3%" },
      { date: getFormattedDate(3), product: "Paracetamol 500mg", cost: "₹4,500", sale: "₹6,200", margin: "27.4%" },
    ],
  },
  Weekly: {
    stats: { total: "₹85,200", margin: "25.1%", topProduct: "Amoxicillin" },
    rows: [
      { date: getWeekDate(0), product: "Amoxicillin 250mg", cost: "₹15,500", sale: "₹22,100", margin: "29.8%" },
      { date: getWeekDate(0), product: "Paracetamol 500mg", cost: "₹21,200", sale: "₹28,500", margin: "25.6%" },
      { date: getWeekDate(0), product: "Ibuprofen 400mg", cost: "₹14,800", sale: "₹19,200", margin: "22.9%" },
      { date: getWeekDate(0), product: "Azithromycin 500mg", cost: "₹22,100", sale: "₹30,500", margin: "27.5%" },
      { date: getWeekDate(1), product: "Amoxicillin 250mg", cost: "₹14,900", sale: "₹21,500", margin: "30.6%" },
      { date: getWeekDate(1), product: "Paracetamol 500mg", cost: "₹20,500", sale: "₹27,800", margin: "26.2%" },
      { date: getWeekDate(1), product: "Ibuprofen 400mg", cost: "₹13,200", sale: "₹17,500", margin: "24.6%" },
      { date: getWeekDate(2), product: "Azithromycin 500mg", cost: "₹21,800", sale: "₹29,900", margin: "27.1%" },
      { date: getWeekDate(2), product: "Amoxicillin 250mg", cost: "₹16,300", sale: "₹23,200", margin: "29.7%" },
      { date: getWeekDate(2), product: "Paracetamol 500mg", cost: "₹19,600", sale: "₹26,400", margin: "25.8%" },
      { date: getWeekDate(3), product: "Ibuprofen 400mg", cost: "₹12,800", sale: "₹16,900", margin: "24.2%" },
      { date: getWeekDate(3), product: "Azithromycin 500mg", cost: "₹23,400", sale: "₹32,100", margin: "27.1%" },
    ],
  },
  Monthly: {
    stats: { total: "₹3,45,600", margin: "26.2%", topProduct: "Azithromycin" },
    rows: [
      { date: getMonthYearDate(0), product: "Azithromycin 500mg", cost: "₹85,400", sale: "₹1,18,500", margin: "27.9%" },
      { date: getMonthYearDate(0), product: "Paracetamol 500mg", cost: "₹78,200", sale: "₹1,05,800", margin: "26.0%" },
      { date: getMonthYearDate(0), product: "Amoxicillin 250mg", cost: "₹65,100", sale: "₹92,400", margin: "29.5%" },
      { date: getMonthYearDate(0), product: "Ibuprofen 400mg", cost: "₹55,800", sale: "₹72,600", margin: "23.1%" },
      { date: getMonthYearDate(0), product: "Cetirizine 10mg", cost: "₹32,500", sale: "₹47,200", margin: "31.1%" },
      { date: getMonthYearDate(1), product: "Azithromycin 500mg", cost: "₹82,100", sale: "₹1,14,200", margin: "28.1%" },
      { date: getMonthYearDate(1), product: "Paracetamol 500mg", cost: "₹76,500", sale: "₹1,03,500", margin: "26.0%" },
      { date: getMonthYearDate(1), product: "Amoxicillin 250mg", cost: "₹63,800", sale: "₹90,100", margin: "29.2%" },
      { date: getMonthYearDate(2), product: "Azithromycin 500mg", cost: "₹88,900", sale: "₹1,22,300", margin: "27.3%" },
      { date: getMonthYearDate(2), product: "Paracetamol 500mg", cost: "₹80,100", sale: "₹1,08,200", margin: "25.9%" },
      { date: getMonthYearDate(2), product: "Ibuprofen 400mg", cost: "₹58,200", sale: "₹75,400", margin: "22.8%" },
      { date: getMonthYearDate(3), product: "Amoxicillin 250mg", cost: "₹67,500", sale: "₹95,800", margin: "29.5%" },
    ],
  },
  Yearly: {
    stats: { total: "₹42,50,000", margin: "27.8%", topProduct: "Paracetamol" },
    rows: [
      { date: getYearStr(0), product: "Paracetamol 500mg", cost: "₹8,54,200", sale: "₹11,85,600", margin: "27.9%" },
      { date: getYearStr(0), product: "Azithromycin 500mg", cost: "₹9,25,100", sale: "₹12,95,200", margin: "28.5%" },
      { date: getYearStr(0), product: "Amoxicillin 250mg", cost: "₹7,42,800", sale: "₹10,58,400", margin: "29.8%" },
      { date: getYearStr(1), product: "Paracetamol 500mg", cost: "₹8,12,500", sale: "₹11,25,400", margin: "27.8%" },
      { date: getYearStr(1), product: "Azithromycin 500mg", cost: "₹8,85,200", sale: "₹12,42,100", margin: "28.7%" },
      { date: getYearStr(1), product: "Amoxicillin 250mg", cost: "₹7,18,600", sale: "₹10,22,300", margin: "29.7%" },
      { date: getYearStr(2), product: "Paracetamol 500mg", cost: "₹7,98,300", sale: "₹11,05,600", margin: "27.8%" },
      { date: getYearStr(2), product: "Azithromycin 500mg", cost: "₹8,52,400", sale: "₹11,95,800", margin: "28.7%" },
      { date: getYearStr(2), product: "Ibuprofen 400mg", cost: "₹6,25,700", sale: "₹8,42,300", margin: "25.7%" },
      { date: getYearStr(3), product: "Paracetamol 500mg", cost: "₹7,65,200", sale: "₹10,58,400", margin: "27.7%" },
    ],
  },
};

export const purchaseData = {
  stats: { total: "₹4,52,300", amount: "₹6.1M", pending: "12" },
  rows: [
    { date: getFormattedDate(0), supplier: "Global Pharma", items: "150 Boxes", amount: "₹82,686.41", status: "Delivered" },
    { date: getFormattedDate(1), supplier: "MedLife Solutions", items: "200 Units", amount: "₹1,60,040.91", status: "Pending" },
    { date: getFormattedDate(2), supplier: "BioCare Dist.", items: "120 Packs", amount: "₹2,24,238.14", status: "Delivered" },
    { date: getFormattedDate(3), supplier: "HealthLink", items: "85 Boxes", amount: "₹2,34,451.92", status: "Shipped" },
    { date: getFormattedDate(4), supplier: "Reliant Pharma", items: "300 Units", amount: "₹1,13,239.26", status: "Delivered" },
    { date: getFormattedDate(5), supplier: "Global Pharma", items: "110 Boxes", amount: "₹65,400.00", status: "Shipped" },
    { date: getFormattedDate(6), supplier: "MedLife Solutions", items: "250 Units", amount: "₹1,85,200.50", status: "Delivered" },
    { date: getFormattedDate(7), supplier: "BioCare Dist.", items: "90 Packs", amount: "₹1,45,600.00", status: "Pending" },
    { date: getFormattedDate(8), supplier: "HealthLink", items: "175 Boxes", amount: "₹3,12,800.75", status: "Delivered" },
    { date: getFormattedDate(9), supplier: "Reliant Pharma", items: "400 Units", amount: "₹2,05,500.00", status: "Shipped" },
    { date: getFormattedDate(10), supplier: "Global Pharma", items: "230 Boxes", amount: "₹1,42,300.25", status: "Delivered" },
    { date: getFormattedDate(11), supplier: "MedLife Solutions", items: "180 Units", amount: "₹98,765.43", status: "Pending" },
    { date: getFormattedDate(12), supplier: "BioCare Dist.", items: "145 Packs", amount: "₹2,34,567.89", status: "Shipped" },
    { date: getFormattedDate(13), supplier: "HealthLink", items: "200 Boxes", amount: "₹1,23,456.78", status: "Delivered" },
    { date: getFormattedDate(14), supplier: "Reliant Pharma", items: "350 Units", amount: "₹1,87,654.32", status: "Delivered" },
    { date: getFormattedDate(15), supplier: "Global Pharma", items: "160 Boxes", amount: "₹92,345.67", status: "Pending" },
    { date: getFormattedDate(16), supplier: "MedLife Solutions", items: "220 Units", amount: "₹1,56,789.01", status: "Shipped" },
    { date: getFormattedDate(17), supplier: "BioCare Dist.", items: "110 Packs", amount: "₹2,01,234.56", status: "Delivered" },
    { date: getFormattedDate(18), supplier: "HealthLink", items: "195 Boxes", amount: "₹2,89,012.34", status: "Delivered" },
    { date: getFormattedDate(19), supplier: "Reliant Pharma", items: "280 Units", amount: "₹1,67,890.12", status: "Pending" },
  ],
};

export const inventoryData = {
  stats: { total: "45,230", expiring: "128", skus: "3,450" },
  rows: {
    "Stock Movement": [
      { date: getFormattedDate(0), product: "Paracetamol 500mg", type: "Inward", qty: "+500", branch: "Branch 1" },
      { date: getFormattedDate(0), product: "Amoxicillin 250mg", type: "Outward", qty: "-120", branch: "Branch 2" },
      { date: getFormattedDate(1), product: "Ibuprofen 400mg", type: "Inward", qty: "+300", branch: "Branch 1" },
      { date: getFormattedDate(1), product: "Cetirizine 10mg", type: "Outward", qty: "-85", branch: "Branch 2" },
      { date: getFormattedDate(2), product: "Azithromycin 500mg", type: "Inward", qty: "+250", branch: "Branch 1" },
      { date: getFormattedDate(2), product: "Omeprazole 20mg", type: "Outward", qty: "-150", branch: "Branch 1" },
      { date: getFormattedDate(3), product: "Aspirin 75mg", type: "Inward", qty: "+600", branch: "Branch 2" },
      { date: getFormattedDate(3), product: "Loratadine 10mg", type: "Outward", qty: "-95", branch: "Branch 1" },
      { date: getFormattedDate(4), product: "Metformin 500mg", type: "Inward", qty: "+400", branch: "Branch 2" },
      { date: getFormattedDate(4), product: "Amlodipine 5mg", type: "Outward", qty: "-200", branch: "Branch 1" },
      { date: getFormattedDate(5), product: "Losartan 50mg", type: "Inward", qty: "+350", branch: "Branch 2" },
      { date: getFormattedDate(5), product: "Pantoprazole 40mg", type: "Outward", qty: "-75", branch: "Branch 1" },
      { date: getFormattedDate(6), product: "Diclofenac 50mg", type: "Inward", qty: "+250", branch: "Branch 2" },
      { date: getFormattedDate(6), product: "Paracetamol 500mg", type: "Outward", qty: "-180", branch: "Branch 1" },
      { date: getFormattedDate(7), product: "Amoxicillin 250mg", type: "Inward", qty: "+450", branch: "Branch 2" },
      { date: getFormattedDate(7), product: "Ibuprofen 400mg", type: "Outward", qty: "-250", branch: "Branch 1" },
      { date: getFormattedDate(8), product: "Cetirizine 10mg", type: "Inward", qty: "+200", branch: "Branch 2" },
      { date: getFormattedDate(8), product: "Azithromycin 500mg", type: "Outward", qty: "-150", branch: "Branch 1" },
    ],
    "Expiry Reports": [
      { product: "Amoxicillin 250mg", batch: "B-2391", expiry: getFormattedDate(-45), qty: "120", status: "Expiring Soon" },
      { product: "Ibuprofen 400mg", batch: "B-4412", expiry: getFormattedDate(18), qty: "50", status: "Expired" },
      { product: "Paracetamol 500mg", batch: "B-1102", expiry: "Dec 05, 2024", qty: "500", status: "Active" },
      { product: "Cetirizine 10mg", batch: "B-5531", expiry: getFormattedDate(-60), qty: "85", status: "Expiring Soon" },
      { product: "Azithromycin 500mg", batch: "B-6622", expiry: getFormattedDate(15), qty: "30", status: "Expired" },
      { product: "Omeprazole 20mg", batch: "B-7744", expiry: "Jan 10, 2025", qty: "250", status: "Active" },
      { product: "Aspirin 75mg", batch: "B-8855", expiry: getFormattedDate(-50), qty: "110", status: "Expiring Soon" },
      { product: "Loratadine 10mg", batch: "B-9966", expiry: getFormattedDate(-70), qty: "75", status: "Expiring Soon" },
      { product: "Metformin 500mg", batch: "B-1077", expiry: "Mar 20, 2025", qty: "200", status: "Active" },
      { product: "Amlodipine 5mg", batch: "B-1188", expiry: getFormattedDate(-30), qty: "45", status: "Expiring Soon" },
      { product: "Losartan 50mg", batch: "B-1299", expiry: getFormattedDate(-40), qty: "65", status: "Expiring Soon" },
      { product: "Pantoprazole 40mg", batch: "B-1300", expiry: "Jun 15, 2025", qty: "180", status: "Active" },
      { product: "Diclofenac 50mg", batch: "B-1411", expiry: getFormattedDate(40), qty: "25", status: "Expired" },
      { product: "Paracetamol 500mg", batch: "B-1522", expiry: "Apr 30, 2024", qty: "350", status: "Active" },
    ],
  },
};

export const gstData = {
  stats: { taxable: "₹4,12,500", collected: "₹74,250", invoices: "145" },
  rows: [
    { invoice: "INV-2026-001", date: getISODate(0), gstin: "27AADCB2230M1Z2", taxable: "₹12,500", amount: "₹2,250", type: "Sales" },
    { invoice: "INV-2026-002", date: getISODate(1), gstin: "27BBNML1234K1Z5", taxable: "₹8,200", amount: "₹1,476", type: "Sales" },
    { invoice: "PUR-2026-010", date: getISODate(2), gstin: "29AADCB2230M1Z2", taxable: "₹45,000", amount: "₹8,100", type: "Purchase" },
    { invoice: "INV-2026-003", date: getISODate(3), gstin: "27CCDEF5678L1Z9", taxable: "₹15,600", amount: "₹2,808", type: "Sales" },
    { invoice: "INV-2026-004", date: getISODate(4), gstin: "27DDPQR9012N1Z3", taxable: "₹5,400", amount: "₹972", type: "Sales" },
    { invoice: "PUR-2026-011", date: getISODate(5), gstin: "24EEFGH3456P1Z7", taxable: "₹28,000", amount: "₹5,040", type: "Purchase" },
    { invoice: "INV-2026-005", date: getISODate(6), gstin: "27FFIJK7890Q1Z1", taxable: "₹11,200", amount: "₹2,016", type: "Sales" },
    { invoice: "INV-2026-006", date: getISODate(7), gstin: "27GGLMN1234R1Z4", taxable: "₹9,800", amount: "₹1,764", type: "Sales" },
    { invoice: "INV-2026-007", date: getISODate(8), gstin: "27HHNOP5678S1Z7", taxable: "₹18,500", amount: "₹3,330", type: "Sales" },
    { invoice: "PUR-2026-012", date: getISODate(9), gstin: "28IIJKL9012T1Z9", taxable: "₹32,000", amount: "₹5,760", type: "Purchase" },
    { invoice: "INV-2026-008", date: getISODate(10), gstin: "27JJMNO2345U1Z2", taxable: "₹14,200", amount: "₹2,556", type: "Sales" },
    { invoice: "INV-2026-009", date: getISODate(11), gstin: "27KKPQR6789V1Z5", taxable: "₹6,800", amount: "₹1,224", type: "Sales" },
    { invoice: "PUR-2026-013", date: getISODate(12), gstin: "26LLSTU0123W1Z8", taxable: "₹22,500", amount: "₹4,050", type: "Purchase" },
    { invoice: "INV-2026-010", date: getISODate(13), gstin: "27MMUVW4567X1Z1", taxable: "₹10,300", amount: "₹1,854", type: "Sales" },
    { invoice: "INV-2026-011", date: getISODate(14), gstin: "27NNXYZ7890Y1Z4", taxable: "₹7,600", amount: "₹1,368", type: "Sales" },
    { invoice: "PUR-2026-014", date: getISODate(15), gstin: "25AABCD1234Z1Z7", taxable: "₹38,000", amount: "₹6,840", type: "Purchase" },
    { invoice: "INV-2026-012", date: getISODate(16), gstin: "27BBEFG5678A2Z9", taxable: "₹16,400", amount: "₹2,952", type: "Sales" },
    { invoice: "INV-2026-013", date: getISODate(17), gstin: "27CCHIJ9012B2Z2", taxable: "₹4,200", amount: "₹756", type: "Sales" },
    { invoice: "PUR-2026-015", date: getISODate(18), gstin: "29DDKLM3456C2Z5", taxable: "₹41,000", amount: "₹7,380", type: "Purchase" },
    { invoice: "INV-2026-014", date: getISODate(19), gstin: "27EENOP7890D2Z8", taxable: "₹13,800", amount: "₹2,484", type: "Sales" },
  ],
};

export const customerData = {
  stats: { customers: "1,842", revenue: "₹28.6M", repeatRate: "64%" },
  rows: [
    { name: "Rahul Sharma", orders: "12", spend: "₹14,200", lastPurchase: getFormattedDate(0), type: "Repeat" },
    { name: "Priya Patel", orders: "1", spend: "₹1,250", lastPurchase: getFormattedDate(1), type: "One-Time" },
    { name: "Amit Kumar", orders: "8", spend: "₹9,800", lastPurchase: getFormattedDate(3), type: "Repeat" },
    { name: "Neha Singh", orders: "2", spend: "₹2,400", lastPurchase: getFormattedDate(4), type: "Repeat" },
    { name: "Vikram Desai", orders: "1", spend: "₹850", lastPurchase: getFormattedDate(6), type: "One-Time" },
    { name: "Anjali Gupta", orders: "15", spend: "₹21,500", lastPurchase: getFormattedDate(7), type: "Repeat" },
    { name: "Suresh Reddy", orders: "4", spend: "₹5,600", lastPurchase: getFormattedDate(9), type: "Repeat" },
    { name: "Pooja Verma", orders: "1", spend: "₹1,100", lastPurchase: getFormattedDate(10), type: "One-Time" },
    { name: "Ravi Teja", orders: "9", spend: "₹11,200", lastPurchase: getFormattedDate(13), type: "Repeat" },
    { name: "Meera Nair", orders: "1", spend: "₹950", lastPurchase: getFormattedDate(14), type: "One-Time" },
    { name: "Arjun Mehta", orders: "6", spend: "₹7,800", lastPurchase: getFormattedDate(15), type: "Repeat" },
    { name: "Kavya Iyer", orders: "3", spend: "₹3,600", lastPurchase: getFormattedDate(16), type: "Repeat" },
    { name: "Deepak Raj", orders: "1", spend: "₹1,500", lastPurchase: getFormattedDate(17), type: "One-Time" },
    { name: "Sana Khan", orders: "11", spend: "₹13,200", lastPurchase: getFormattedDate(18), type: "Repeat" },
    { name: "Manoj Yadav", orders: "2", spend: "₹2,800", lastPurchase: getFormattedDate(19), type: "Repeat" },
    { name: "Ritu Reddy", orders: "1", spend: "₹750", lastPurchase: getFormattedDate(20), type: "One-Time" },
    { name: "Gaurav Jain", orders: "7", spend: "₹8,900", lastPurchase: getFormattedDate(21), type: "Repeat" },
    { name: "Shreya Shah", orders: "4", spend: "₹4,200", lastPurchase: getFormattedDate(22), type: "Repeat" },
    { name: "Vivek Singh", orders: "1", spend: "₹1,800", lastPurchase: getFormattedDate(23), type: "One-Time" },
    { name: "Nisha Patel", orders: "10", spend: "₹12,500", lastPurchase: getFormattedDate(24), type: "Repeat" },
  ],
};

export const supplierData = {
  stats: {
    totalSuppliers: "48",
    outstanding: "₹12,45,600",
    deliveryRate: "87%",
  },
  rows: [
    { name: "Global Pharma", totalSupplied: "₹18,40,000", lastOrder: getFormattedDate(0), outstanding: "₹3,45,000" },
    { name: "MedLife Solutions", totalSupplied: "₹9,20,000", lastOrder: getFormattedDate(1), outstanding: "₹0" },
    { name: "BioCare Dist.", totalSupplied: "₹14,60,000", lastOrder: getFormattedDate(2), outstanding: "₹1,80,000" },
    { name: "HealthLink", totalSupplied: "₹21,30,000", lastOrder: getFormattedDate(3), outstanding: "₹0" },
    { name: "Reliant Pharma", totalSupplied: "₹11,75,000", lastOrder: getFormattedDate(4), outstanding: "₹2,10,000" },
    { name: "Sun Pharma", totalSupplied: "₹8,50,000", lastOrder: getFormattedDate(5), outstanding: "₹0" },
    { name: "Aurobindo", totalSupplied: "₹16,20,000", lastOrder: getFormattedDate(6), outstanding: "₹1,20,000" },
    { name: "Cipla Ltd", totalSupplied: "₹22,10,000", lastOrder: getFormattedDate(7), outstanding: "₹4,50,000" },
    { name: "Dr. Reddy's", totalSupplied: "₹13,80,000", lastOrder: getFormattedDate(8), outstanding: "₹95,000" },
    { name: "Torrent Pharma", totalSupplied: "₹9,90,000", lastOrder: getFormattedDate(9), outstanding: "₹0" },
    { name: "Zydus Cadila", totalSupplied: "₹7,40,000", lastOrder: getFormattedDate(10), outstanding: "₹1,50,000" },
    { name: "Lupin Ltd", totalSupplied: "₹12,30,000", lastOrder: getFormattedDate(11), outstanding: "₹0" },
    { name: "Abbott India", totalSupplied: "₹19,50,000", lastOrder: getFormattedDate(12), outstanding: "₹2,75,000" },
    { name: "Novartis", totalSupplied: "₹6,80,000", lastOrder: getFormattedDate(13), outstanding: "₹0" },
    { name: "Pfizer Ltd", totalSupplied: "₹15,70,000", lastOrder: getFormattedDate(14), outstanding: "₹1,65,000" },
    { name: "Sanofi India", totalSupplied: "₹10,40,000", lastOrder: getFormattedDate(15), outstanding: "₹0" },
    { name: "GlaxoSmithKline", totalSupplied: "₹17,80,000", lastOrder: getFormattedDate(16), outstanding: "₹2,30,000" },
    { name: "Bayer Pharma", totalSupplied: "₹5,60,000", lastOrder: getFormattedDate(17), outstanding: "₹0" },
    { name: "Mankind Pharma", totalSupplied: "₹8,90,000", lastOrder: getFormattedDate(18), outstanding: "₹85,000" },
    { name: "Alkem Labs", totalSupplied: "₹11,20,000", lastOrder: getFormattedDate(19), outstanding: "₹0" },
  ],
};