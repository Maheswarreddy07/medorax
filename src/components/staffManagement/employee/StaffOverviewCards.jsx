import { Clock, CalendarDays, FileText, Award } from "lucide-react";

const StaffOverviewCards = ({ staff }) => {
  const cards = [
    {
      id: 1,
      title: "Years of Service",
      value: staff.yearsOfService,
      icon: Clock,
      iconBg: "bg-gradient-to-br from-blue-50 to-cyan-50",
      iconColor: "text-blue-600",
      accentBar: "from-blue-400 to-cyan-400",
      glow: "from-blue-100/40"
    },
    {
      id: 2,
      title: "Certifications",
      value: staff.certifications,
      icon: Award,
      iconBg: "bg-gradient-to-br from-emerald-50 to-teal-50",
      iconColor: "text-emerald-600",
      accentBar: "from-emerald-400 to-teal-400",
      glow: "from-emerald-100/40"
    },
    {
      id: 3,
      title: "Last Shift",
      value: staff.lastShift,
      icon: CalendarDays,
      iconBg: "bg-gradient-to-br from-violet-50 to-purple-50",
      iconColor: "text-violet-600",
      accentBar: "from-violet-400 to-purple-400",
      glow: "from-violet-100/40"
    },
    {
      id: 4,
      title: "Documents",
      value: staff.documents,
      icon: FileText,
      iconBg: "bg-gradient-to-br from-amber-50 to-orange-50",
      iconColor: "text-amber-600",
      accentBar: "from-amber-400 to-orange-400",
      glow: "from-amber-100/40"
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.id}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-100/40"
          >
            {/* Top accent bar */}
            <div
              className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${card.accentBar}`}
            />

            {/* Decorative glow */}
            <div
              className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${card.glow} to-transparent blur-2xl transition-opacity duration-300 opacity-60 group-hover:opacity-100`}
            />

            <div className="relative z-10 flex items-start justify-between">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl shadow-sm ${card.iconBg}`}
              >
                <Icon className={`h-5 w-5 ${card.iconColor}`} strokeWidth={2} />
              </div>
            </div>

            <div className="relative z-10 mt-4">
              <p className="mb-1 text-sm font-medium text-slate-500">
                {card.title}
              </p>
              <h3 className="text-2xl font-bold text-slate-900">
                {card.value}
              </h3>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StaffOverviewCards;
