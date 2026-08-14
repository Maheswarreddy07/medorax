import { NavLink } from 'react-router-dom';
import { ShoppingCart, ChevronDown } from 'lucide-react';

export default function SidebarDropdown({ 
  isOpen, 
  setIsOpen, 
  isActive, 
  label, 
  icon: Icon,
  onToggle,
  children 
}) {
  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setIsOpen(!isOpen);
    }
  };

  const buttonClasses = `w-full flex items-center justify-between px-4 py-3 rounded-xs transition-all duration-200 group ${
    isActive
      ? 'text-[#00522f] bg-[#94f7b9] font-bold'
      : 'text-[#424751] hover:text-[#004287] hover:bg-[#dee9fc]'
  }`;

  return (
    <div>
      <button
        type="button"
        onClick={handleToggle}
        className={buttonClasses}
      >
        <span className="flex items-center gap-4">
          <Icon size={20} className="group-hover:scale-110 transition-transform" />
          <span className="text-[14px] font-medium">{label}</span>
        </span>
        <ChevronDown
          size={18}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="ml-12 mt-1 flex flex-col gap-1 pl-4">
          {children}
        </div>
      )}
    </div>
  );
}

// Sub-component for dropdown items
export function DropdownItem({ to, label }) {
  const linkClasses = ({ isActive }) =>
    `block px-3 py-2 rounded-xs text-[14px] transition-all duration-200 ${
      isActive 
        ? 'text-[#00522f] bg-[#94f7b9] font-bold' 
        : 'text-[#424751] hover:text-[#004287] hover:bg-[#dee9fc]'
    }`;

  return (
    <NavLink to={to} className={linkClasses}>
      {label}
    </NavLink>
  );
}