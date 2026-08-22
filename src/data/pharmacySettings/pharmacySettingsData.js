export const kpiSummary = [
  {
    id: "todays-sales",
    label: "Today's Sales",
    value: "$12,480",
    icon: "payments",
    trend: { direction: "up", value: "12%" },
    accent: true,
  },
  {
    id: "total-revenue",
    label: "Total Revenue",
    value: "$420.5k",
    icon: "wallet",
    trend: { direction: "up", value: "8%" },
  },
  {
    id: "total-orders",
    label: "Total Orders",
    value: "1,240",
    icon: "shopping-bag",
    trend: { direction: "down", value: "3%" },
  },
  {
    id: "active-customers",
    label: "Active Customers",
    value: "8,642",
    icon: "users",
    trend: { direction: "up", value: "24" },
  },
  {
    id: "total-medicines",
    label: "Total Medicines",
    value: "3,200",
    icon: "pill",
  },
  {
    id: "low-stock",
    label: "Low Stock",
    value: "42",
    icon: "alert-triangle",
    accent: "error",
  },
  {
    id: "out-of-stock",
    label: "Out of Stock",
    value: "12",
    icon: "x-circle",
  },
  {
    id: "active-branches",
    label: "Active Branches",
    value: "18",
    icon: "building-2",
  },
  {
    id: "pending-orders",
    label: "Pending Orders",
    value: "156",
    icon: "clock",
  },
  {
    id: "expiring-soon",
    label: "Expiring Soon",
    value: "84",
    icon: "calendar-x",
  },
  {
    id: "total-employees",
    label: "Total Employees",
    value: "112",
    icon: "badge-check",
  },
];

export const revenueOverview = {
  periods: ["Monthly", "Quarterly", "Yearly"],
  bars: [60, 45, 75, 65, 90, 55, 40, 70, 85, 60],
};

export const branchPerformance = [
  { name: "Central Branch (Main)", score: 92 },
  { name: "Eastside Medical", score: 78 },
  { name: "North Plaza Pharma", score: 64 },
];

export const categoryDistribution = {
  totalSkus: "8.4k",
  categories: [
    { name: "Antibiotics", color: "bg-primary" },
    { name: "Pain Relief", color: "bg-secondary" },
    { name: "Vitamins", color: "bg-primary-fixed-dim" },
    { name: "Others", color: "bg-outline" },
  ],
};

export const recentOrders = [
  {
    orderId: "#ORD-24891",
    customer: "James Wilson",
    branch: "Central",
    amount: "$142.50",
    status: "Paid",
  },
  {
    orderId: "#ORD-24890",
    customer: "Elena Rodriguez",
    branch: "Eastside",
    amount: "$89.00",
    status: "Pending",
  },
  {
    orderId: "#ORD-24889",
    customer: "Michael Chen",
    branch: "Central",
    amount: "$210.30",
    status: "Cancelled",
  },
];

export const quickActions = [
  { id: "add-medicine", label: "Add Medicine", icon: "package-plus" },
  { id: "create-branch", label: "Create Branch", icon: "building" },
  { id: "add-customer", label: "Add Customer", icon: "user-plus" },
  { id: "purchase-order", label: "Purchase Order", icon: "clipboard-list" },
  { id: "generate-report", label: "Generate Report", icon: "file-bar-chart" },
  { id: "manage-inventory", label: "Manage Inventory", icon: "boxes" },
];

export const lowStockAlerts = [
  { medicine: "Amoxicillin 500mg", location: "Central Branch", quantity: 12 },
  { medicine: "Lisinopril 10mg", location: "Eastside", quantity: 8 },
];

export const recentActivity = [
  {
    title: "New Order",
    detail: "placed by Dr. Adam",
    meta: "2 mins ago • Order #24892",
    tone: "primary",
    icon: "shopping-cart",
  },
  {
    title: "Branch Created",
    detail: "- West Hills",
    meta: "45 mins ago • Admin Action",
    tone: "secondary",
    icon: "building-2",
  },
  {
    title: "Medicine Updated",
    detail: "- Ibuprofen",
    meta: "2 hours ago • Catalog Team",
    tone: "neutral",
    icon: "pencil",
  },
  {
    title: "User Login",
    detail: "- PharmTech-04",
    meta: "3 hours ago • IP: 192.168.1.45",
    tone: "muted",
    icon: "log-in",
  },
];

