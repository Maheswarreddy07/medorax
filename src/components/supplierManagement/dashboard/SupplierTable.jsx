import SupplierRow from "./SupplierRow";

const SupplierTable = () => {
  // Temporary hardcoded data
  const suppliers = [
    {
      id: 1,
      initial: "P",
      name: "PharmaCorp Global",
      contact: "Dr. Sarah Jenkins",
      balance: "$450,230.00",
      status: "Overdue",
      avatarBg: "bg-blue-100",
      avatarText: "text-blue-700",
      statusClass: "bg-red-100 text-red-700",
    },
    {
      id: 2,
      initial: "M",
      name: "MediEquip Supplies",
      contact: "James Chen",
      balance: "$12,450.50",
      status: "Current",
      avatarBg: "bg-emerald-100",
      avatarText: "text-emerald-700",
      statusClass: "bg-emerald-100 text-emerald-700",
    },
    {
      id: 3,
      initial: "B",
      name: "BioGenetics Lab",
      contact: "Amanda Torres",
      balance: "$85,900.00",
      status: "Processing",
      avatarBg: "bg-cyan-100",
      avatarText: "text-cyan-700",
      statusClass:
        "border border-[#E2E8F0] bg-white text-[#0F172A]",
    },
    {
      id: 4,
      initial: "N",
      name: "Novanet Health",
      contact: "Michael Ross",
      balance: "$0.00",
      status: "Current",
      avatarBg: "bg-blue-100",
      avatarText: "text-blue-700",
      statusClass: "bg-emerald-100 text-emerald-700",
    },
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-[#E2E8F0] bg-white">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-[#E2E8F0] bg-[#F8FCFF] p-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-xl font-semibold text-[#0F172A]">
          Supplier Directory
        </h3>

        <div className="flex w-full items-center gap-2 sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] text-[20px]">
              filter_list
            </span>

            <input
              type="text"
              placeholder="Filter directory..."
              className="w-full rounded-md border border-[#E2E8F0] bg-white py-2 pl-10 pr-3 text-sm outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
            />
          </div>

          <button className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-[#2563EB] transition hover:border hover:border-[#2563EB] hover:bg-[#F8FCFF]">
            <span className="material-symbols-outlined text-[18px]">
              download
            </span>

            Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-[800px] w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-[#E2E8F0] bg-[#F8FCFF] text-sm text-[#475569]">
              <th className="p-4 font-semibold">Supplier Name</th>
              <th className="p-4 font-semibold">Contact Person</th>
              <th className="p-4 text-right font-semibold">
                Outstanding Balance
              </th>
              <th className="p-4 text-center font-semibold">
                Status
              </th>
              <th className="p-4 text-right font-semibold">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {suppliers.map((supplier, index) => (
              <SupplierRow
                key={supplier.id}
                supplier={supplier}
                index={index}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupplierTable;