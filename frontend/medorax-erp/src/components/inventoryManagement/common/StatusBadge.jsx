const variantStyles = {
  success: "bg-green-100 text-green-800 ring-1 ring-green-300",
  danger: "bg-red-100 text-red-800 ring-1 ring-red-300",
  warning: "bg-amber-100 text-amber-800 ring-1 ring-amber-300",
  info: "bg-blue-100 text-blue-800 ring-1 ring-blue-300",
  neutral: "bg-gray-100 text-gray-700 ring-1 ring-gray-300",
};

const StatusBadge = ({ status, variant, className = "" }) => {
  const normalizedStatus = String(status || "")
    .toLowerCase()
    .replaceAll("_", " ");

  let inferredVariant = variant;

  if (
    normalizedStatus.includes("out of stock") ||
    normalizedStatus.includes("expired") ||
    normalizedStatus.includes("critical") ||
    normalizedStatus.includes("mismatch") ||
    normalizedStatus.includes("rejected") ||
    normalizedStatus.includes("stock out") ||
    normalizedStatus.includes("damaged") ||
    normalizedStatus.includes("disposed") ||
    normalizedStatus.includes("deduction")
  ) {
    inferredVariant = "danger";
  } else if (
    normalizedStatus.includes("available") ||
    normalizedStatus.includes("in stock") ||
    normalizedStatus.includes("completed") ||
    normalizedStatus.includes("matched") ||
    normalizedStatus.includes("stock in") ||
    normalizedStatus.includes("added") ||
    normalizedStatus.includes("addition") ||
    normalizedStatus.includes("restock") ||
    normalizedStatus.includes("confirmed") ||
    normalizedStatus.includes("approved")
  ) {
    inferredVariant = "success";
  } else if (
    normalizedStatus.includes("adjustment") ||
    normalizedStatus.includes("adjusted") ||
    normalizedStatus.includes("transfer") ||
    normalizedStatus.includes("transferred")
  ) {
    inferredVariant = "info";
  } else if (
    normalizedStatus.includes("reorder") ||
    normalizedStatus.includes("pending") ||
    normalizedStatus.includes("in transit") ||
    normalizedStatus.includes("near expiry") ||
    normalizedStatus.includes("reserved") ||
    normalizedStatus.includes("under review") ||
    normalizedStatus.includes("urgent")
  ) {
    inferredVariant = "warning";
  } else if (!inferredVariant) {
    inferredVariant = "neutral";
  }

  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${
        variantStyles[inferredVariant] || variantStyles.neutral
      } ${className}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
