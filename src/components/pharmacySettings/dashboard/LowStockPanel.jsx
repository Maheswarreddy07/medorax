import { TriangleAlert } from "lucide-react";
import { lowStockAlerts } from "../../../data/pharmacySettings/pharmacySettingsData";

const LowStockPanel = () => (
  <div className="overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest shadow-sm">
    <div className="flex items-center gap-2 border-b border-error/10 bg-error/5 p-4 text-sm font-bold text-error">
      <TriangleAlert size={18} />
      Critical Inventory
    </div>
    <div className="space-y-4 p-4">
      {lowStockAlerts.map(({ medicine, location, quantity }) => (
        <div key={medicine} className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-on-background">{medicine}</p>
            <p className="text-[10px] uppercase tracking-wide text-on-surface-variant">
              {location} • <span className="font-bold text-error">{quantity} left</span>
            </p>
          </div>
          <button
            type="button"
            className="rounded-lg bg-primary px-3 py-1.5 text-[10px] font-bold uppercase text-on-primary shadow-sm transition-colors hover:bg-primary-container"
          >
            Restock
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default LowStockPanel;