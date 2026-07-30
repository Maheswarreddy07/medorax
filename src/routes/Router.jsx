import { createBrowserRouter } from "react-router-dom";

import Dashboard from "../pages/SupplierManagement/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
]);

export default router;