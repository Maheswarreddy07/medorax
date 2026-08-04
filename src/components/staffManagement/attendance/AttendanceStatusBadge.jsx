import { CheckCircle2, Clock4, XCircle } from "lucide-react";

const STATUS_STYLES = {
  Present: {
    badgeClass: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    icon: CheckCircle2,
    iconClass: "text-emerald-500"
  },
  Late: {
    badgeClass: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    icon: Clock4,
    iconClass: "text-amber-500"
  },
  Absent: {
    badgeClass: "bg-rose-50 text-rose-700 ring-1 ring-rose-200",
    icon: XCircle,
    iconClass: "text-rose-500"
  }
};

const AttendanceStatusBadge = ({ status }) => {
  const style = STATUS_STYLES[status] || {
    badgeClass: "bg-slate-50 text-slate-600 ring-1 ring-slate-200",
    icon: null,
    iconClass: "text-slate-400"
  };
  const Icon = style.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${style.badgeClass}`}
    >
      {Icon && <Icon size={13} className={style.iconClass} />}
      {status}
    </span>
  );
};

export default AttendanceStatusBadge;