import {
  Banknote,
  CreditCard,
  QrCode,
  ArrowRight,
} from "lucide-react";

const paymentMethods = [
  { id: "cash", label: "Cash", icon: Banknote },
  { id: "card", label: "Card", icon: CreditCard },
  { id: "upi", label: "UPI", icon: QrCode },
];

const CartSummary = ({ subtotal, tax, discount, total, onPay }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900">Billing Summary</h3>
      </div>

      <div className="space-y-4 p-6">
        <div className="flex justify-between text-sm text-slate-600">
          <span>Subtotal</span>
          <span className="font-semibold text-slate-900">
            ${subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-sm text-slate-600">
          <span>Discount</span>
          <span className="font-semibold text-emerald-600">
            -${discount.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-sm text-slate-600">
          <span>Tax (GST)</span>
          <span className="font-semibold text-slate-900">${tax.toFixed(2)}</span>
        </div>

        <div className="flex items-center justify-between border-t border-slate-200 pt-4">
          <span className="text-base font-semibold text-slate-900">
            Grand Total
          </span>
          <span className="text-2xl font-bold text-[#0F52BA]">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="px-6">
        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
          Payment Method
        </p>
        <div className="grid grid-cols-3 gap-2 rounded-lg bg-slate-100 p-1">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            return (
              <button
                key={method.id}
                type="button"
                className="flex flex-col items-center gap-1 rounded-md px-2 py-3 text-xs font-semibold text-slate-600 transition hover:bg-white hover:text-[#0F52BA] hover:shadow-sm"
              >
                <Icon size={18} />
                {method.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-6">
        <button
          type="button"
          onClick={onPay}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-linear-to-br from-[#0F52BA] via-[#14B8A6] to-[#10B981] py-4 text-base font-bold text-white shadow-lg transition-transform duration-200 hover:scale-[1.02] active:scale-95"
        >
          <span>Pay Now</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default CartSummary;