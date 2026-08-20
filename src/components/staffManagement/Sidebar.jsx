import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  UserCheck,
  LogOut,
  LogIn,
  CalendarDays
} from "lucide-react";
import logo from "../../assets/WhatsApp_Image_2026-06-22_at_5.25.21_PM-removebg-preview.png";

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-[260px] flex-col overflow-y-auto border-r border-[#003a8a] bg-primary px-6 py-8 text-on-primary shadow-2xl md:flex">
      {/* Logo */}
      <div className="mb-12">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="MEDORAX Logo"
            className="h-20 w-20 rounded-xl object-contain"
          />
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">MEDORAX</h1>
            <p className="text-xs uppercase tracking-widest text-slate-200/60">
              Staff Management
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        <NavLink
          to="/staff"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-4 py-3 text-[15px] font-medium transition-all duration-200 ${
              isActive
                ? "bg-surface-container-lowest/20 font-semibold text-on-primary"
                : "text-slate-200/80 hover:bg-surface-container-lowest/10 hover:text-on-primary"
            }`
          }
        >
          <LayoutDashboard size={20} strokeWidth={2.2} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/staff/directory"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-4 py-3 text-[15px] font-medium transition-all duration-200 ${
              isActive
                ? "bg-surface-container-lowest/20 font-semibold text-on-primary"
                : "text-slate-200/80 hover:bg-surface-container-lowest/10 hover:text-on-primary"
            }`
          }
        >
          <UserCheck size={20} strokeWidth={2.2} />
          <span>Employee</span>
        </NavLink>

        <NavLink
          to="/staff/attendance"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-4 py-3 text-[15px] font-medium transition-all duration-200 ${
              isActive
                ? "bg-surface-container-lowest/20 font-semibold text-on-primary"
                : "text-slate-200/80 hover:bg-surface-container-lowest/10 hover:text-on-primary"
            }`
          }
        >
          <CalendarDays size={20} strokeWidth={2.2} />
          <span>Attendance</span>
        </NavLink>

        <NavLink
          to="/staff/kiosk"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-4 py-3 text-[15px] font-medium transition-all duration-200 ${
              isActive
                ? "bg-surface-container-lowest/20 font-semibold text-on-primary"
                : "text-slate-200/80 hover:bg-surface-container-lowest/10 hover:text-on-primary"
            }`
          }
        >
          <LogIn size={20} strokeWidth={2.2} />
          <span>Check In / Out</span>
        </NavLink>
      </nav>

      {/* Bottom Section */}
      <div className="pt-6 mt-auto">
        <div className="mt-4 border-t border-on-primary/10 pt-4">
          <a
            href="#"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-[15px] font-medium text-slate-200/80 transition-all duration-200 hover:bg-error-container0/20 hover:text-on-primary"
          >
            <LogOut size={20} strokeWidth={2.2} />
            <span>Logout</span>
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
