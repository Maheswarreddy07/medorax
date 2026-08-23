import { Outlet } from "react-router-dom";

import Sidebar from "../../components/pharmacySettings/Sidebar";
import Topbar from "../../components/pharmacySettings/Topbar";

const PharmacySettingsLayout = () => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 md:ml-64">
        <Topbar />

        <main className="min-h-screen bg-[#f8f9ff] pt-14">
          <div className="p-6">
            <Outlet />
          </div>

          <footer className="flex flex-col items-center justify-between gap-2 border-t border-[#c2c6d3] bg-white px-6 py-4 md:flex-row">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#424751]">
              © 2024 Medorax Systems v2.4.0
            </span>
            <div className="flex gap-6 text-xs font-medium text-[#424751]">
              <a href="#" className="transition-colors hover:text-[#004287]">Support Center</a>
              <a href="#" className="transition-colors hover:text-[#004287]">Privacy Policy</a>
              <a href="#" className="transition-colors hover:text-[#004287]">Terms of Service</a>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default PharmacySettingsLayout;