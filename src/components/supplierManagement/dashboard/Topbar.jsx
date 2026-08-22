import {
  Search,
  ChevronDown,
} from "lucide-react";

const Topbar = () => {
  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-outline-variant bg-surface-container-lowest px-8 shadow-sm">
      {/* Search */}
      <div className="w-full max-w-lg">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-outline"
          />

          <input
            type="text"
            placeholder="Search suppliers, orders..."
            className="h-11 w-full rounded-xl border border-outline-variant bg-surface-container-low pl-11 pr-4 text-sm text-on-surface-variant placeholder:text-outline transition-all duration-200 focus:border-primary focus:bg-surface-container-lowest focus:outline-none focus:ring-4 focus:ring-primary/10"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="ml-8 flex items-center gap-5">
     

        {/* Divider */}
        <div className="h-8 w-px bg-surface-container-high"></div>

        {/* User */}
        <button className="flex items-center gap-3 rounded-xl px-2 py-1 transition hover:bg-surface-container-low">
          <img
            src="https://i.pravatar.cc/100?img=12"
            alt="Profile"
            className="h-11 w-11 rounded-full object-cover ring-2 ring-outline-variant"
          />

          <div className="hidden text-left lg:block">
            <p className="text-sm font-semibold text-on-background">
              Admin User
            </p>

            <p className="text-xs text-on-surface-variant">
              Administrator
            </p>
          </div>

          <ChevronDown
            size={18}
            className="hidden text-on-surface-variant lg:block"
          />
        </button>
      </div>
    </header>
  );
};

export default Topbar;