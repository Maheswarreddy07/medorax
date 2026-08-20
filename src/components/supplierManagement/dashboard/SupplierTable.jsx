import { Search, Download, Users } from "lucide-react";
import SupplierRow from "./SupplierRow";

const SupplierTable = () => {
  const suppliers = [
    {
      id: "SUP-001",
      name: "PharmaCorp Global",
      contact: "Dr. Sarah Jenkins",
      balance: "$450,230.00",
      status: "Overdue",
      avatarBg: "bg-gradient-to-br from-blue-500 to-cyan-400",
      avatarText: "text-white",
      statusClass: "bg-red-50 text-red-700 ring-1 ring-red-200"
    },
    {
      id: "SUP-002",
      name: "MediEquip Supplies",
      contact: "James Chen",
      balance: "$12,450.50",
      status: "Current",
      avatarBg: "bg-gradient-to-br from-emerald-500 to-teal-400",
      avatarText: "text-white",
      statusClass: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
    },
    {
      id: "SUP-003",
      name: "BioGenetics Lab",
      contact: "Amanda Torres",
      balance: "$85,900.00",
      status: "Processing",
      avatarBg: "bg-gradient-to-br from-violet-500 to-purple-400",
      avatarText: "text-white",
      statusClass: "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
    },
    {
      id: "SUP-004",
      name: "Novanet Health",
      contact: "Michael Ross",
      balance: "$0.00",
      status: "Current",
      avatarBg: "bg-gradient-to-br from-amber-500 to-orange-400",
      avatarText: "text-white",
      statusClass: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
    }
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-5 border-b border-slate-200 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-teal-50 ring-1 ring-blue-100">
            <Users size={18} className="text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Supplier Directory
            </h2>
            <p className="mt-0.5 text-sm text-slate-500">
              View and manage all registered suppliers.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              placeholder="Search suppliers..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 sm:w-72"
            />
          </div>

          <button className="flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 px-5 text-sm font-medium text-white shadow-md shadow-blue-200/50 transition hover:opacity-95 hover:shadow-lg">
            <Download size={17} />
            Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-50">
            <tr className="text-sm text-slate-500">
              <th className="px-6 py-4 text-left font-semibold">Supplier</th>
              <th className="px-6 py-4 text-left font-semibold">Contact</th>
              <th className="px-6 py-4 text-right font-semibold">Outstanding</th>
              <th className="px-6 py-4 text-center font-semibold">Status</th>
              <th className="px-6 py-4 text-right font-semibold">Action</th>
            </tr>
          </thead>

          <tbody>
            {suppliers.map((supplier, index) => (
              <SupplierRow
                key={supplier.id}
                supplier={supplier}
                index={index}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupplierTable;
