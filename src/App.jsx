import {Routes, Route } from "react-router-dom";
import Login from "@/modules/authentication/Login/Login";
import SearchPage from "./modules/search/SearchPage/SearchPage";
import DashboardLayout from "./layouts/DashboardLayout";
import PurchaseOrderPage from "./modules/purchases/purchasePage/PurchaseOrderPage";
import PurchaseInvoicePage from "./modules/purchases/purchasePage/PurchaseInvoicePage";
import ImportExportPage from "./modules/importExport/importExportPage/ImportExportPage";
import ReportsPage from "./modules/Reports/ReportsPage/ReportsPage";


function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<DashboardLayout />}>
          <Route path="/search" element={<SearchPage/>} />
          <Route path="/reports" element={<ReportsPage/>} />
          <Route path="/import-export" element={<ImportExportPage/>} />
          <Route path="/purchases/order" element={<PurchaseOrderPage/>} />
          <Route path="/purchases/invoice" element={<PurchaseInvoicePage/>} />
        </Route>
      </Routes>
  );
}

export default App;