const Sidebar = () => {
  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-screen w-[280px] flex-col border-r border-[#E2E8F0] bg-[linear-gradient(135deg,#2563EB_0%,#14B8A6_55%,#10B981_100%)] px-4 py-6 text-white z-50">
      {/* Logo */}
      <div className="mb-8 px-2">
        <h1 className="text-2xl font-bold">MedSupply Pro</h1>

        <p className="mt-1 text-xs text-white/80">
          Supplier Management
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-2">
        {/* Active */}
        <button className="flex items-center gap-4 rounded-lg border-r-4 border-white bg-white/20 px-4 py-3 text-left font-semibold transition hover:bg-white/30">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
            dashboard
          </span>

          <span>Dashboard</span>
        </button>

        {/* Suppliers */}
        <button className="flex items-center gap-4 rounded-lg px-4 py-3 text-left text-white/80 transition hover:bg-white/10 hover:text-white">
          <span className="material-symbols-outlined">
            group
          </span>

          <span>Suppliers</span>
        </button>
      </nav>

      {/* Bottom Section */}
      <div>
        <button className="mb-6 w-full rounded-lg border border-white/30 bg-[linear-gradient(135deg,#2563EB_0%,#14B8A6_55%,#10B981_100%)] py-3 font-semibold shadow-sm transition hover:opacity-90">
          New Purchase Order
        </button>

        <div className="border-t border-white/20 pt-3">
          <button className="flex w-full items-center gap-4 rounded-lg px-4 py-3 text-left text-white/80 transition hover:bg-white/10 hover:text-white">
            <span className="material-symbols-outlined">
              settings
            </span>

            <span>Settings</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;