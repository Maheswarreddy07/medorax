import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Users,
  Truck,
  ShoppingCart,
  ChevronDown,
  ArrowLeftRight,
  BarChart3,
  Settings,
  LogOut,
} from 'lucide-react';
import logo from '../../assets/images/auth/logo.png';

export default function Sidebar() {
  const location = useLocation();
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-sm transition-colors duration-200 ${
      isActive ? 'text-white  bg-[#2563eb] font-bold' : 'text-white/70 hover:text-white hover:bg-white/10'
    }`;

  const isOnPurchasePage = location.pathname.startsWith('/purchases');

  return (
    <nav
      className="hidden md:flex flex-col h-screen w-[260px] fixed left-0 top-0 z-40 pt-6  shadow-md"
      style={{ background: 'linear-gradient(135deg, #2563eb 0%, #14b8a6 55%, #10b981 100%)' }}
    >
      <div className="px-6 mb-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-sm overflow-hidden flex items-center justify-center">
          <img src={logo} alt="Medorax Logo" className="w-full h-full object-cover" />
        </div>
        <div>
          <div className="font-black text-white tracking-tight">Medorax</div>
          <div className="text-[10px] text-white/80 uppercase tracking-wider">Pharma Management</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4  flex flex-col">
        <NavLink to="/search" className={linkClasses}>
          <LayoutDashboard size={18} />
          <span className="text-xs font-medium">Dashboard</span>
        </NavLink>

        <NavLink to="/inventory" className={linkClasses}>
          <Package size={18} />
          <span className="text-xs font-medium">Inventory</span>
        </NavLink>

        <NavLink to="/customers" className={linkClasses}>
          <Users size={18} />
          <span className="text-xs font-medium">Customers</span>
        </NavLink>

        <NavLink to="/suppliers" className={linkClasses}>
          <Truck size={18} />
          <span className="text-xs font-medium">Suppliers</span>
        </NavLink>

        <div>
          <button
            type="button"
            onClick={() => setIsPurchaseOpen(!isPurchaseOpen)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-sm transition-colors duration-200 ${
              isOnPurchasePage || isPurchaseOpen
                ? 'text-white bg-[#2563eb] font-bold'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <span className="flex items-center gap-3">
              <ShoppingCart size={18} />
              <span className="text-xs font-medium">Purchase</span>
            </span>
            <ChevronDown
              size={16}
              className={`transition-transform duration-200 ${isPurchaseOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {isPurchaseOpen && (
            <div className="ml-12 mt-1 flex flex-col gap-1 pl-4">
              <NavLink
                to="/purchases/order"
                className={({ isActive }) =>
                  `block px-3 py-1 rounded-sm text-xs transition-colors ${
                    isActive ? 'text-white  bg-[#2563eb] font-bold' : 'text-white/70 hover:text-white  hover:bg-white/10'
                  }`
                }
              >
                Purchase Order
              </NavLink>
              <NavLink
                to="/purchases/invoice"
                className={({ isActive }) =>
                  `block px-3 py-1 rounded-sm text-xs transition-colors ${
                    isActive ? 'text-white font-bold bg-[#2563eb]' : 'text-white/70  hover:text-white   hover:bg-white/10'
                  }`
                }
              >
                Purchase Invoice
              </NavLink>
            </div>
          )}
        </div>

        <NavLink to="/import-export" className={linkClasses}>
          <ArrowLeftRight size={18} />
          <span className="text-xs font-medium">Import/Export</span>
        </NavLink>

        <NavLink to="/reports" className={linkClasses}>
          <BarChart3 size={18} />
          <span className="text-xs font-medium">Reports</span>
        </NavLink>
      </div>

      <div className="px-4 mt-auto  border-t border-white/20 py-1">
        <NavLink to="/settings" className={linkClasses}>
          <Settings size={18} />
          <span className="text-xs font-medium">Settings</span>
        </NavLink>
        <button className="flex items-center gap-3 px-4 py-3 rounded-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors duration-200 w-full text-left">
          <LogOut size={18} />
          <span className="text-xs font-medium">Logout</span>
        </button>
      </div>
    </nav>
  );
}