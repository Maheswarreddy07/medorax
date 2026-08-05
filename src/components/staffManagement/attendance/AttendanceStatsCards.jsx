import { UserCheck, Clock, AlertTriangle } from "lucide-react";

const STATS = [
  {
    label: "Attendance Rate",
    value: "94.2%",
    icon: UserCheck,
    iconClass: "bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-lg shadow-emerald-200",
    accentClass: "text-emerald-600",
    barClass: "bg-gradient-to-r from-emerald-400 to-teal-500"
  },
  {
    label: "Average Check-in",
    value: "08:12 AM",
    icon: Clock,
    iconClass: "bg-gradient-to-br from-blue-400 to-indigo-500 text-white shadow-lg shadow-blue-200",
    accentClass: "text-blue-600",
    barClass: "bg-gradient-to-r from-blue-400 to-indigo-500"
  },
  {
    label: "Today's Absence",
    value: "08 Staff",
    icon: AlertTriangle,
    iconClass: "bg-gradient-to-br from-rose-400 to-red-500 text-white shadow-lg shadow-rose-200",
    accentClass: "text-rose-600",
    barClass: "bg-gradient-to-r from-rose-400 to-red-500"
  }
];

const AttendanceStatsCards = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {STATS.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-blue-50 to-teal-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="relative flex items-center gap-4">
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${stat.iconClass}`}
              >
                <Icon size={26} strokeWidth={2.2} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {stat.label}
                </p>
                <h4 className={`text-2xl font-bold ${stat.accentClass}`}>
                  {stat.value}
                </h4>
              </div>
            </div>

            <div className="relative mt-4 h-1 w-full overflow-hidden rounded-full bg-slate-100">
              <div className={`h-full w-3/4 rounded-full ${stat.barClass}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AttendanceStatsCards;