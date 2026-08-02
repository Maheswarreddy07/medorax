import { Outlet } from "react-router-dom";
import Sidebar from "../../components/staffManagement/Sidebar";
import Topbar from "../../components/staffManagement/Topbar";

const StaffManagementLayout = () => {
  return (
    <div className="min-h-screen bg-[#F8FCFF]">
      <Sidebar />
      <Topbar />
      <main className="ml-[260px] pt-16 min-h-screen p-8">
        <div className="mx-auto max-w-[1440px]">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default StaffManagementLayout;