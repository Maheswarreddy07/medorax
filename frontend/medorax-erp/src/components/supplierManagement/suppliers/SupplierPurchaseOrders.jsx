import { Package, ArrowUpRight } from "lucide-react";

const ORDER_STATUS_STYLES = {
  Delivered: "bg-secondary-container text-on-secondary-fixed-variant ring-1 ring-secondary-fixed-dim",
  Processing: "bg-tertiary-fixed text-on-tertiary-fixed-variant ring-1 ring-tertiary-fixed-dim",
  Shipped: "bg-primary-fixed text-primary ring-1 ring-primary-fixed-dim",
  Pending: "bg-surface-container text-on-surface-variant ring-1 ring-outline-variant"
};

const SupplierPurchaseOrders = ({ supplier }) => {
  const purchaseOrders = [
    {
      id: "PO-2026-0841",
      date: "2026-07-28",
      items: "API Compounds, Vaccines",
      amount: "$128,450.00",
      status: "Delivered"
    },
    {
      id: "PO-2026-0792",
      date: "2026-07-15",
      items: "Clinical Reagents",
      amount: "$64,200.00",
      status: "Shipped"
    },
    {
      id: "PO-2026-0718",
      date: "2026-06-30",
      items: "Lab Consumables",
      amount: "$32,800.00",
      status: "Processing"
    },
    {
      id: "PO-2026-0654",
      date: "2026-06-12",
      items: "Diagnostic Kits",
      amount: "$18,750.00",
      status: "Delivered"
    }
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-lowest shadow-sm">
      <div className="flex items-center justify-between border-b border-outline-variant px-6 py-5">
        <div>
          <h2 className="text-base font-bold text-on-background">
            Recent Purchase Orders
          </h2>
          <p className="mt-0.5 text-sm text-on-surface-variant">
            Latest transactions with {supplier.name}
          </p>
        </div>

        <button className="inline-flex items-center gap-1.5 rounded-lg border border-outline-variant bg-surface-container-low px-3 py-1.5 text-xs font-semibold text-on-surface-variant transition hover:bg-surface-container hover:text-on-background">
          <Package size={14} />
          <span>View All</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-surface-container-low">
            <tr className="text-xs text-on-surface-variant">
              <th className="px-6 py-3.5 text-left font-semibold">Order ID</th>
              <th className="px-6 py-3.5 text-left font-semibold">Date</th>
              <th className="px-6 py-3.5 text-left font-semibold">Items</th>
              <th className="px-6 py-3.5 text-right font-semibold">Amount</th>
              <th className="px-6 py-3.5 text-center font-semibold">Status</th>
              <th className="px-6 py-3.5 text-right font-semibold">Action</th>
            </tr>
          </thead>

          <tbody>
            {purchaseOrders.map((order) => (
              <tr
                key={order.id}
                className="group border-b border-slate-100 transition-colors last:border-b-0 hover:bg-[#F8FCFF]/60"
              >
                <td className="px-6 py-4 font-mono text-xs font-semibold text-primary">
                  {order.id}
                </td>
                <td className="px-6 py-4 text-sm text-on-surface-variant">{order.date}</td>
                <td className="px-6 py-4 text-sm text-on-surface-variant">{order.items}</td>
                <td className="px-6 py-4 text-right font-mono text-sm font-semibold text-on-background">
                  {order.amount}
                </td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      ORDER_STATUS_STYLES[order.status] || ORDER_STATUS_STYLES.Pending
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="inline-flex items-center gap-1 text-xs font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100 hover:text-primary">
                    <span>Details</span>
                    <ArrowUpRight size={13} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupplierPurchaseOrders;
