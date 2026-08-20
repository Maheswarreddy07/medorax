// Shared KPI stat card used across all inventory pages
const StatCard = ({ title, value, subtitle, footerIcon, footerText, footerClass = "text-slate-500" }) => {
  const FooterIcon = footerIcon;
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="absolute inset-y-0 left-0 w-1 bg-linear-to-b from-[#0F52BA] to-[#13B8A7]" />
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        {title}
      </p>
      <h3 className="mt-2 text-[28px] font-bold leading-9 text-slate-900">
        {value}
      </h3>
      {(footerText || FooterIcon) && (
        <div className={`mt-4 flex items-center gap-1.5 text-xs font-medium ${footerClass}`}>
          {FooterIcon && <FooterIcon size={14} strokeWidth={2.5} />}
          <span>{footerText}</span>
        </div>
      )}
      {subtitle && (
        <p className="mt-4 text-xs text-slate-400">{subtitle}</p>
      )}
    </div>
  );
};

export default StatCard;
