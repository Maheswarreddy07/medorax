import {
  AlertTriangle,
  BadgeCheck,
  Building2,
  CalendarX,
  Clock,
  Pill,
  ShoppingBag,
  TrendingDown,
  TrendingUp,
  Users,
  Wallet,
  XCircle,
} from "lucide-react";
import { kpiSummary } from "../../../data/pharmacySettings/pharmacySettingsData";

const iconMap = {
  payments: Wallet,
  wallet: Wallet,
  "shopping-bag": ShoppingBag,
  users: Users,
  pill: Pill,
  "alert-triangle": AlertTriangle,
  "x-circle": XCircle,
  "building-2": Building2,
  clock: Clock,
  "calendar-x": CalendarX,
  "badge-check": BadgeCheck,
};

const KpiCard = ({ label, value, icon, trend, accent }) => {
  const Icon = iconMap[icon] ?? Wallet;
  const TrendIcon = trend?.direction === "up" ? TrendingUp : TrendingDown;
  const isAccentError = accent === "error";

  return (
    <div
      className={`rounded-xl border border-outline-variant bg-surface-container-lowest p-4 transition-shadow hover:shadow-md ${
        isAccentError ? "border-l-4 border-l-error" : accent ? "border-l-4 border-l-primary" : ""
      }`}
    >
      <div className="mb-2 flex items-center justify-between">
        <Icon size={20} className={isAccentError ? "text-error" : "text-primary"} />
        {trend && (
          <span
            className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold ${
              trend.direction === "up"
                ? "bg-secondary-container text-on-secondary-fixed-variant"
                : "bg-error-container text-on-error-container"
            }`}
          >
            <TrendIcon size={12} />
            {trend.value}
          </span>
        )}
      </div>
      <p className="text-xs font-semibold uppercase tracking-wide text-on-surface-variant">
        {label}
      </p>
      <h3 className="mt-1 text-2xl font-bold text-on-background">{value}</h3>
    </div>
  );
};

const KpiCards = () => {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
      {kpiSummary.map((metric) => (
        <KpiCard key={metric.id} {...metric} />
      ))}
    </section>
  );
};

export default KpiCards;