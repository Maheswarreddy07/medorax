import { Search, Bell, CalendarDays, LogIn, ScrollText } from "lucide-react";

const Topbar = () => {
  return (
    <header className="fixed right-0 top-0 z-40 flex h-16 w-[calc(100%-260px)] items-center justify-end border-b border-slate-200 bg-white px-8 shadow-sm">
      <div className="flex items-center gap-6">
        {/* Quick Nav Links */}
        <nav className="mr-4 hidden items-center gap-2 lg:flex">
          <a
            href="#"
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
          >
            <CalendarDays size={16} />
            <span>Attendance</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
          >
            <LogIn size={16} />
            <span>Check In/Out</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
          >
            <ScrollText size={16} />
            <span>Logs</span>
          </a>
        </nav>

        {/* Search */}
        <button className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 active:scale-95">
          <Search size={20} />
        </button>

        {/* Notifications */}
        <button className="relative rounded-full p-2 text-slate-500 transition hover:bg-slate-100 active:scale-95">
          <Bell size={20} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        {/* Divider */}
        <div className="h-8 w-px bg-slate-200"></div>

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-bold text-slate-800">Admin User</p>
            <p className="text-[10px] font-medium uppercase text-slate-500">
              Super Admin
            </p>
          </div>
          <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-blue-200">
            <img
              src="https://i.pravatar.cc/100?img=12"
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;