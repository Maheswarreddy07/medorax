import { LogOut, X } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import logo from "../../assets/WhatsApp_Image_2026-06-22_at_5.25.21_PM-removebg-preview.png";
import {
  primaryNavigation,
  utilityNavigation,
} from "../../data/navigation/navigationData";

const linkClasses = (isActive) =>
  `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
    isActive
      ? "bg-white/20 font-semibold text-white"
      : "text-white/75 hover:bg-white/10 hover:text-white"
  }`;

const NavigationLink = ({ item, pathname, onNavigate }) => {
  const Icon = item.icon;
  const matchesGroup = item.activePrefix
    ? pathname.startsWith(item.activePrefix)
    : false;

  return (
    <NavLink
      to={item.to}
      end={item.end}
      onClick={onNavigate}
      className={({ isActive }) => linkClasses(isActive || matchesGroup)}
    >
      <Icon size={20} strokeWidth={2.2} />
      <span>{item.label}</span>
    </NavLink>
  );
};

const AppSidebar = ({ isOpen, onClose }) => {
  const { pathname } = useLocation();

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 z-40 bg-slate-950/40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-[#003a8a] bg-primary px-5 py-6 text-on-primary shadow-2xl transition-transform duration-200 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-7 flex items-center justify-between">
          <NavLink to="/" onClick={onClose} className="flex items-center gap-3">
            <img
              src={logo}
              alt="Medorax logo"
              className="h-14 w-14 rounded-xl object-contain"
            />
            <div>
              <p className="text-xl font-extrabold tracking-tight text-white">MEDORAX</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">
                Pharma Management
              </p>
            </div>
          </NavLink>

          <button
            type="button"
            aria-label="Close navigation"
            onClick={onClose}
            className="rounded-lg p-2 text-white/75 hover:bg-white/10 hover:text-white md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-6 overflow-y-auto pr-1">
          <div className="space-y-1">
            <p className="mb-2 px-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white/45">
              Modules
            </p>
            {primaryNavigation.map((item) => (
              <NavigationLink
                key={item.to}
                item={item}
                pathname={pathname}
                onNavigate={onClose}
              />
            ))}
          </div>

          <div className="space-y-1">
            <p className="mb-2 px-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white/45">
              Tools
            </p>
            {utilityNavigation.map((item) => (
              <NavigationLink
                key={item.to}
                item={item}
                pathname={pathname}
                onNavigate={onClose}
              />
            ))}
          </div>
        </nav>

        <div className="mt-5 border-t border-white/15 pt-4">
          <NavLink
            to="/login"
            onClick={onClose}
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-white/75 transition-colors hover:bg-white/10 hover:text-white"
          >
            <LogOut size={20} strokeWidth={2.2} />
            <span>Logout</span>
          </NavLink>
        </div>
      </aside>
    </>
  );
};

export default AppSidebar;
