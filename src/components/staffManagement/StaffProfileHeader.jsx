import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Edit,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Stethoscope,
  Star
} from "lucide-react";

const ROLE_ICONS = {
  Doctor: Stethoscope,
  Nurse: Shield,
  Administrator: Shield,
  Technician: Shield
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

const StaffProfileHeader = ({ staff, onEditClick }) => {
  const RoleIcon = ROLE_ICONS[staff.role] || Shield;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      {/* Decorative gradient blobs */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-blue-200/30 to-teal-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-gradient-to-br from-emerald-200/20 to-cyan-200/20 blur-3xl" />

      <div className="relative">
        {/* Back button */}
        <Link
          to="/staff"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-900"
        >
          <ArrowLeft size={16} />
          <span>Back to Staff Directory</span>
        </Link>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-teal-500 text-3xl font-bold text-white shadow-lg shadow-blue-200/50">
              {staff.name.charAt(0)}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  {staff.name}
                </h1>

                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                    STATUS_STYLES[staff.status] || STATUS_STYLES.Inactive
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      STATUS_DOT[staff.status] || STATUS_DOT.Inactive
                    }`}
                  />
                  {staff.status}
                </span>

                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700 ring-1 ring-amber-200">
                  <Star size={12} className="fill-amber-400 text-amber-400" />
                  {staff.rating}
                </span>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                  <RoleIcon size={14} className="text-blue-600" />
                  {staff.role}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-sm font-medium text-slate-600">
                  {staff.department}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="font-mono text-xs text-slate-500">
                  {staff.code}
                </span>
              </div>

              <p className="mt-3 max-w-2xl text-sm text-slate-500">
                {staff.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Mail size={13} className="text-blue-500" />
                  <span>{staff.email}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone size={13} className="text-blue-500" />
                  <span>{staff.phone}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-blue-500" />
                  <span>{staff.address}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-blue-500" />
                  <span>License: {staff.license}</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={onEditClick}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-200/50 transition hover:opacity-95 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <Edit size={16} />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffProfileHeader;
