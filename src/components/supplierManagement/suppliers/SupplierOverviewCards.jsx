import {
  Landmark,
  ShoppingCart,
  CalendarClock,
  FileText
} from "lucide-react";

const SupplierOverviewCards = ({ supplier }) => {
  const cards = [
    {
      id: "balance",
      title: "Outstanding Balance",
      value: supplier.balance,
      icon: Landmark,
      iconBg: "bg-[#FDECEC]",
      iconColor: "text-[#BA1A1A]",
      sublabel: "Total payable to supplier"
    },
    {
      id: "orders",
      title: "Total Orders",
      value: supplier.totalOrders,
      icon: ShoppingCart,
      iconBg: "bg-[#DBEAFE]",
      iconColor: "text-[#2563EB]",
      sublabel: "All-time purchase orders"
    },
    {
      id: "lastOrder",
      title: "Last Order Date",
      value: supplier.lastOrderDate,
      icon: CalendarClock,
      iconBg: "bg-[#DFF8F3]",
      iconColor: "text-[#006B5F]",
      sublabel: "Most recent purchase"
    },
    {
      id: "paymentTerms",
      title: "Payment Terms",
      value: supplier.paymentTerms,
      icon: FileText,
      iconBg: "bg-[#FEF3C7]",
      iconColor: "text-[#B45309]",
      sublabel: "Agreed settlement terms"
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.id}
            className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:shadow-md"
          >
            <div className="mb-4 flex items-start justify-between">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.iconBg}`}
              >
                <Icon className={`h-5 w-5 ${card.iconColor}`} strokeWidth={2} />
              </div>
            </div>

            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
              {card.title}
            </p>
            <p className="mt-1 text-xl font-bold text-slate-900">
              {card.value}
            </p>
            <p className="mt-1 text-xs text-slate-500">{card.sublabel}</p>
          </div>
        );
      })}
    </div>
  );
};

export default SupplierOverviewCards;