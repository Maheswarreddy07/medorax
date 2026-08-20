import { NavLink } from 'react-router-dom';

export default function SidebarLink({ to, icon: Icon, label, className = "", end = false }) {
  const linkClasses = ({ isActive }) =>
    `flex items-center gap-4 px-4 py-3 rounded-xs transition-all duration-200 group ${
      isActive 
        ? 'text-[#00522f] bg-[#94f7b9] font-bold' 
        : 'text-[#424751] hover:text-[#004287] hover:bg-[#dee9fc]'
    } ${className}`;

  return (
    <NavLink to={to} end={end} className={linkClasses}>
      <Icon size={20} className="group-hover:scale-110 transition-transform" />
      <span className="text-[14px] font-medium">{label}</span>
    </NavLink>
  );
}