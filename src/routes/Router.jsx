import { createBrowserRouter } from "react-router-dom";

import SupplierLayout from "../layouts/supplierManagement/SupplierManagemetnLayout";
import StaffManagementLayout from "../layouts/staffManagement/StaffManagementLayout";

import Dashboard from "../pages/SupplierManagement/Dashboard";
import Suppliers from "../pages/SupplierManagement/Suppliers";
import SupplierInformation from "../pages/SupplierManagement/SupplierInformation";

import StaffDashboard from "../pages/StaffManagement/dashboard/Dashboard";
import Employee from "../pages/StaffManagement/employee/Employee";
import StaffInformation from "../pages/StaffManagement/StaffInformation";

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
        path: ":staffId",
        element: <StaffInformation />,
      },
    ],
  },
]);

export default router;
