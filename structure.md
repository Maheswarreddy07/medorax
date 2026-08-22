# Medorax ERP — Frontend Structure

## Overview

This document describes the frontend folder structure of the Medorax ERP application.

- `pages/` — application-level pages/screens
- `components/` — reusable UI components belonging to a feature
- `data/` — static/mock data used by pages and components
- `layouts/` — common page layouts
- `routes/` — application routing (data router)
- `hooks/` — reusable React hooks
- `store/` — Redux/RTK state management
- `services/` — API/service layer (currently empty)
- `utils/` — utility helpers (currently empty)
- `styles/` — global theme and style tokens
- `assets/` — images and other static assets

The purpose of this structure is to keep pages, reusable components, data, and layouts separated so that backend/API integration can be introduced without restructuring the frontend.

> **Note on routing:** All routes are defined in `src/routes/Router.jsx` (data router, `createBrowserRouter`) and wired in `src/main.jsx` via `RouterProvider`. This includes the previously-legacy routes (Login, Search, Reports, Import/Export, Purchases), which have been migrated into the data router. `src/App.jsx` is retained for reference only.
>

---

# src/

The main source directory of the application.

## App.jsx

**Location:**

`src/App.jsx`

**Purpose:**

Legacy application route configuration using `Routes`/`Route` (`react-router-dom`).

Currently defines routes for:

- `Login` — `/`
- `Search` — `/search`
- `Reports` — `/reports`
- `Import/Export` — `/import-export`
- `Purchase Order` — `/purchases/order`
- `Purchase Invoice` — `/purchases/invoice`

These dashboard-related pages are rendered through `DashboardLayout`.

> **Note:** These routes have been migrated into `src/routes/Router.jsx` (data router). `App.jsx` is retained for reference only — the actual routing is handled by `src/routes/Router.jsx`, mounted in `src/main.jsx` via `RouterProvider`.

---

## main.jsx

**Location:**

`src/main.jsx`

**Purpose:**

Application entry point.

Initializes the React application inside `StrictMode` and renders the root component via `RouterProvider`, passing the router defined in `src/routes/Router.jsx`.

---

## index.css

**Location:**

`src/index.css`

**Purpose:**

Global base CSS styles used throughout the application.

---

## hooks/

Reusable React hooks extracted for shared logic.

### useCart.js

**Location:**

`src/hooks/useCart.js`

**Purpose:**

Manages the cart state and cart operations used by the Billing module (add, remove, update quantities, totals, etc.).

### useLogin.js

**Location:**

`src/hooks/useLogin.js`

**Purpose:**

Handles the login form logic/state for the Authentication module.

---

## styles/

### theme.css

**Location:**

`src/styles/theme.css`

**Purpose:**

Design-system/theme tokens used across the application (colors, spacing, typography, etc.).

---

## store/

State management (Redux Toolkit).

### store.js

Redux store configuration.

### authSlice.js

Authentication slice (state + reducers).

### authThunk.js

Authentication async thunk actions.

### authService.js

Authentication API calls.

---

## services/

**Location:**

`src/services/`

**Purpose:**

API/service layer.

Currently empty; reserved for backend integration.

---

## utils/

**Location:**

`src/utils/`

**Purpose:**

Utility helpers.

Currently empty.

---

## assets/

**Location:**

`src/assets/`

**Purpose:**

Static assets (e.g. `WhatsApp_Image_...png` brand/logo asset).

---

# layouts/

Layouts provide common page structures shared by multiple pages.

Each layout typically composes a module-specific:

- `Sidebar`
- `Topbar`
- Main content area
- Footer (where applicable)

---

## layouts/authentication/

### AuthLayout.jsx

**Location:**

`src/layouts/authentication/AuthLayout.jsx`

**Purpose:**

Layout for authentication screens (Login).

Includes `AuthLayout.css` and composes authentication shared components (auth navbar, banner, footer).

---

## layouts/dashboard/

### DashboardLayout.jsx

**Location:**

`src/layouts/dashboard/DashboardLayout.jsx`

**Purpose:**

General dashboard layout (base path `/`) used by the Search, Reports, Import/Export, and Purchases routes in the data router.

