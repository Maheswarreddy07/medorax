import { NavLink } from "react-router-dom";
import { CalendarDays, LogIn, ScrollText } from "lucide-react";

const Topbar = () => {
  return (
    <header className="fixed right-0 top-0 z-40 flex h-16 w-[calc(100%-260px)] items-center justify-end border-b border-outline-variant bg-surface-container-lowest px-8 shadow-sm">
      <div className="flex items-center gap-6">
        {/* Quick Nav Links */}
        <nav className="mr-4 hidden items-center gap-2 lg:flex">
          <NavLink
            to="/staff/attendance"
            className={({ isActive }) =>
              `flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-on-surface-variant hover:bg-surface-container"
              }`
            }
          >
            <CalendarDays size={16} />
            <span>Attendance</span>
          </NavLink>
          <NavLink
            to="/staff/kiosk"
            className={({ isActive }) =>
              `flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-on-surface-variant hover:bg-surface-container"
              }`
            }
          >
            <LogIn size={16} />
            <span>Check In/Out</span>
          </NavLink>
          <NavLink
            to="/staff/activity-logs"
            className={({ isActive }) =>
              `flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-on-surface-variant hover:bg-surface-container"
              }`
            }
          >
            <ScrollText size={16} />
            <span>Logs</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Topbar;