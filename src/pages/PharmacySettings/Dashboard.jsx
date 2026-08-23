import DashboardHeader from "../../components/pharmacySettings/dashboard/DashboardHeader";
import KpiCards from "../../components/pharmacySettings/dashboard/KpiCards";
import AnalyticsSection from "../../components/pharmacySettings/dashboard/AnalyticsSection";
import RecentOrdersTable from "../../components/pharmacySettings/dashboard/RecentOrdersTable";
import SidePanels from "../../components/pharmacySettings/dashboard/SidePanels";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <DashboardHeader />
      <KpiCards />

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 space-y-6 lg:col-span-8">
          <AnalyticsSection />
          <RecentOrdersTable />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <SidePanels />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;