export const pharmacyProfile = {
  business: {
    pharmacyName: "Medorax Central Pharmacy",
    businessType: "Retail Pharmacy",
    gstNumber: "22AAAAA0000A1Z5",
    drugLicenseNumber: "DL-98234/PH-2023",
    panNumber: "ABCDE1234F",
    registrationNumber: "REG-554433",
    establishmentDate: "2015-03-12",
    description:
      "Leading healthcare provider in the central district specializing in high-end pharmaceuticals and chronic care management.",
  },
  owner: {
    fullName: "Dr. Aris Thorne",
    fatherName: "Julian Thorne",
    dateOfBirth: "1980-05-15",
    gender: "Male",
    aadhaarNumber: "1234 5678 9012",
    panNumber: "ABCDE1234F",
    mobileNumber: "+91 98765 43210",
    alternateMobileNumber: "+91 90000 11111",
    email: "aris.thorne@medorax.com",
  },
  address: {
    line1: "742 Medical District",
    line2: "Biotech Corridor",
    landmark: "",
    city: "Neo Metro",
    district: "Central District",
    state: "Maharashtra",
    pinCode: "400001",
    country: "India",
    timeZone: "(GMT+05:30) India Standard Time",
  },
  license: {
    drugLicenseNumber: "DL-98234/PH-2023",
    issueDate: "2020-01-01",
    expiryDate: "2025-12-31",
    gstNumber: "22AAAAA0000A1Z5",
    gstRegistrationDate: "2017-07-01",
    registrationNumber: "REG-554433",
    fssaiNumber: "",
  },
  contact: {
    businessPhone: "+91 22 4455 6677",
    alternatePhone: "+91 90000 11111",
    email: "contact@medorax.com",
    website: "www.medorax.com",
    emergencyContact: "102",
    supportNumber: "1800-MED-ORAX",
    openingTime: "09:00",
    closingTime: "21:00",
  },
  documents: [
    {
      name: "Pharmacy License",
      status: "Verified",
      uploadedOn: "Oct 12, 2023",
      statusTone: "success",
    },
    {
      name: "GST Registration",
      status: "Verified",
      uploadedOn: "Jul 01, 2017",
      statusTone: "success",
    },
    {
      name: "Drug License",
      status: "Expiring Soon",
      uploadedOn: "Jan 01, 2020",
      statusTone: "warning",
    },
  ],
};

export const branches = [
  {
    id: "BR-001",
    name: "Medorax Central Pharmacy",
    code: "BR-001",
    manager: "Dr. Aris Thorne",
    contact: "+91 98765 43210",
    email: "central@medorax.com",
    businessType: "Retail Pharmacy",
    addressLine1: "742 Medical District",
    city: "Neo Metro",
    state: "Maharashtra",
    pinCode: "400001",
    status: "Active",
    settings: { billingEnabled: true, autoRefill: false, threshold: 20, taxScheme: "Standard GST (18%)" },
  },
  {
    id: "BR-002",
    name: "North Side Clinic",
    code: "BR-002",
    manager: "Sarah Jenkins",
    contact: "+91 99887 76655",
    email: "northside@medorax.com",
    businessType: "Clinic Pharmacy",
    addressLine1: "123 North Avenue",
    city: "Neo Metro",
    state: "Maharashtra",
    pinCode: "400002",
    status: "Temporarily Closed",
    settings: { billingEnabled: true, autoRefill: false, threshold: 20, taxScheme: "Standard GST (18%)" },
  },
];

export const directorySummary = {
  pharmacy: {
    name: "Medorax Central",
    code: "MED-HQ-001",
    verified: true,
    active: true,
    gstNumber: "22AAAAA0000A1Z5",
    licenseNo: "DL-12345/2023",
    panNumber: "ABCDE1234F",
    establishedOn: "12 Oct 2018",
  },
  owner: {
    name: "Dr. Aris Thorne",
    role: "Principal Owner & Director",
    phone: "+91 98765 43210",
    email: "aris.thorne@medorax.com",
    aadhaarMasked: "**** **** 4567",
    panMasked: "XXXXX1234X",
  },
  contact: {
    address:
      "Suite 405, Healthcare Towers, Biotech Park, Sector 62, Noida, UP - 201301",
    website: "www.medorax-central.com",
  },
  licenses: [
    {
      name: "Drug License",
      number: "DL-UP-12345/20",
      note: "Expires: 30 Dec 2025",
      tone: "primary",
      icon: "badge-check",
    },
    {
      name: "GST Certificate",
      number: "REG-GST-4422A",
      note: "Verified Status: Clear",
      tone: "secondary",
      icon: "file-text",
    },
    {
      name: "Pharmacy Registration",
      number: "REG-X-99801",
      note: "Renewal: in 142 days",
      tone: "tertiary",
      icon: "stamp",
    },
  ],
};

export const directoryBranches = [
  {
    id: "BR-DT-001",
    name: "Downtown Branch",
    manager: "Sarah Jenkins",
    contact: "+91 99887 76655",
    status: "ACTIVE",
    selected: false,
  },
  {
    id: "BR-NP-004",
    name: "North Plaza",
    manager: "Michael Vance",
    contact: "+91 91122 33445",
    status: "ACTIVE",
    selected: true,
  },
  {
    id: "BR-WS-009",
    name: "West Side Clinic",
    manager: "Emma Watson",
    contact: "+91 92233 44556",
    status: "INACTIVE",
    selected: false,
  },
];

export const branchDeepDive = {
  name: "North Plaza",
  lastAudit: "Last Audit: 2 days ago",
  statistics: [
    { label: "Monthly Sales", value: "₹42.5L", icon: "trending-up", tone: "primary" },
    { label: "Total Orders", value: "1,248", icon: "shopping-cart", tone: "neutral" },
    { label: "Low Stock Items", value: "12", icon: "triangle-alert", tone: "error" },
  ],
  toggles: [
    { label: "Invoicing Enabled", enabled: true },
    { label: "Auto-Restock", enabled: false },
    { label: "Digital Signature", enabled: true },
  ],
  configuration: {
    currency: "INR (₹) - Rupee",
    taxScheme: "Standard GST 18%",
    operatingHours: "09:00 AM - 11:00 PM",
    location: "G-12, North Plaza Mall, Highway Road, Sector 120, Noida",
  },
  timeline: [
    { event: "License Renewed", timestamp: "24 Oct 2023, 11:45 AM", current: true },
    { event: "Profile Updated", timestamp: "15 Sep 2023, 04:20 PM", current: false },
    { event: "Branch Created", timestamp: "12 Jan 2022, 10:00 AM", current: false },
  ],
};