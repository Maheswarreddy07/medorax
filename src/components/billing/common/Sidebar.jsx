import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ScanBarcode,
  Keyboard,
  Zap,
  FileText,
  Receipt,
  LogOut,
} from "lucide-react";

import logo from "../../../assets/WhatsApp_Image_2026-06-22_at_5.25.21_PM-removebg-preview.png";

const navSections = [
  {
    label: "Billing (POS)",
    items: [
      { to: "/billing/barcode", label: "Barcode Billing", icon: ScanBarcode },
      { to: "/billing/manual", label: "Manual Billing", icon: Keyboard },
      { to: "/billing/quick", label: "Quick Billing", icon: Zap },
      { to: "/billing/prescription", label: "Prescription Billing", icon: FileText },
      { to: "/billing/history", label: "Bill History", icon: Receipt },
    ],
  },
];

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-70 flex-col bg-linear-to-br from-[#2563EB] via-[#14B8A6] to-[#10B981] px-6 py-8 text-white shadow-2xl md:flex">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="MEDORAX Logo"
            className="h-16 w-16 rounded-xl object-contain"
          />
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">Medorax</h1>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
              Billing (POS)
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto pr-1">
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

        <NavLink
          to="/staff"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-medium transition-all duration-200 ${
              isActive
                ? "bg-white/20 font-semibold text-white shadow-md"
                : "text-white/80 hover:bg-white/10 hover:text-white"
            }`
          }
        >
          <Users size={20} strokeWidth={2.2} />
          <span>Staff Management</span>
        </NavLink>

        {navSections.map((section) => (
          <div key={section.label}>
            <p className="mb-2 px-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">
              {section.label}
            </p>
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-white/20 font-semibold text-white shadow-md"
                          : "text-white/80 hover:bg-white/10 hover:text-white"
                      }`
                    }
                  >
                    <Icon size={18} strokeWidth={2.2} />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="mt-6 space-y-1 border-t border-white/20 pt-4">
        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white">
          <LogOut size={20} strokeWidth={2.2} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;