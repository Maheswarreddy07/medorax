import {
  Bell,
  Search,
  ChevronDown,
} from "lucide-react";

const Topbar = () => {
  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8 shadow-sm">
      {/* Search */}
      <div className="w-full max-w-lg">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search suppliers, orders..."
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-700 placeholder:text-slate-400 transition-all duration-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="ml-8 flex items-center gap-5">
     

        {/* Divider */}
        <div className="h-8 w-px bg-slate-200"></div>

        {/* User */}
        <button className="flex items-center gap-3 rounded-xl px-2 py-1 transition hover:bg-slate-50">
          <img
            src="https://i.pravatar.cc/100?img=12"
            alt="Profile"
            className="h-11 w-11 rounded-full object-cover ring-2 ring-slate-200"
          />

          <div className="hidden text-left lg:block">
            <p className="text-sm font-semibold text-slate-800">
              Admin User
            </p>

            <p className="text-xs text-slate-500">
              Administrator
            </p>
          </div>

          <ChevronDown
            size={18}
            className="hidden text-slate-500 lg:block"
          />
        </button>
      </div>
    </header>
  );
};

export default Topbar;