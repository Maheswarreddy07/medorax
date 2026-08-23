import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Settings2,
  Boxes,
  Pill,
  ShoppingCart,
  Users,
  Truck,
  ReceiptText,
  BarChart3,
  LogOut,
} from "lucide-react";

const navigationItems = [
  { to: "/pharmacy", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/pharmacy/settings", label: "Pharmacy Settings", icon: Settings2 },
  { to: "/pharmacy/directory", label: "My Pharmacies", icon: Pill },
];

const secondaryItems = [
  { label: "Inventory", icon: Boxes },
  { label: "Medicine Catalog", icon: Pill },
  { label: "Orders", icon: ShoppingCart },
  { label: "Customers", icon: Users },
  { label: "Suppliers", icon: Truck },
  { label: "Sales", icon: ReceiptText },
  { label: "Reports & Analytics", icon: BarChart3 },
];

const navLinkClasses = ({ isActive }) =>
  `flex items-center gap-3 rounded px-4 py-2.5 text-[15px] font-medium transition-colors ${
    isActive
      ? "bg-[#004287] font-semibold text-white"
      : "text-[#121c2a] hover:bg-[#eff4ff]"
  }`;

const Sidebar = () => {
  return (
    <nav className="hidden h-screen w-64 flex-shrink-0 flex-col fixed left-0 top-0 z-40 border-r border-[#c2c6d3] bg-[#f8f9ff] pt-4 pb-8 md:flex">
      {/* Brand */}
      <div className="mb-8 flex items-center gap-3 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1e5aa8] text-lg font-bold text-white">
          M
        </div>
        <div>
          <h1 className="text-[24px] font-semibold tracking-tight text-[#004287]">Medorax</h1>
          <p className="text-[12px] font-semibold text-[#424751]">PHARMA MANAGEMENT</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-4">
        {navigationItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} className={navLinkClasses}>
            <Icon size={20} strokeWidth={2.2} />
            <span>{label}</span>
          </NavLink>
        ))}

        <div className="my-4 h-px bg-[#c2c6d3]" />

        {secondaryItems.map(({ label, icon: Icon }) => (
          <button
            key={label}
            type="button"
            className="flex items-center gap-3 rounded px-4 py-2.5 text-left text-[15px] font-medium text-[#121c2a] transition-colors hover:bg-[#eff4ff]"
          >
            <Icon size={20} strokeWidth={2.2} />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Footer */}
      <button
        type="button"
        className="mx-4 mt-6 flex items-center gap-3 rounded px-4 py-2.5 text-left text-[15px] font-medium text-[#424751] transition-colors hover:bg-[#eff4ff] hover:text-[#ba1a1a]"
      >
        <LogOut size={20} strokeWidth={2.2} />
        <span>Logout</span>
      </button>
    </nav>
  );
};

export default Sidebar;