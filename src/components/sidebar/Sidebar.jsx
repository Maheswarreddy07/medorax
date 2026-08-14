import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
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

  // Auto-open purchase dropdown when on purchase pages
  useEffect(() => {
    if (location.pathname.startsWith('/purchases')) {
      setIsPurchaseOpen(true);
    } else {
      setIsPurchaseOpen(false);
    }
  }, [location.pathname]);

  // Check if on purchase page
  const isOnPurchasePage = location.pathname.startsWith('/purchases');

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-4 px-4 py-3 rounded-xs transition-all duration-200 group ${
      isActive 
        ? 'text-[#00522f] bg-[#94f7b9] font-bold' 
        : 'text-[#424751] hover:text-[#004287] hover:bg-[#dee9fc]'
    }`;

  // When clicking on purchase button, navigate to purchase order and open dropdown
  const handlePurchaseClick = () => {
    setIsPurchaseOpen(true);
    // Navigate to purchase order
    window.location.href = '/purchases/order';
  };

  return (
    <nav className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 z-40 bg-[#f8f9ff] border-r border-[#c2c6d3] pt-4 pb-8 flex-shrink-0">
      <div className="px-6 mb-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-[#1e5aa8] rounded-lg flex items-center justify-center text-white">
          <img src={logo} alt="Medorax Logo" className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="text-[24px] font-semibold text-[#004287] tracking-tight">Medorax</h1>
          <p className="text-[12px] font-semibold text-[#424751]">PHARMA MANAGEMENT</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 space-y-1">
        <NavLink to="/search" className={linkClasses}>
          <LayoutDashboard size={20} className="group-hover:scale-110 transition-transform" />
          <span className="text-[14px] font-medium">Dashboard</span>
        </NavLink>

        <NavLink to="/inventory" className={linkClasses}>
          <Package size={20} className="group-hover:scale-110 transition-transform" />
          <span className="text-[14px] font-medium">Inventory</span>
        </NavLink>

        <div>
          <button
            type="button"
            onClick={handlePurchaseClick}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xs transition-all duration-200 group ${
              isOnPurchasePage
                ? 'text-[#00522f] bg-[#94f7b9] font-bold'
                : 'text-[#424751] hover:text-[#004287] hover:bg-[#dee9fc]'
            }`}
          >
            <span className="flex items-center gap-4">
              <ShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
              <span className="text-[14px] font-medium">Purchase</span>
            </span>
            <ChevronDown
              size={18}
              className={`transition-transform duration-200 ${isPurchaseOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {isPurchaseOpen && (
            <div className="ml-12 mt-1 flex flex-col gap-1 pl-4">
              <NavLink
                to="/purchases/order"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-xs text-[14px] transition-all duration-200 ${
                    isActive 
                      ? 'text-[#00522f] bg-[#94f7b9] font-bold' 
                      : 'text-[#424751] hover:text-[#004287] hover:bg-[#dee9fc]'
                  }`
                }
              >
                Purchase Order
              </NavLink>
              <NavLink
                to="/purchases/invoice"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-xs text-[14px] transition-all duration-200 ${
                    isActive 
                      ? 'text-[#00522f] bg-[#94f7b9] font-bold' 
                      : 'text-[#424751] hover:text-[#004287] hover:bg-[#dee9fc]'
                  }`
                }
              >
                Purchase Invoice
              </NavLink>
            </div>
          )}
        </div>

        <NavLink to="/import-export" className={linkClasses}>
          <ArrowLeftRight size={20} className="group-hover:scale-110 transition-transform" />
          <span className="text-[14px] font-medium">Import/Export</span>
        </NavLink>

        <NavLink to="/reports" className={linkClasses}>
          <BarChart3 size={20} className="group-hover:scale-110 transition-transform" />
          <span className="text-[14px] font-medium">Reports</span>
        </NavLink>
      </div>

      <div className="px-4 mt-auto space-y-1 border-t border-[#c2c6d3] pt-4">
        <NavLink to="/settings" className={linkClasses}>
          <Settings size={20} className="group-hover:scale-110 transition-transform" />
          <span className="text-[14px] font-medium">Settings</span>
        </NavLink>
        <button className="flex items-center gap-4 px-4 py-3 rounded-xs text-[#424751] hover:text-[#004287] hover:bg-[#dee9fc] transition-all duration-200 w-full text-left group">
          <LogOut size={20} className="group-hover:scale-110 transition-transform" />
          <span className="text-[14px] font-medium">Logout</span>
        </button>
      </div>
    </nav>
  );
}