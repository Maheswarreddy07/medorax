import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Plus,
  Filter,
  Building2,
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
  ShieldCheck,
  FileText,
  DollarSign,
  CheckCircle2,
  Clock,
  AlertTriangle,
  MoreVertical,
  Edit,
  Eye,
  X
} from "lucide-react";

export const initialSuppliersData = [
  {
    id: "SUP-001",
    name: "PharmaCorp Global Ltd.",
    code: "PCG-9842",
    category: "Pharmaceuticals",
    contactPerson: "Dr. Sarah Jenkins",
    email: "sarah.j@pharmacorp.com",
    phone: "+1 (555) 234-5678",
    address: "102 Innovation Way, BioTech Park, Boston, MA 02110",
    balance: "$450,230.00",
    totalOrders: 128,
    status: "Active",
    rating: 4.9,
    gstin: "27AAACP1234H1Z5",
    paymentTerms: "Net 30 Days",
    lastOrderDate: "2026-07-28",
    description: "Primary provider of active pharmaceutical ingredients (APIs), specialized vaccines, and high-purity clinical reagents."
  },
  {
    id: "SUP-002",
    name: "MediEquip Supplies Inc.",
    code: "MES-3104",
    category: "Medical Equipment",
    contactPerson: "James Chen",
    email: "jchen@mediequip.org",
    phone: "+1 (555) 876-5432",
    address: "45 Industrial Parkway, Sector 4, Chicago, IL 60601",
    balance: "$12,450.50",
    totalOrders: 64,
    status: "Active",
    rating: 4.7,
    gstin: "07AACCM9876J2Z1",
    paymentTerms: "Net 15 Days",
    lastOrderDate: "2026-07-30",
    description: "Manufacturer and distributor of diagnostic monitors, surgical equipment, ICU ventilators, and hospital grade furniture."
  },
  {
    id: "SUP-003",
    name: "BioGenetics Lab Solutions",
    code: "BGL-7712",
    category: "Reagents & Kits",
    contactPerson: "Amanda Torres",
    email: "a.torres@biogenetics.io",
    phone: "+1 (555) 432-1098",
    address: "88 Research Heights, San Diego, CA 92121",
    balance: "$85,900.00",
    totalOrders: 42,
    status: "Pending Review",
    rating: 4.5,
    gstin: "06AAACB5544K3Z8",
    paymentTerms: "Net 45 Days",
    lastOrderDate: "2026-07-15",
    description: "Specialized genomics testing kits, PCR reagents, molecular assay controls, and custom lab synthesis solutions."
  },
  {
    id: "SUP-004",
    name: "Novanet Healthcare Consumables",
    code: "NHC-1092",
    category: "Consumables",
    contactPerson: "Michael Ross",
    email: "mross@novanethealth.com",
    phone: "+1 (555) 901-2345",
    address: "12 Logistics Blvd, Suite 300, Dallas, TX 75201",
    balance: "$0.00",
    totalOrders: 215,
    status: "Active",
    rating: 4.8,
    gstin: "33AAACN3322L4Z9",
    paymentTerms: "Immediate",
    lastOrderDate: "2026-08-01",
    description: "Bulk supplier of sterile PPE, syringes, IV tubing, blood collection tubes, and emergency surgical disposables."
  },
  {
    id: "SUP-005",
    name: "Apex Diagnostics & Instruments",
    code: "ADI-5541",
    category: "Medical Equipment",
    contactPerson: "Elena Rostova",
    email: "e.rostova@apexdiag.de",
    phone: "+49 30 1234567",
    address: "Kaiser-Friedrich-Straße 12, Berlin, Germany",
    balance: "$112,000.00",
    totalOrders: 19,
    status: "Inactive",
    rating: 4.1,
    gstin: "99AAACA1111A1Z0",
    paymentTerms: "Advance",
    lastOrderDate: "2026-05-10",
    description: "European precision laboratory analyzers, automated blood cell counters, and centrifugation platforms."
  }
];

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState(initialSuppliersData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form state for editing/adding
  const [formData, setFormData] = useState({
    name: "",
    contactPerson: "",
    email: "",
    phone: "",
    category: "Pharmaceuticals",
    address: "",
    paymentTerms: "Net 30 Days",
    gstin: "",
    status: "Active",
    description: ""
  });

  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesSearch =
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || supplier.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenEdit = (supplier) => {
    setSelectedSupplier(supplier);
    setFormData({
      name: supplier.name,
      contactPerson: supplier.contactPerson,
      email: supplier.email,
      phone: supplier.phone,
      category: supplier.category,
      address: supplier.address,
      paymentTerms: supplier.paymentTerms,
      gstin: supplier.gstin,
      status: supplier.status,
      description: supplier.description
    });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setSuppliers((prev) =>
      prev.map((s) =>
        s.id === selectedSupplier.id ? { ...s, ...formData } : s
      )
    );
    setIsEditModalOpen(false);
  };

  const handleAddSupplier = (e) => {
    e.preventDefault();
    const newSup = {
      id: `SUP-00${suppliers.length + 1}`,
      code: `SUP-${Math.floor(1000 + Math.random() * 9000)}`,
      ...formData,
      balance: "$0.00",
      totalOrders: 0,
      rating: 5.0,
      lastOrderDate: "N/A"
    };
    setSuppliers([newSup, ...suppliers]);
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Supplier Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Browse, monitor, and manage your partner suppliers and vendor profiles.
          </p>
        </div>

        <button
          onClick={() => {
            setFormData({
              name: "",
              contactPerson: "",
              email: "",
              phone: "",
              category: "Pharmaceuticals",
              address: "",
              paymentTerms: "Net 30 Days",
              gstin: "",
              status: "Active",
              description: ""
            });
            setIsAddModalOpen(true);
          }}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        >
          <Plus size={18} />
          <span>Add New Supplier</span>
        </button>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search by supplier name, contact person, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto">
          <Filter size={16} className="text-slate-400 shrink-0" />
          {["All", "Pharmaceuticals", "Medical Equipment", "Reagents & Kits", "Consumables"].map(
            (category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  selectedCategory === category
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {category}
              </button>
            )
          )}
        </div>
      </div>

      {/* Supplier Grid / List */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredSuppliers.map((supplier) => (
          <div
            key={supplier.id}
            className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition duration-200 hover:border-blue-300 hover:shadow-md"
          >
            <div>
              {/* Header inside card */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-teal-50 font-bold text-blue-700 ring-1 ring-blue-100">
                    {supplier.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition">
                      {supplier.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">{supplier.code}</p>
                  </div>
                </div>

                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    supplier.status === "Active"
                      ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                      : supplier.status === "Pending Review"
                      ? "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
                      : "bg-slate-100 text-slate-600 ring-1 ring-slate-200"
                  }`}
                >
                  {supplier.status}
                </span>
              </div>

              {/* Category Tag */}
              <div className="mt-3">
                <span className="inline-block rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                  {supplier.category}
                </span>
              </div>

              {/* Details list */}
              <div className="mt-4 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Building2 size={14} className="text-slate-400 shrink-0" />
                  <span className="font-medium text-slate-700">{supplier.contactPerson}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-slate-400 shrink-0" />
                  <span className="truncate">{supplier.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-slate-400 shrink-0" />
                  <span>{supplier.phone}</span>
                </div>
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="mt-5 border-t border-slate-100 pt-4 flex items-center justify-between gap-2">
              <div>
                <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-medium">
                  Outstanding
                </span>
                <span className="text-sm font-bold text-slate-800 font-mono">
                  {supplier.balance}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <Link
                  to={`/suppliers/${supplier.id}`}
                  state={{ supplier }}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
                >
                  <Eye size={13} />
                  <span>Profile</span>
                </Link>

                <button
                  onClick={() => handleOpenEdit(supplier)}
                  className="inline-flex items-center gap-1 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 transition hover:bg-blue-100"
                >
                  <Edit size={13} />
                  <span>Manage</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Manage Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl transition-all my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Manage Supplier Profile
                </h2>
                <p className="text-xs text-slate-500">
                  Update operational contact, status, and terms.
                </p>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Company / Supplier Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    value={formData.contactPerson}
                    onChange={(e) =>
                      setFormData({ ...formData, contactPerson: e.target.value })
                    }
                    required
                    className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500 bg-white"
                  >
                    <option value="Pharmaceuticals">Pharmaceuticals</option>
                    <option value="Medical Equipment">Medical Equipment</option>
                    <option value="Reagents & Kits">Reagents & Kits</option>
                    <option value="Consumables">Consumables</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                    className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    GSTIN / Tax ID
                  </label>
                  <input
                    type="text"
                    value={formData.gstin}
                    onChange={(e) =>
                      setFormData({ ...formData, gstin: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500 bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Pending Review">Pending Review</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700 shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add New Supplier Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Add New Supplier
                </h2>
                <p className="text-xs text-slate-500">
                  Register a new vendor in your supplier directory.
                </p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddSupplier} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Supplier / Company Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Apex Health Logistics"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.contactPerson}
                    onChange={(e) =>
                      setFormData({ ...formData, contactPerson: e.target.value })
                    }
                    required
                    className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500 bg-white"
                  >
                    <option value="Pharmaceuticals">Pharmaceuticals</option>
                    <option value="Medical Equipment">Medical Equipment</option>
                    <option value="Reagents & Kits">Reagents & Kits</option>
                    <option value="Consumables">Consumables</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="email@supplier.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="text"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                    className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="Street address, City, Country"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 px-5 py-2 font-semibold text-white shadow-sm hover:opacity-90"
                >
                  Add Supplier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Suppliers;
