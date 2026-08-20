import { Bell, Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 md:left-64 right-0 h-14 bg-[#f8f9ff] border-b border-[#c2c6d3] flex items-center justify-between px-6 z-30">
      <div className="flex items-center gap-4">
        <button className="md:hidden p-2 text-[#424751]">
          <Menu size={22} />
        </button>
        <span className="font-bold text-[20px] text-[#004287] tracking-tight">MEDORAX</span>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full hover:bg-[#eff4ff] transition-colors text-[#424751]">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ba1a1a] rounded-full"></span>
        </button>

        <div className="flex items-center gap-2 hover:bg-[#eff4ff] p-1 rounded-full transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-[#1e5aa8] flex items-center justify-center text-white font-bold text-sm overflow-hidden">
            <span className="text-[14px] font-semibold">U</span>
          </div>
        </div>
      </div>
    </header>
  );
}