Composes `Navbar`, `Sidebar`, and the main content area.

---

## layouts/supplierManagement/

### SupplierManagemetnLayout.jsx

**Location:**

`src/layouts/supplierManagement/SupplierManagemetnLayout.jsx`

**Purpose:**

Common layout for Supplier Management pages (base path `/`).

Renders the supplier `Sidebar`, `Topbar`, and the `<Outlet />` for supplier child routes.

---

## layouts/staffManagement/

### StaffManagementLayout.jsx

**Location:**

`src/layouts/staffManagement/StaffManagementLayout.jsx`

**Purpose:**

Common layout for Staff Management pages (base path `/staff`).

Renders the staff `Sidebar`, `Topbar`, and the `<Outlet />` for staff child routes.

---

## layouts/inventoryManagement/

### InventoryLayout.jsx

**Location:**

`src/layouts/inventoryManagement/InventoryLayout.jsx`

**Purpose:**

Common layout for Inventory Management pages (base path `/inventory`).

Renders the inventory `Sidebar`, `Topbar`, and the `<Outlet />` for inventory child routes.

---

## layouts/billing/

### BillingLayout.jsx

**Location:**

`src/layouts/billing/BillingLayout.jsx`

**Purpose:**

Common layout for Billing pages (base path `/billing`).

Renders the billing `Sidebar`, `Topbar`, and the `<Outlet />` for billing child routes.

---

# components/

Reusable UI components, grouped by feature.

---

## components/authentication/

Components for the Authentication module.

### login/

- `LoginForm/` — wraps `LoginForm.jsx`, `validation.js`, `index.js`, `LoginForm.css`
- `LoginHeader/` — wraps `LoginHeader.jsx`, `index.js`, `LoginHeader.css`
- `LoginFooter/` — wraps `LoginFooter.jsx`, `index.js`, `LoginFooter.css`
- `LoginIllustration/` — wraps `LoginIllustration.jsx`, `index.js`, `LoginIllustration.css`

### shared/

Shared auth components.

- `AuthBanner/` — wraps `AuthBanner.jsx`, `index.js`, `AuthBanner.css`
- `AuthFooter/` — wraps `AuthFooter.jsx`, `index.js`, `AuthFooter.css`
- `AuthNavbar/` — wraps `AuthNavbar.jsx`, `index.js`, `AuthNavbar.css`

---

## components/navbar/

### Navbar.jsx

Top navigation/header component used inside the legacy dashboard layout (`DashboardLayout`).

---

## components/sidebar/

Components for the legacy dashboard sidebar.

- `Sidebar.jsx` — main sidebar
- `SidebarBrand.jsx` — branding/logo section
- `SidebarDropdown.jsx` — expandable/collapsible nav groups
- `SidebarFooter.jsx` — footer section
- `SidebarLink.jsx` — individual navigation link
- `SidebarNav.jsx` — renders the navigation items

---

## components/reports/

Reusable components for the Reports module.

### Shared.jsx

Shared UI elements across report tabs (stat cards, tables, pagination).

### SalesTab.jsx

Sales report UI.

### PurchaseTab.jsx

Purchase report UI.

### InventoryTab.jsx

Inventory report UI.

### GSTTab.jsx

GST reporting UI.

### ProfitTab.jsx

Profit reporting UI.

### CustomerTab.jsx

Customer reporting UI.

### SupplierTab.jsx

Supplier reporting UI.

---

## components/purchases/

Reusable components for the Purchases module.

### BatchEntryTab.jsx

Batch purchase entry info.

### CreditNotesTab.jsx

Credit note management.

### ExpiryEntryTab.jsx

Expiry purchase info.

### LineItemsTable.jsx

Reusable line items table.

### NotesAndSummary.jsx

Purchase notes + summary.

### OrderDetailsSection.jsx

Purchase order details.

### PurchaseReturnTab.jsx

Purchase return UI.

### ReceiveGoodsTab.jsx

Goods receipt UI.

### Shared.jsx

Shared purchase UI utilities/components.

---

## components/importExport/

Reusable components for the Import/Export module.

