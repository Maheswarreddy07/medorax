import {
  Landmark,
  Building2,
  Truck,
  ArrowUp,
  CheckCircle2,
  TrendingUp
} from "lucide-react";

const KpiCards = () => {
  const cards = [
    {
      id: 1,
      title: "Total Outstanding Balance",
      value: "$1.24M",
      icon: Landmark,
      iconBg: "bg-gradient-to-br from-red-50 to-rose-50",
      iconColor: "text-[#BA1A1A]",
      badge: "2.4%",
      badgeIcon: ArrowUp,
      badgeBg: "bg-red-50",
      badgeColor: "text-[#BA1A1A]",
      accentBar: "from-red-400 to-rose-400",
      glow: "from-red-100/40"
    },
    {
      id: 2,
      title: "Active Suppliers",
      value: "142",
      icon: Building2,
      iconBg: "bg-gradient-to-br from-emerald-50 to-teal-50",
      iconColor: "text-[#006B5F]",
      badge: "Stable",
      badgeIcon: CheckCircle2,
      badgeBg: "bg-emerald-50",
      badgeColor: "text-[#006B5F]",
      accentBar: "from-emerald-400 to-teal-400",
      glow: "from-emerald-100/40"
    },
    {
      id: 3,
      title: "Pending Deliveries (Next 7 Days)",
      value: "38",
      icon: Truck,
      iconBg: "bg-gradient-to-br from-blue-50 to-cyan-50",
      iconColor: "text-[#2563EB]",
      badge: "On Track",
      badgeIcon: TrendingUp,
      badgeBg: "bg-blue-50",
      badgeColor: "text-[#2563EB]",
      accentBar: "from-blue-400 to-cyan-400",
      glow: "from-blue-100/40",
      accent: true
    }
  ];

  return (
    <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;
        const BadgeIcon = card.badgeIcon;

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

            <div className="relative z-10 mb-4 flex items-start justify-between">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl shadow-sm ${card.iconBg}`}
              >
                <Icon className={`h-5 w-5 ${card.iconColor}`} strokeWidth={2} />
              </div>

              <span
                className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${card.badgeBg} ${card.badgeColor}`}
              >
                <BadgeIcon className="h-3.5 w-3.5" strokeWidth={2.5} />
                {card.badge}
              </span>
            </div>

            <div className="relative z-10">
              <p className="mb-1 text-sm font-medium text-slate-500">
                {card.title}
              </p>

              <h3 className="text-[32px] font-bold leading-10 text-slate-900">
                {card.value}
              </h3>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KpiCards;
