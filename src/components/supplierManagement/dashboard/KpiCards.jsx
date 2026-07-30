import {
  Landmark,
  Building2,
  Truck,
  ArrowUp,
  CheckCircle2,
} from "lucide-react";

const KpiCards = () => {
  // Temporary hardcoded data
  const cards = [
    {
      id: 1,
      title: "Total Outstanding Balance",
      value: "$1.24M",
      icon: Landmark,
      iconBg: "bg-[#FDECEC]",
      iconColor: "text-[#BA1A1A]",
      badge: "2.4%",
      badgeIcon: ArrowUp,
      badgeBg: "bg-[#FDECEC]/30",
      badgeColor: "text-[#BA1A1A]",
    },
    {
      id: 2,
      title: "Active Suppliers",
      value: "142",
      icon: Building2,
      iconBg: "bg-[#DFF8F3]",
      iconColor: "text-[#006B5F]",
      badge: "Stable",
      badgeIcon: CheckCircle2,
      badgeBg: "bg-[#DFF8F3]/30",
      badgeColor: "text-[#006B5F]",
    },
    {
      id: 3,
      title: "Pending Deliveries (Next 7 Days)",
      value: "38",
      icon: Truck,
      iconBg: "bg-[#DBEAFE]",
      iconColor: "text-[#2563EB]",
      accent: true,
    },
  ];

  return (
    <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;
        const BadgeIcon = card.badgeIcon;

        return (
          <div
            key={card.id}
            className="relative overflow-hidden rounded-xl border border-[#E2E8F0] bg-white p-6"
          >
            {card.accent && (
              <div className="absolute right-[-20%] top-[-20%] h-[150px] w-[150px] rounded-full bg-[#2563EB]/5 blur-3xl" />
            )}

            <div className="relative z-10 mb-4 flex items-start justify-between">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-lg ${card.iconBg}`}
              >
                <Icon className={`h-5 w-5 ${card.iconColor}`} strokeWidth={2} />
              </div>

              {!card.accent && (
                <span
                  className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${card.badgeBg} ${card.badgeColor}`}
                >
                  <BadgeIcon className="h-3.5 w-3.5" strokeWidth={2.5} />
                  {card.badge}
                </span>
              )}
            </div>

            <div className="relative z-10">
              <p className="mb-1 text-sm text-[#475569]">
                {card.title}
              </p>

              <h3 className="text-[32px] font-bold leading-10 text-[#0F172A]">
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