- `ImportPage.jsx` — import interface
- `ExportPage.jsx` — export interface
- `Shared.jsx` — shared UI components

---

## components/supplierManagement/

Components for the Supplier Management module (active router).

### dashboard/

- `DashboardHeader.jsx` — dashboard page header
- `KpiCards.jsx` — KPI / summary stat cards
- `SupplierRow.jsx` — single supplier table row
- `SupplierTable.jsx` — supplier listing table
- `Sidebar.jsx` — supplier module sidebar navigation
- `Topbar.jsx` — supplier module top navigation bar

### suppliers/

- `SupplierHeader.jsx` — suppliers page header
- `SupplierModal.jsx` — add/edit supplier modal
- `SupplierProfileHeader.jsx` — supplier profile header
- `SupplierOverviewCards.jsx` — supplier overview summary cards
- `SupplierContactCard.jsx` — supplier contact information card
- `SupplierPurchaseOrders.jsx` — supplier purchase orders card/section
- `SupplierCard.jsx` — reusable supplier card

---

## components/staffManagement/

Components for the Staff Management module (active: `/staff`).

- `Sidebar.jsx` — staff module sidebar navigation
- `Topbar.jsx` — staff module top navigation bar

### dashboard/

Components used on the Staff Management dashboard screen.

### employee/

- `StaffHeader.jsx` — employee directory page header
- `StaffCard.jsx` — reusable employee/staff card

### attendance/

- `AttendanceHeader.jsx` — attendance page header
- `AttendanceFilters.jsx` — attendance filter controls
- `AttendanceStatsCards.jsx` — attendance summary stat cards
- `AttendanceStatusBadge.jsx` — attendance status badge
- `AttendanceTable.jsx` — attendance table
- `AttendanceTableRow.jsx` — single attendance row

### activityLogs/

- `ActivityLogsHeader.jsx` — activity logs page header
- `ActivityLogsStatsCards.jsx` — activity logs summary cards
- `ActivityLogsFilters.jsx` — activity logs filter controls
- `ActivityLogsTable.jsx` — activity logs table
- `ActivityLogsTableRow.jsx` — single activity log row

### kiosk/

- `LiveClock.jsx` — live clock display
- `EmployeeIdInput.jsx` — employee ID input card
- `ConfirmationDisplay.jsx` — attendance confirmation display
- `KioskCard.jsx` — reusable kiosk card wrapper
- `ActionButtons.jsx` — kiosk action buttons (check-in / check-out)
- `KioskFooter.jsx` — kiosk screen footer

---

## components/inventoryManagement/

Components for the Inventory Management module (active: `/inventory`).

### common/

Shared components used across inventory screens.

- `Sidebar.jsx` — inventory module sidebar navigation
- `Topbar.jsx` — inventory module top navigation bar
- `StatusBadge.jsx` — reusable status badge
- `StatCard.jsx` — reusable summary stat card
- `FilterBar.jsx` — reusable filter/sort bar
- `StockTabs.jsx` — reusable stock tab navigation
- `EntryModal.jsx` — reusable modal for entries
- `Pagination.jsx` — reusable pagination controls
- `DataTable.jsx` — reusable data table

---

## components/billing/

Components for the Billing module (active: `/billing`).

### common/

- `Sidebar.jsx` — billing module sidebar navigation
- `Topbar.jsx` — billing module top navigation bar
- `CartSummary.jsx` — cart summary panel

---

# data/

Static/mock data used by the frontend.

When backend/API integration is introduced, these files are potential locations to replace or supplement with API/service data.

---

## data/reports/

### data.js

Report configuration/data (tabs, tables, statistics, pagination constants).

### mockData.js

Mock report records used while backend data is not connected.

---

## data/purchases/

### data.js

Purchase-related static/mock data (orders, invoices, returns, receive goods, credit notes, options).

---

## data/importExport/

### data.js

Import/Export configuration and mock data.

---

## data/inventoryManagement/

### inventoryData.js

Data used across the Inventory Management module.

---

## data/staffManagement/

- `activityLogsData.js` — data for staff activity logs
- `attendanceData.js` — data for staff attendance

