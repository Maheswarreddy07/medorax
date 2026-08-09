import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  Calendar,
  Edit,
  Star,
  ArrowUpRight,
  Shield,
  Stethoscope
} from "lucide-react";

const ROLE_STYLES = {
  "Doctor": {
    avatarBg: "bg-gradient-to-br from-blue-500 to-cyan-400",
    chipBg: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
    accentBar: "from-blue-500 to-cyan-400",
    iconColor: "text-blue-600",
    roleIcon: Stethoscope
  },
  "Nurse": {
    avatarBg: "bg-gradient-to-br from-emerald-500 to-teal-400",
    chipBg: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    accentBar: "from-emerald-500 to-teal-400",
    iconColor: "text-emerald-600",
    roleIcon: Shield
  },
  "Administrator": {
    avatarBg: "bg-gradient-to-br from-violet-500 to-purple-400",
    chipBg: "bg-violet-50 text-violet-700 ring-1 ring-violet-200",
    accentBar: "from-violet-500 to-purple-400",
    iconColor: "text-violet-600",
    roleIcon: Shield
  },
  "Technician": {
    avatarBg: "bg-gradient-to-br from-amber-500 to-orange-400",
    chipBg: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    accentBar: "from-amber-500 to-orange-400",
    iconColor: "text-amber-600",
    roleIcon: Shield
  }
};

const STATUS_STYLES = {
  Active: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  "On Leave": "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  Inactive: "bg-slate-100 text-slate-600 ring-1 ring-slate-200"
};

const STATUS_DOT = {
  Active: "bg-emerald-500",
  "On Leave": "bg-amber-500",
  Inactive: "bg-slate-400"
};

const StaffCard = ({ staff, onEditClick }) => {
  const roleStyle =
    ROLE_STYLES[staff.role] || ROLE_STYLES.Doctor;
  const RoleIcon = roleStyle.roleIcon;

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-100/50">
      {/* Top accent bar */}
      <div
        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${roleStyle.accentBar}`}
      />

      {/* Decorative background glow */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-blue-100/40 to-teal-100/40 blur-2xl transition-opacity duration-300 opacity-60 group-hover:opacity-100" />

      <div className="relative p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold text-white shadow-md ${roleStyle.avatarBg}`}
            >
              {staff.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-slate-900 transition group-hover:text-blue-600">
                {staff.name}
              </h3>
              <p className="font-mono text-xs text-slate-400">{staff.code}</p>
            </div>
          </div>

          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
              STATUS_STYLES[staff.status] || STATUS_STYLES.Inactive
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                STATUS_DOT[staff.status] || STATUS_DOT.Inactive
              }`}
            />
            {staff.status}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span
            className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold ${roleStyle.chipBg}`}
          >
            <RoleIcon size={12} className={roleStyle.iconColor} />
            {staff.role}
          </span>

          <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600">
            <Star size={13} className="fill-amber-400 text-amber-400" />
            {staff.rating}
          </span>
        </div>

        <div className="mt-4 space-y-2.5 text-xs text-slate-600">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-50 ring-1 ring-slate-100">
              <Mail size={13} className="text-slate-500" />
            </div>
            <span className="truncate">{staff.email}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-50 ring-1 ring-slate-100">
              <Phone size={13} className="text-slate-500" />
            </div>
            <span>{staff.phone}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-50 ring-1 ring-slate-100">
              <Calendar size={13} className="text-slate-500" />
            </div>
            <span>
              <span className="font-medium text-slate-700">Department:</span>{" "}
              {staff.department}
            </span>
          </div>
        </div>
      </div>

      <div className="relative mt-2 flex items-center justify-between gap-2 border-t border-slate-100 bg-slate-50/50 px-5 py-4">
        <div>
          <span className="block text-[11px] font-medium uppercase tracking-wider text-slate-400">
            License
          </span>
          <span className="font-mono text-sm font-bold text-slate-800">
            {staff.license}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/staff/${staff.id}`}
            className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-teal-500 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition hover:opacity-95 hover:shadow-md"
          >
            <span>Profile</span>
            <ArrowUpRight size={12} className="opacity-70" />
          </Link>

          <button
            onClick={() => onEditClick(staff)}
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

export default StaffCard;