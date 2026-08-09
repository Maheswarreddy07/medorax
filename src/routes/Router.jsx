import { createBrowserRouter } from "react-router-dom";

import SupplierLayout from "../layouts/supplierManagement/SupplierManagemetnLayout";
import StaffManagementLayout from "../layouts/staffManagement/StaffManagementLayout";
import InventoryLayout from "../layouts/inventoryManagement/InventoryLayout";

import Dashboard from "../pages/SupplierManagement/Dashboard";
import Suppliers from "../pages/SupplierManagement/Suppliers";
import SupplierInformation from "../pages/SupplierManagement/SupplierInformation";

import StaffDashboard from "../pages/StaffManagement/dashboard/Dashboard";
import Employee from "../pages/StaffManagement/employee/Employee";
import StaffInformation from "../pages/StaffManagement/StaffInformation";
import Attendance from "../pages/StaffManagement/attendance/Attendance";
import ActivityLogs from "../pages/StaffManagement/activityLogs/ActivityLogs";
import Kiosk from "../pages/StaffManagement/kiosk/Kiosk";

import CurrentStock from "../pages/InventoryManagement/CurrentStock";
import OpeningStock from "../pages/InventoryManagement/OpeningStock";
import ClosingStock from "../pages/InventoryManagement/ClosingStock";
import AvailableStock from "../pages/InventoryManagement/AvailableStock";
import ReservedStock from "../pages/InventoryManagement/ReservedStock";
import BatchManagement from "../pages/InventoryManagement/BatchManagement";
import StockAdjustment from "../pages/InventoryManagement/StockAdjustment";
import StockTransfer from "../pages/InventoryManagement/StockTransfer";
import PhysicalVerification from "../pages/InventoryManagement/PhysicalVerification";
import DamagedStock from "../pages/InventoryManagement/DamagedStock";
import ExpiredStock from "../pages/InventoryManagement/ExpiredStock";
import NearExpiry from "../pages/InventoryManagement/NearExpiry";
import LowStockAlerts from "../pages/InventoryManagement/LowStockAlerts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SupplierLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "suppliers",
        element: <Suppliers />,
      },
      {
        path: "suppliers/:supplierId",
        element: <SupplierInformation />,
      },
    ],
  },
  {
    path: "/staff",
    element: <StaffManagementLayout />,
    children: [
      {
        index: true,
        element: <StaffDashboard />,
      },
      {
        path: "directory",
        element: <Employee />,
      },
      {
        path: "attendance",
        element: <Attendance />,
      },
      {
        path: "kiosk",
        element: <Kiosk />,
      },
      {
        path: "activity-logs",
        element: <ActivityLogs />,
      },
      {
        path: ":staffId",
        element: <StaffInformation />,
      },
    ],
  },
  {
    path: "/inventory",
    element: <InventoryLayout />,
    children: [
      {
        index: true,
        element: <CurrentStock />,
      },
      {
        path: "opening",
        element: <OpeningStock />,
      },
      {
        path: "closing",
        element: <ClosingStock />,
      },
      {
        path: "available",
        element: <AvailableStock />,
      },
      {
        path: "reserved",
        element: <ReservedStock />,
      },
      {
        path: "batches",
        element: <BatchManagement />,
      },
      {
        path: "adjustments",
        element: <StockAdjustment />,
      },
      {
        path: "transfers",
        element: <StockTransfer />,
      },
      {
        path: "verification",
        element: <PhysicalVerification />,
      },
      {
        path: "damaged",
        element: <DamagedStock />,
      },
      {
        path: "expired",
        element: <ExpiredStock />,
      },
      {
        path: "near-expiry",
        element: <NearExpiry />,
      },
      {
        path: "low-stock",
        element: <LowStockAlerts />,
      },
    ],
  },
]);

export default router;