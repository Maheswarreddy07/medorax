import { Link } from "react-router-dom";
import { ArrowLeft, Pencil, Star } from "lucide-react";

const STATUS_STYLES = {
  Active: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  "Pending Review": "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  Inactive: "bg-slate-100 text-slate-600 ring-1 ring-slate-200"
};

const SupplierProfileHeader = ({ supplier, onEditClick }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <Link
            to="/suppliers"
            className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Back to suppliers"
          >
            <ArrowLeft size={18} />
          </Link>

          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-teal-50 text-2xl font-bold text-blue-700 ring-1 ring-blue-100">
            {supplier.name.charAt(0)}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                {supplier.name}
              </h1>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[supplier.status] || STATUS_STYLES.Inactive}`}
              >
                {supplier.status}
              </span>
            </div>

            <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
              <span className="font-mono text-xs text-slate-400">
                {supplier.code}
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
                {supplier.category}
              </span>
              <span className="inline-flex items-center gap-1 text-amber-600">
                <Star size={14} className="fill-amber-400 text-amber-400" />
                <span className="font-semibold text-slate-700">
                  {supplier.rating}
                </span>
                <span className="text-xs text-slate-400">/ 5.0</span>
              </span>
            </div>

            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
              {supplier.description}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 lg:flex-col lg:items-stretch">
          <button
            onClick={onEditClick}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <Pencil size={16} />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupplierProfileHeader;