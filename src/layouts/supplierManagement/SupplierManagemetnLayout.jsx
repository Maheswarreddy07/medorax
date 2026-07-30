import { Outlet } from "react-router-dom";
import Sidebar from "../../components/supplierManagement/dashboard/Sidebar"
import Topbar from "../../components/supplierManagement/dashboard/Topbar";
const SupplierManagemetnLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#F8FCFF]">
      <Sidebar />

      <div className="ml-70 flex flex-1 flex-col">
        <Topbar />

        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SupplierManagemetnLayout;