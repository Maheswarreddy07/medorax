import Sidebar from "../../components/supplierManagement/dashboard/Sidebar";
import TopNavbar from "../../components/supplierManagement/dashboard/TopNavbar";
import DashboardHeader from "../../components/supplierManagement/dashboard/DashboardHeader";
import KpiCards from "../../components/supplierManagement/dashboard/KpiCards";
import SupplierTable from "../../components/supplierManagement/dashboard/SupplierTable";

const Dashboard = () => {
  return (
    <div className="bg-[#F8FCFF] min-h-screen flex">
      <Sidebar />

      <main className="flex-1 md:ml-[280px] flex flex-col min-h-screen">
        <TopNavbar />

        <div className="p-4 md:p-10 flex-1">
          <DashboardHeader />

          <KpiCards />

          <SupplierTable />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;