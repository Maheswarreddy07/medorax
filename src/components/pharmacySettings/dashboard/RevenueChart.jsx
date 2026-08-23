import { useState } from "react";
import { revenueOverview } from "../../../data/pharmacySettings/pharmacySettingsData";

const RevenueChart = () => {
  const [activePeriod, setActivePeriod] = useState("Monthly");

  return (
    <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h4 className="text-xl font-semibold text-on-background">
          Revenue & Orders Overview
        </h4>
        <div className="flex items-center rounded-lg border border-outline-variant bg-surface-container-low p-1">
          {revenueOverview.periods.map((period) => (
            <button
              key={period}
              type="button"
              onClick={() => setActivePeriod(period)}
              aria-pressed={period === activePeriod}
              className={`rounded-md px-4 py-1 text-xs font-bold transition-colors ${
                period === activePeriod
                  ? "bg-surface-container-lowest text-primary shadow-sm ring-1 ring-outline-variant"
                  : "text-on-surface-variant hover:text-primary"
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      <div className="flex h-[280px] items-end gap-3 px-2">
        {revenueOverview.bars.map((height, index) => (
          <div
            key={`${activePeriod}-${index}`}
            style={{ height: `${height}%` }}
            className={`flex-1 rounded-t bg-primary transition-opacity hover:opacity-100 ${
              height >= 85 ? "opacity-90" : "opacity-40"
            }`}
          />
        ))}
      </div>

      <div className="flex items-center justify-center gap-8 pt-4">
        <span className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant">
          <span className="h-3 w-3 rounded-full bg-primary" /> Revenue
        </span>
        <span className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant">
          <span className="h-3 w-3 rounded-full bg-outline" /> Profit Margin
        </span>
      </div>
    </div>
  );
};

export default RevenueChart;