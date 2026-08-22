import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
} from "lucide-react";
import logo from "../../../assets/WhatsApp_Image_2026-06-22_at_5.25.21_PM-removebg-preview.png";

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-70 flex-col border-r border-[#003a8a] bg-primary px-6 py-8 text-on-primary shadow-2xl md:flex">
      {/* Logo */}
      <div className="mb-12">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="MEDORAX Logo"
            className="h-20 w-20 rounded-xl object-contain"
          />
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">Medorax</h1>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.25em] text-on-primary/60">
              Supplier Management
            </p>
          </div>
        </div>
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
                ? "bg-surface-container-lowest/20 font-semibold text-on-primary shadow-md"
                : "text-on-primary/80 hover:bg-surface-container-lowest/10 hover:text-on-primary"
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
                ? "bg-surface-container-lowest/20 font-semibold text-on-primary shadow-md"
                : "text-on-primary/80 hover:bg-surface-container-lowest/10 hover:text-on-primary"
            }`
          }
        >
          <Users size={20} strokeWidth={2.2} />
          <span>Suppliers</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;