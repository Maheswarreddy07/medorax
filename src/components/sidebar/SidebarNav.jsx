import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart,
  ArrowLeftRight, 
  BarChart3 
} from 'lucide-react';
import SidebarLink from './SidebarLink';
import SidebarDropdown, { DropdownItem } from './SidebarDropdown';

export default function SidebarNav({ 
  isPurchaseOpen, 
  setIsPurchaseOpen, 
  isOnPurchasePage,
  onPurchaseClick 
}) {
  return (
    <div className="flex-1 overflow-y-auto px-4 space-y-1">
      <SidebarLink to="/search" icon={LayoutDashboard} label="Dashboard" end />
      <SidebarLink to="/inventory" icon={Package} label="Inventory" end />

      <SidebarDropdown
        isOpen={isPurchaseOpen}
        setIsOpen={setIsPurchaseOpen}
        isActive={isOnPurchasePage}
        icon={ShoppingCart}
        label="Purchase"
        onToggle={onPurchaseClick}
      >
        <DropdownItem to="/purchases/order" label="Purchase Order" />
        <DropdownItem to="/purchases/invoice" label="Purchase Invoice" />
      </SidebarDropdown>

      <SidebarLink to="/import-export" icon={ArrowLeftRight} label="Import/Export" end />
      <SidebarLink to="/reports" icon={BarChart3} label="Reports" end />
    </div>
  );
}