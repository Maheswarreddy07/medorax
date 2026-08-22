import { Search, Bell, LogIn } from "lucide-react";

const Topbar = () => {
  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-outline-variant bg-surface-container-lowest px-8 shadow-sm">
      <div className="w-full max-w-lg">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-outline"
          />
          <input
            type="text"
            placeholder="Search orders, patients..."
            className="h-11 w-full rounded-xl border border-outline-variant bg-surface-container-low pl-11 pr-4 text-sm text-on-surface-variant placeholder:text-outline transition-all duration-200 focus:border-primary focus:bg-surface-container-lowest focus:outline-none focus:ring-4 focus:ring-primary/10"
          />
        </div>
      </div>

      <div className="ml-8 flex items-center gap-5">
        <button
          type="button"
          className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary shadow-md transition-transform duration-200 hover:scale-[1.02] active:scale-95"
        >
          <span className="flex items-center gap-2">
            <LogIn size={16} />
            Check In / Check Out
          </span>
        </button>

        <button
          type="button"
          className="relative rounded-full p-2 text-on-surface-variant transition hover:bg-surface-container"
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-error-container0 ring-2 ring-on-primary" />
        </button>

        <div className="h-8 w-px bg-surface-container-high" />

        <button className="flex items-center gap-3 rounded-xl px-2 py-1 transition hover:bg-surface-container-low">
          <img
            src="https://i.pravatar.cc/100?img=12"
            alt="Profile"
            className="h-11 w-11 rounded-full object-cover ring-2 ring-outline-variant"
          />
          <div className="hidden text-left lg:block">
            <p className="text-sm font-semibold text-on-background">Admin User</p>
            <p className="text-xs text-on-surface-variant">Head Pharmacist</p>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Topbar;