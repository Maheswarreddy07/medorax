import { Plus, Building2, Users, ShieldCheck } from "lucide-react";

const SupplierHeader = ({ onAddClick }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      {/* Decorative gradient blobs */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-blue-200/30 to-teal-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-gradient-to-br from-emerald-200/20 to-cyan-200/20 blur-3xl" />

      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-teal-500 shadow-lg shadow-blue-200/50">
            <Building2 size={24} className="text-white" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Supplier Management
              </h1>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
                <ShieldCheck size={12} />
                Verified
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              Browse, monitor, and manage your partner suppliers and vendor profiles.
            </p>
            <div className="mt-3 flex items-center gap-4 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <Users size={13} className="text-blue-500" />
                <span className="font-semibold text-slate-600">5</span> Suppliers
              </span>
              <span className="h-3 w-px bg-slate-200" />
              <span>
                <span className="font-semibold text-emerald-600">3</span> Active
              </span>
              <span className="h-3 w-px bg-slate-200" />
              <span>
                <span className="font-semibold text-amber-600">1</span> Pending
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={onAddClick}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-200/50 transition-all duration-200 hover:shadow-lg hover:shadow-blue-300/50 hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        >
          <Plus size={18} />
          <span>Add New Supplier</span>
        </button>
      </div>
    </div>
  );
};

export default SupplierHeader;
