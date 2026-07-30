import { createBrowserRouter } from "react-router-dom";

import SupplierLayout from "../layouts/supplierManagement/SupplierManagemetnLayout";

import Dashboard from "../pages/SupplierManagement/Dashboard";
import Suppliers from "../pages/SupplierManagement/Suppliers";

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
    ],
  },
]);

export default router;