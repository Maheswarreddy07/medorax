import { Bell, Menu } from "lucide-react";

const AppTopbar = ({ onMenuClick }) => {
  return (
    <header className="fixed left-0 right-0 top-0 z-30 flex h-16 items-center justify-between border-b border-outline-variant bg-surface-container-lowest px-4 shadow-sm md:left-[260px] md:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Open navigation"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-on-surface-variant transition-colors hover:bg-surface-container md:hidden"
        >
          <Menu size={22} />
        </button>
        <div>
          <p className="text-base font-bold tracking-tight text-primary">MEDORAX</p>
          <p className="hidden text-xs text-on-surface-variant sm:block">
            Pharmacy management workspace
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container"
        >
          <Bell size={20} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-error" />
        </button>

        <div className="h-8 w-px bg-outline-variant" />

        <button
          type="button"
          className="flex items-center gap-3 rounded-xl px-2 py-1 transition-colors hover:bg-surface-container-low"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-on-primary">
            A
          </span>
          <span className="hidden text-left lg:block">
            <span className="block text-sm font-semibold text-on-background">Admin User</span>
            <span className="block text-xs text-on-surface-variant">Administrator</span>
          </span>
        </button>
      </div>
    </header>
  );
};

export default AppTopbar;
