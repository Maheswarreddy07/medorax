const TopNavbar = () => {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-[#E2E8F0] bg-white px-4 md:px-10">
      {/* Mobile Menu */}
      <button className="rounded-full p-2 text-[#475569] transition hover:bg-[#F1F5F9] md:hidden">
        <span className="material-symbols-outlined">menu</span>
      </button>

      {/* Search */}
      <div className="ml-4 flex-1 md:ml-0 md:max-w-md">
        <div className="group relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] transition group-focus-within:text-[#2563EB]">
            search
          </span>

          <input
            type="text"
            placeholder="Search suppliers, orders..."
            className="w-full rounded-full border border-[#E2E8F0] bg-[#F8FCFF] py-2 pl-10 pr-4 text-sm text-[#0F172A] placeholder:text-[#64748B] focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
          />
        </div>
      </div>

      {/* Right Icons */}
      <div className="ml-auto flex items-center gap-2">
        <button className="rounded-full p-2 text-[#475569] transition hover:bg-[#F8FCFF]">
          <span className="material-symbols-outlined">
            notifications
          </span>
        </button>

        <button className="rounded-full p-2 text-[#475569] transition hover:bg-[#F8FCFF]">
          <span className="material-symbols-outlined">
            account_circle
          </span>
        </button>
      </div>
    </header>
  );
};

export default TopNavbar;