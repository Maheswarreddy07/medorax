import { Search, Download } from "lucide-react";
import SupplierRow from "./SupplierRow";

const SupplierTable = () => {
  const suppliers = [
    {
      id: 1,
      initial: "P",
      name: "PharmaCorp Global",
      contact: "Dr. Sarah Jenkins",
      balance: "$450,230.00",
      status: "Overdue",
      avatarBg: "bg-blue-100",
      avatarText: "text-blue-700",
      statusClass: "bg-red-100 text-red-700",
    },
    {
      id: 2,
      initial: "M",
      name: "MediEquip Supplies",
      contact: "James Chen",
      balance: "$12,450.50",
      status: "Current",
      avatarBg: "bg-emerald-100",
      avatarText: "text-emerald-700",
      statusClass: "bg-emerald-100 text-emerald-700",
    },
    {
      id: 3,
      initial: "B",
      name: "BioGenetics Lab",
      contact: "Amanda Torres",
      balance: "$85,900.00",
      status: "Processing",
      avatarBg: "bg-cyan-100",
      avatarText: "text-cyan-700",
      statusClass: "bg-amber-100 text-amber-700",
    },
    {
      id: 4,
      initial: "N",
      name: "Novanet Health",
      contact: "Michael Ross",
      balance: "$0.00",
      status: "Current",
      avatarBg: "bg-violet-100",
      avatarText: "text-violet-700",
      statusClass: "bg-emerald-100 text-emerald-700",
    },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-5 border-b border-slate-200 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Supplier Directory
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            View and manage all registered suppliers.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              placeholder="Search suppliers..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white sm:w-72"
            />
          </div>

          <button className="flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-medium text-white transition hover:bg-blue-700">
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
              <th className="px-6 py-4 text-left font-semibold">
                Supplier
              </th>

              <th className="px-6 py-4 text-left font-semibold">
                Contact
              </th>

              <th className="px-6 py-4 text-right font-semibold">
                Outstanding
              </th>

              <th className="px-6 py-4 text-center font-semibold">
                Status
              </th>

              <th className="px-6 py-4 text-center font-semibold">
                Action
              </th>
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