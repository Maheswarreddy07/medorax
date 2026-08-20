import { Link } from "react-router-dom";
import {
  Building2,
  Mail,
  Phone,
  Eye,
  Edit,
  Star,
  ArrowUpRight
} from "lucide-react";

const CATEGORY_STYLES = {
  Pharmaceuticals: {
    avatarBg: "bg-gradient-to-br from-blue-500 to-cyan-400",
    chipBg: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
    accentBar: "from-blue-500 to-cyan-400",
    iconColor: "text-blue-600"
  },
  "Medical Equipment": {
    avatarBg: "bg-gradient-to-br from-violet-500 to-purple-400",
    chipBg: "bg-violet-50 text-violet-700 ring-1 ring-violet-200",
    accentBar: "from-violet-500 to-purple-400",
    iconColor: "text-violet-600"
  },
  "Reagents & Kits": {
    avatarBg: "bg-gradient-to-br from-emerald-500 to-teal-400",
    chipBg: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    accentBar: "from-emerald-500 to-teal-400",
    iconColor: "text-emerald-600"
  },
  Consumables: {
    avatarBg: "bg-gradient-to-br from-amber-500 to-orange-400",
    chipBg: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    accentBar: "from-amber-500 to-orange-400",
    iconColor: "text-amber-600"
  }
};

const STATUS_STYLES = {
  Active: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  "Pending Review": "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  Inactive: "bg-slate-100 text-slate-600 ring-1 ring-slate-200"
};

const STATUS_DOT = {
  Active: "bg-emerald-500",
  "Pending Review": "bg-amber-500",
  Inactive: "bg-slate-400"
};

const SupplierCard = ({ supplier, onEditClick }) => {
  const categoryStyle =
    CATEGORY_STYLES[supplier.category] || CATEGORY_STYLES.Pharmaceuticals;

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-100/50">
      <div
        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${categoryStyle.accentBar}`}
      />

      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-blue-100/40 to-teal-100/40 blur-2xl transition-opacity duration-300 opacity-60 group-hover:opacity-100" />

      <div className="relative p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold text-white shadow-md ${categoryStyle.avatarBg}`}
            >
              {supplier.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-slate-900 transition group-hover:text-blue-600">
                {supplier.name}
              </h3>
              <p className="font-mono text-xs text-slate-400">{supplier.code}</p>
            </div>
          </div>

          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
              STATUS_STYLES[supplier.status] || STATUS_STYLES.Inactive
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                STATUS_DOT[supplier.status] || STATUS_DOT.Inactive
              }`}
            />
            {supplier.status}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span
            className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-semibold ${categoryStyle.chipBg}`}
          >
            {supplier.category}
          </span>

          <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600">
            <Star size={13} className="fill-amber-400 text-amber-400" />
            {supplier.rating}
          </span>
        </div>

        <div className="mt-4 space-y-2.5 text-xs text-slate-600">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-50 ring-1 ring-slate-100">
              <Building2 size={13} className={categoryStyle.iconColor} />
            </div>
            <span className="font-medium text-slate-700">
              {supplier.contactPerson}
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-50 ring-1 ring-slate-100">
              <Mail size={13} className="text-slate-500" />
            </div>
            <span className="truncate">{supplier.email}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-50 ring-1 ring-slate-100">
              <Phone size={13} className="text-slate-500" />
            </div>
            <span>{supplier.phone}</span>
          </div>
        </div>
      </div>

      <div className="relative mt-2 flex items-center justify-between gap-2 border-t border-slate-100 bg-slate-50/50 px-5 py-4">
        <div>
          <span className="block text-[11px] font-medium uppercase tracking-wider text-slate-400">
            Outstanding
          </span>
          <span className="font-mono text-sm font-bold text-slate-800">
            {supplier.balance}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/suppliers/${supplier.id}`}
            state={{ supplier }}
            className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-teal-500 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition hover:opacity-95 hover:shadow-md"
          >
            <Eye size={13} />
            <span>Profile</span>
            <ArrowUpRight size={12} className="opacity-70" />
          </Link>

          <button
            onClick={() => onEditClick(supplier)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
          >
            <Edit size={13} />
            <span>Manage</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupplierCard;
