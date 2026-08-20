import { Search, RefreshCw, Download, Plus } from "lucide-react";

const FilterBar = ({
  searchPlaceholder = "Search by Name, SKU, or Code...",
  categories = [],
  warehouses = [],
  actionLabel = "Add",
  actionIcon: ActionIcon = Plus,
  onAction,
  showExport = true,
}) => {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
      <div className="relative w-full md:w-auto md:flex-1">
        <Search
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          placeholder={searchPlaceholder}
          className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
        {categories.length > 0 && (
          <select className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 md:w-44">
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        )}

        {warehouses.length > 0 && (
          <select className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 md:w-44">
            <option value="">All Warehouses</option>
            {warehouses.map((warehouse) => (
              <option key={warehouse} value={warehouse}>
                {warehouse}
              </option>
            ))}
          </select>
        )}

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-blue-600"
          aria-label="Refresh"
        >
          <RefreshCw size={18} />
        </button>

        {showExport && (
          <button
            type="button"
            className="flex h-11 items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-4 text-sm font-medium text-blue-700 transition hover:bg-blue-50"
          >
            <Download size={17} />
            Export CSV
          </button>
        )}

        <button
          type="button"
          onClick={onAction}
          className="flex h-11 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#0F52BA] to-[#13B8A7] px-5 text-sm font-semibold text-white shadow-md shadow-blue-200/50 transition hover:opacity-95"
        >
          <ActionIcon size={17} />
          {actionLabel}
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
