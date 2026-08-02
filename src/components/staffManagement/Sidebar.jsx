import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  UserCheck,
  Shield,
  Settings,
  User,
  LogOut,
  Stethoscope
} from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-[260px] flex-col overflow-y-auto bg-gradient-to-b from-[#2563EB] via-[#14B8A6] to-[#10B981] px-6 py-8 text-white shadow-2xl md:flex">
      {/* Logo */}
      <div className="mb-12">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-[#004ac6] to-[#006b5f]">
            <Stethoscope size={22} className="text-white" />
          </div>
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
                ? "bg-white/20 font-semibold text-white"
                : "text-slate-200/80 hover:bg-white/10 hover:text-white"
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
                ? "bg-white/20 font-semibold text-white"
                : "text-slate-200/80 hover:bg-white/10 hover:text-white"
            }`
          }
        >
          <UserCheck size={20} strokeWidth={2.2} />
          <span>Employee</span>
        </NavLink>

        <a
          href="#"
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-[15px] font-medium text-slate-200/80 transition-all duration-200 hover:bg-white/10 hover:text-white"
        >
          <Shield size={20} strokeWidth={2.2} />
          <span>Roles & Permissions</span>
        </a>
      </nav>

      {/* Bottom Section */}
      <div className="pt-6 mt-auto">
        <div className="space-y-1">
          <a
            href="#"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-[15px] font-medium text-slate-200/80 transition-all duration-200 hover:bg-white/10 hover:text-white"
          >
            <Settings size={20} strokeWidth={2.2} />
            <span>Settings</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-[15px] font-medium text-slate-200/80 transition-all duration-200 hover:bg-white/10 hover:text-white"
          >
            <User size={20} strokeWidth={2.2} />
            <span>My Profile</span>
          </a>
        </div>

        <div className="mt-4 border-t border-white/10 pt-4">
          <a
            href="#"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-[15px] font-medium text-slate-200/80 transition-all duration-200 hover:bg-red-500/20 hover:text-white"
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
