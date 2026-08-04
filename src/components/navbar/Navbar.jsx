import { Bell, Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <header
      className="fixed top-0 left-0 md:left-[260px] right-0 py-1 bg-white flex items-center justify-between px-6 z-30"
      style={{ borderBottom: '3px solid transparent', borderImage: 'linear-gradient(to right, #2563eb, #14b8a6) 1' }}
    >
      <div className="flex items-center gap-4">
        <button className="md:hidden p-2 text-[#0F172A]">
          <Menu size={22} />
        </button>
        <span className="font-bold text-lg text-[#0F172A] tracking-tight">Medorax</span>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full hover:bg-slate-100 transition-colors text-[#0F172A]">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <button className="flex items-center gap-2 hover:bg-slate-100 p-1  rounded-full transition-colors">
          <div className="w-8 h-8 rounded-full bg-[#006a60] flex items-center justify-center text-white font-bold text-sm overflow-hidden">
            U
          </div>
        </button>
      </div>
    </header>
  );
}