const SupplierRow = ({ supplier, index }) => {
  return (
    <tr
      className={`group border-b border-[#E2E8F0] transition-colors hover:bg-[#F8FCFF]/50 ${
        index % 2 !== 0 ? "bg-[#F8FCFF]" : ""
      }`}
    >
      <td className="p-4">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full font-bold text-sm ${supplier.avatarBg} ${supplier.avatarText}`}
          >
            {supplier.initial}
          </div>

          <span className="font-medium">{supplier.name}</span>
        </div>
      </td>

      <td className="p-4 text-[#475569]">
        {supplier.contact}
      </td>

      <td className="p-4 text-right font-mono">
        {supplier.balance}
      </td>

      <td className="p-4 text-center">
        <span
          className={`inline-flex rounded-full px-2 py-1 text-[11px] font-medium ${supplier.statusClass}`}
        >
          {supplier.status}
        </span>
      </td>

      <td className="p-4 text-right">
        <button className="text-sm font-medium text-[#2563EB] opacity-0 transition-opacity group-hover:opacity-100 hover:text-blue-700">
          View Details
        </button>
      </td>
    </tr>
  );
};

export default SupplierRow;