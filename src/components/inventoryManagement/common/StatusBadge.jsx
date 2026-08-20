const variantStyles = {
  success: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  warning: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  danger: "bg-rose-50 text-rose-700 ring-1 ring-rose-200",
  info: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
  neutral: "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
};

const StatusBadge = ({ status, variant = "neutral", className = "" }) => {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${variantStyles[variant]} ${className}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
