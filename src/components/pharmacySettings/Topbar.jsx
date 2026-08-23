import { Bell, Menu } from "lucide-react";

const Topbar = () => {
  return (
    <header className="fixed left-0 right-0 top-0 z-30 flex h-14 items-center justify-between border-b border-[#c2c6d3] bg-[#f8f9ff] px-6 md:left-64">
      <div className="flex items-center gap-4">
        <button type="button" aria-label="Menu" className="p-2 text-[#424751] md:hidden">
          <Menu size={22} />
        </button>
        <span className="text-[20px] font-bold tracking-tight text-[#004287]">MEDORAX</span>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-full p-2 text-[#424751] transition-colors hover:bg-[#eff4ff]"
        >
          <Bell size={20} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#ba1a1a]" />
        </button>

        <div className="flex cursor-pointer items-center gap-2 rounded-full p-1 transition-colors hover:bg-[#eff4ff]">
          <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-[#1e5aa8] text-sm font-semibold text-white">
            A
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;