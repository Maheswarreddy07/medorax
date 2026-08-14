import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SidebarBrand from './SidebarBrand';
import SidebarNav from './SidebarNav';
import SidebarFooter from './SidebarFooter';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);

  // Auto-open purchase dropdown when on purchase pages
  useEffect(() => {
    if (location.pathname.startsWith('/purchases')) {
      setIsPurchaseOpen(true);
    } else {
      setIsPurchaseOpen(false);
    }
  }, [location.pathname]);

  const isOnPurchasePage = location.pathname.startsWith('/purchases');

  // Handle purchase button click - navigate to purchase order
  const handlePurchaseClick = () => {
    setIsPurchaseOpen(true);
    navigate('/purchases/order');
  };

  return (
    <nav className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 z-40 bg-[#f8f9ff] border-r border-[#c2c6d3] pt-4 pb-8 flex-shrink-0">
      <SidebarBrand />
      <SidebarNav 
        isPurchaseOpen={isPurchaseOpen}
        setIsPurchaseOpen={setIsPurchaseOpen}
        isOnPurchasePage={isOnPurchasePage}
        onPurchaseClick={handlePurchaseClick}
      />
      <SidebarFooter />
    </nav>
  );
}