---

## data/billing/

### billingData.js

Billing module data (product catalogue, pricing, etc.).

---

# pages/

Contains application-level pages/screens.

A page represents a complete route or major screen rather than a small reusable UI component.

---

## pages/Authentication/

### Login.jsx

**Location:**

`src/pages/Authentication/Login.jsx`

**Purpose:**

Login screen (route `/login`).

Renders the self-contained `LoginForm` component. Companion CSS: `Login.css`.

---

## pages/Search/

### SearchPage.jsx

**Location:**

`src/pages/Search/SearchPage.jsx`

**Purpose:**

Search screen (legacy route `/search`).

---

## pages/Reports/

### ReportsPage.jsx

**Location:**

`src/pages/Reports/ReportsPage.jsx`

**Purpose:**

Main Reports page (legacy route `/reports`).

Combines report tabs and shared reporting UI:

- Sales
- Purchases
- Inventory
- GST
- Profit
- Customers
- Suppliers

---

## pages/Purchases/

- `PurchaseOrderPage.jsx` — Purchase Order screen (legacy route `/purchases/order`)
- `PurchaseInvoicePage.jsx` — Purchase Invoice screen (legacy route `/purchases/invoice`)

---

## pages/ImportExport/

### ImportExportPage.jsx

**Location:**

`src/pages/ImportExport/ImportExportPage.jsx`

**Purpose:**

Main Import/Export screen (legacy route `/import-export`).

---

## pages/SupplierManagement/

Supplier Management screens (active: `/`).

### Dashboard.jsx

Supplier management dashboard (landing screen for `/`).

### Suppliers.jsx

Supplier listing/management screen (`/suppliers`).

### SupplierInformation.jsx

Supplier profile/details screen (`/suppliers/:supplierId`).

---

## pages/StaffManagement/

Staff Management screens (active: `/staff`).

### dashboard/Dashboard.jsx

Staff management dashboard (`/staff`).

### employee/Employee.jsx

Employee directory screen (`/staff/directory`).

### StaffInformation.jsx

Staff profile/details screen (`/staff/:staffId`).

### attendance/Attendance.jsx

Attendance management screen (`/staff/attendance`).

### activityLogs/ActivityLogs.jsx

Activity logs screen (`/staff/activity-logs`).

### kiosk/Kiosk.jsx

Employee/staff kiosk screen (`/staff/kiosk`).

---

## pages/InventoryManagement/

Inventory Management screens (active: `/inventory`).

- `AvailableStock.jsx`
- `BatchManagement.jsx`
- `ClosingStock.jsx`
- `CurrentStock.jsx`
- `DamagedStock.jsx`
- `ExpiredStock.jsx`
- `LowStockAlerts.jsx`
- `NearExpiry.jsx`
- `OpeningStock.jsx`
- `OverstockAlerts.jsx`
- `PhysicalVerification.jsx`
- `ReservedStock.jsx`
- `StockAdjustment.jsx`
- `StockLedger.jsx`
- `StockTransfer.jsx`

Each file is a child route of the `/inventory` layout.

---

## pages/Billing/

Billing screens (active: `/billing`).

### BarcodeBilling.jsx

Barcode billing screen (routes `/billing` and `/billing/barcode`).

### ManualBilling.jsx

Manual billing screen (`/billing/manual`).

### QuickBilling.jsx

Quick billing screen (`/billing/quick`).

### PrescriptionBilling.jsx

Prescription billing screen (`/billing/prescription`).

---

# routes/

Contains application routing configuration.

## routes/Router.jsx

**Location:**

`src/routes/Router.jsx`

**Purpose:**

Central data-router configuration built with `createBrowserRouter` (react-router-dom v6+).

This is the **active** router wired in `src/main.jsx` via `RouterProvider`.

It organizes routes under six top-level layouts / screens:

1. Authentication (Login) — `/login`
2. Legacy dashboard pages — `/` (`DashboardLayout`)
3. Supplier Management — `/`
4. Staff Management — `/staff`
5. Inventory Management — `/inventory`
6. Billing — `/billing`

See `routing.md` for the complete route map.
