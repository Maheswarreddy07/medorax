import { NavLink } from "react-router-dom";

const stockTabs = [
  { to: "/inventory", label: "Current Stock", end: true },
  { to: "/inventory/opening", label: "Opening Stock" },
  { to: "/inventory/closing", label: "Closing Stock" },
  { to: "/inventory/available", label: "Available Stock" },
  { to: "/inventory/reserved", label: "Reserved Stock" },
];

const StockTabs = () => {
  return (
    <div className="mb-6 overflow-x-auto border-b border-slate-200 bg-white">
      <div className="flex gap-6 whitespace-nowrap px-6 py-3">
        {stockTabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.end}
            className={({ isActive }) =>
              `relative pb-2 text-sm font-semibold transition-colors ${
                isActive
                  ? "text-[#0F52BA]"
                  : "text-slate-500 hover:text-slate-800"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {tab.label}
                {isActive && (
                  <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-linear-to-r from-[#0F52BA] to-[#13B8A7]" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default StockTabs;