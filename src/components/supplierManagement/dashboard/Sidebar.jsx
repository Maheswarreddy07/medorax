import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Settings,
  Plus,
} from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-[280px] flex-col bg-gradient-to-br from-[#2563EB] via-[#14B8A6] to-[#10B981] px-6 py-8 text-white shadow-2xl md:flex">
      {/* Logo */}
      <div className="mb-12">
        <h1 className="text-[28px] font-extrabold tracking-tight">
          Medorax
        </h1>

        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
          Supplier Management
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-2">
        {/* Dashboard */}
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-medium transition-all duration-200 ${
              isActive
                ? "bg-white/20 font-semibold text-white shadow-md"
                : "text-white/80 hover:bg-white/10 hover:text-white"
            }`
          }
        >
          <LayoutDashboard size={20} strokeWidth={2.2} />
          <span>Dashboard</span>
        </NavLink>

        {/* Suppliers */}
        <NavLink
          to="/suppliers"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-medium transition-all duration-200 ${
              isActive
                ? "bg-white/20 font-semibold text-white shadow-md"
                : "text-white/80 hover:bg-white/10 hover:text-white"
            }`
          }
        >
          <Users size={20} strokeWidth={2.2} />
          <span>Suppliers</span>
        </NavLink>
      </nav>

      {/* Bottom Section */}
      <div className="space-y-5">
        <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-[15px] font-semibold backdrop-blur-md transition-all duration-200 hover:bg-white/20">
          <Plus size={18} strokeWidth={2.5} />
          <span>New Purchase Order</span>
        </button>

        <div className="border-t border-white/20 pt-4">
          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-[15px] font-medium text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white">
            <Settings size={20} strokeWidth={2.2} />
            <span>Settings</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;