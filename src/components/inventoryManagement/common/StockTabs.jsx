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
    <div className="mb-6 overflow-x-auto border-b border-outline-variant bg-surface-container-lowest">
      <div className="flex gap-6 whitespace-nowrap px-6 py-3">
        {stockTabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.end}
            className={({ isActive }) =>
              `relative pb-2 text-sm font-semibold transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-on-surface-variant hover:text-on-background"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {tab.label}
                {isActive && (
                  <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" />
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