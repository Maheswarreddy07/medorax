import { Settings, LogOut } from 'lucide-react';
import SidebarLink from './SidebarLink';

export default function SidebarFooter() {
  return (
    <div className="px-4 mt-auto space-y-1 border-t border-[#c2c6d3] pt-4">
      <SidebarLink to="/settings" icon={Settings} label="Settings" />
      
      <button className="flex items-center gap-4 px-4 py-3 rounded-xs text-[#424751] hover:text-[#004287] hover:bg-[#dee9fc] transition-all duration-200 w-full text-left group">
        <LogOut size={20} className="group-hover:scale-110 transition-transform" />
        <span className="text-[14px] font-medium">Logout</span>
      </button>
    </div>
  );
}