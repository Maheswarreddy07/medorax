const KpiCards = () => {
  // Temporary hardcoded data
  const cards = [
    {
      id: 1,
      title: "Total Outstanding Balance",
      value: "$1.24M",
      icon: "account_balance",
      iconBg: "bg-[#FDECEC]",
      iconColor: "text-[#BA1A1A]",
      badge: "2.4%",
      badgeIcon: "arrow_upward",
      badgeBg: "bg-[#FDECEC]/30",
      badgeColor: "text-[#BA1A1A]",
    },
    {
      id: 2,
      title: "Active Suppliers",
      value: "142",
      icon: "domain",
      iconBg: "bg-[#DFF8F3]",
      iconColor: "text-[#006B5F]",
      badge: "Stable",
      badgeIcon: "check_circle",
      badgeBg: "bg-[#DFF8F3]/30",
      badgeColor: "text-[#006B5F]",
    },
    {
      id: 3,
      title: "Pending Deliveries (Next 7 Days)",
      value: "38",
      icon: "local_shipping",
      iconBg: "bg-[#DBEAFE]",
      iconColor: "text-[#2563EB]",
      accent: true,
    },
  ];

  return (
    <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.id}
          className="relative overflow-hidden rounded-xl border border-[#E2E8F0] bg-white p-6"
        >
          {card.accent && (
            <div className="absolute right-[-20%] top-[-20%] h-[150px] w-[150px] rounded-full bg-[#2563EB]/5 blur-3xl transition group-hover:bg-[#2563EB]/10" />
          )}

          <div className="relative z-10 flex items-start justify-between mb-4">
            <div
              className={`rounded-lg p-2 ${card.iconBg} ${card.iconColor}`}
            >
              <span className="material-symbols-outlined">
                {card.icon}
              </span>
            </div>

            {!card.accent && (
              <span
                className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${card.badgeBg} ${card.badgeColor}`}
              >
                <span className="material-symbols-outlined text-[14px]">
                  {card.badgeIcon}
                </span>

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
      ))}
    </div>
  );
};

export default KpiCards;