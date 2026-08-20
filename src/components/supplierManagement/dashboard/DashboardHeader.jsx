import { LayoutDashboard, TrendingUp, Activity, ShieldCheck } from "lucide-react";

const DashboardHeader = () => {
  return (
    <div className="relative mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      {/* Decorative gradient blobs */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-blue-200/30 to-teal-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-gradient-to-br from-emerald-200/20 to-cyan-200/20 blur-3xl" />

      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-teal-500 shadow-lg shadow-blue-200/50">
            <LayoutDashboard size={24} className="text-white" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Supplier Overview
              </h2>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
                <ShieldCheck size={12} />
                Live
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              Manage and monitor all active supplier relationships and outstanding balances.
            </p>
            <div className="mt-3 flex items-center gap-4 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <TrendingUp size={13} className="text-blue-500" />
                <span className="font-semibold text-slate-600">$1.24M</span> Outstanding
              </span>
              <span className="h-3 w-px bg-slate-200" />
              <span className="inline-flex items-center gap-1.5">
                <Activity size={13} className="text-emerald-500" />
                <span className="font-semibold text-emerald-600">142</span> Active Suppliers
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
