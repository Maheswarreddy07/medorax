# Medorax ERP - Project Structure

## Overview

Medorax ERP is a cross-platform Enterprise Resource Planning (ERP) system built with **React 19** for the frontend, **Vite** as the build tool, and **Electron** for desktop packaging. The project includes the **Supplier Management**, **Staff Management**, and **Inventory Management** modules, with scaffolded directories for future modules (Authentication, Billing, HR, etc.).

---

## Technology Stack

| Layer | Technology |
|-------|-----------|
| **UI Library** | React 19 (JSX) |
| **Build Tool** | Vite 8 |
| **Desktop Shell** | Electron 43 |
| **State Management** | Redux Toolkit 2 |
| **Routing** | React Router DOM 7 |
| **HTTP Client** | Axios 1 |
| **Form Handling** | React Hook Form 7 + Zod 4 |
| **Styling** | Tailwind CSS 4 |
| **Icons** | Lucide React, React Icons |
| **Animations** | Framer Motion 12 |
| **Linting** | ESLint 10 (Flat Config) |
| **Language** | JavaScript (`.jsx`, `.js`) |

---

## Top-Level Directory Layout

```
medorax-erp/
├── .gitignore
├── eslint.config.js          # ESLint flat config
├── index.html                # Vite HTML entry point
├── package.json              # Dependencies & scripts
├── package-lock.json
├── PROJECT_STRUCTURE.md      # Detailed planned architecture
├── README.md
├── structure.md              # This file
├── vite.config.js            # Vite configuration (alias @ → src)
└── src/                      # React application source code
```

---

## `src/` — React Application

```
src/
├── index.css                 # Global CSS (Tailwind directives)
├── main.jsx                  # Application entry point (renders <App /> into DOM)
├── assets/                   # Static assets (images, icons)
│   └── WhatsApp_Image_2026-06-22_at_5.25.21_PM-removebg-preview.png  # Branding image
├── components/               # Reusable UI components
│   ├── ui/                   # Global reusable UI components — empty
│   ├── supplierManagement/   # Supplier Management domain components
│   │   ├── dashboard/        # Dashboard sub-components
│   │   │   ├── DashboardHeader.jsx
│   │   │   ├── KpiCards.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── SupplierRow.jsx
│   │   │   ├── SupplierTable.jsx
│   │   │   └── Topbar.jsx
│   │   ├── payments/         # Payment components — empty
│   │   ├── purchaseOrders/   # Purchase order components — empty
│   │   ├── reports/          # Report components — empty
│   │   └── suppliers/        # Supplier components
│   │       ├── SupplierCard.jsx
│   │       ├── SupplierContactCard.jsx
│   │       ├── SupplierHeader.jsx
│   │       ├── SupplierModal.jsx
│   │       ├── SupplierOverviewCards.jsx
│   │       ├── SupplierProfileHeader.jsx
│   │       └── SupplierPurchaseOrders.jsx
│   ├── staffManagement/      # Staff Management domain components
│   │   ├── Sidebar.jsx       # Staff management sidebar navigation
│   │   ├── Topbar.jsx        # Staff management top navigation bar
│   │   ├── employee/         # Employee / staff directory components
│   │   │   ├── StaffCard.jsx
│   │   │   ├── StaffContactCard.jsx
│   │   │   ├── StaffDocuments.jsx
│   │   │   ├── StaffHeader.jsx
│   │   │   ├── StaffModal.jsx
│   │   │   ├── StaffOverviewCards.jsx
│   │   │   └── StaffProfileHeader.jsx
│   │   ├── attendance/       # Attendance sub-components
│   │   │   ├── AttendanceHeader.jsx
│   │   │   ├── AttendanceFilters.jsx
│   │   │   ├── AttendanceTable.jsx
│   │   │   ├── AttendanceTableRow.jsx
│   │   │   ├── AttendanceStatsCards.jsx
│   │   │   └── AttendanceStatusBadge.jsx
│   │   ├── activityLogs/     # Activity logs sub-components
│   │   │   ├── ActivityLogsHeader.jsx
│   │   │   ├── ActivityLogsFilters.jsx
│   │   │   ├── ActivityLogsTable.jsx
│   │   │   ├── ActivityLogsTableRow.jsx
│   │   │   └── ActivityLogsStatsCards.jsx
│   │   └── kiosk/            # Check In / Check Out kiosk components
│   │       ├── ActionButtons.jsx
│   │       ├── ConfirmationDisplay.jsx
│   │       ├── EmployeeIdInput.jsx
│   │       ├── KioskCard.jsx
│   │       ├── KioskFooter.jsx
│   │       └── LiveClock.jsx
│   └── inventoryManagement/  # Inventory Management domain components
│       └── common/           # Shared inventory components
│           ├── DataTable.jsx
│           ├── EntryModal.jsx
│           ├── entryModalConfigs.js
│           ├── FilterBar.jsx
│           ├── Pagination.jsx
│           ├── Sidebar.jsx
│           ├── StatCard.jsx
│           ├── StatusBadge.jsx
│           ├── StockTabs.jsx
│           └── Topbar.jsx
├── data/                     # Static/mock data
│   ├── inventoryManagement/
│   │   └── inventoryData.js
│   └── staffManagement/
│       ├── activityLogsData.js
│       └── attendanceData.js
├── hooks/                    # Custom React hooks — empty
├── layouts/                  # Layout components
│   ├── supplierManagement/
│   │   └── SupplierManagemetnLayout.jsx   # Supplier Management layout wrapper
│   ├── staffManagement/
│   │   └── StaffManagementLayout.jsx     # Staff Management layout wrapper
│   └── inventoryManagement/
│       └── InventoryLayout.jsx           # Inventory Management layout wrapper
├── pages/                    # Page-level components
│   ├── SupplierManagement/
│   │   ├── Dashboard.jsx     # Supplier Management dashboard page
│   │   ├── Suppliers.jsx     # Suppliers listing page
│   │   └── SupplierInformation.jsx  # Supplier information/detail page
│   ├── StaffManagement/
│   │   ├── dashboard/
│   │   │   └── Dashboard.jsx # Staff Management dashboard page
│   │   ├── employee/
│   │   │   └── Employee.jsx  # Employee directory page
│   │   ├── attendance/
│   │   │   └── Attendance.jsx    # Attendance tracking page
│   │   ├── activityLogs/
│   │   │   └── ActivityLogs.jsx  # Activity logs page
│   │   ├── kiosk/
│   │   │   └── Kiosk.jsx         # Check In / Check Out kiosk page
│   │   └── StaffInformation.jsx  # Staff information/detail page
│   └── InventoryManagement/
│       ├── CurrentStock.jsx       # Current stock overview page
│       ├── OpeningStock.jsx       # Opening stock page
│       ├── ClosingStock.jsx       # Closing stock page
│       ├── AvailableStock.jsx     # Available stock page
│       ├── ReservedStock.jsx      # Reserved stock page
│       ├── BatchManagement.jsx    # Batch management page
│       ├── StockAdjustment.jsx    # Stock adjustments page
│       ├── StockTransfer.jsx      # Stock transfers page
│       ├── PhysicalVerification.jsx  # Physical verification page
│       ├── DamagedStock.jsx       # Damaged stock page
│       ├── ExpiredStock.jsx       # Expired stock page
│       ├── NearExpiry.jsx         # Near-expiry stock page
│       ├── LowStockAlerts.jsx     # Low stock alerts page
│       ├── OverstockAlerts.jsx    # Overstock alerts page
│       └── StockLedger.jsx        # Stock ledger page
├── routes/                   # Route definitions
│   └── Router.jsx            # Main router configuration
├── services/                 # API/service layer — empty
├── store/                    # Redux store configuration — empty
└── utils/                    # Utility functions — empty
```

---

## Implemented Files

### Pages (`src/pages/`)

#### Supplier Management

| File | Description |
|------|-------------|
| `SupplierManagement/Dashboard.jsx` | Supplier Management dashboard page |
| `SupplierManagement/Suppliers.jsx` | Suppliers listing page |
| `SupplierManagement/SupplierInformation.jsx` | Supplier information/detail page (profile, KPIs, contact, purchase orders) |

#### Staff Management

| File | Description |
|------|-------------|
| `StaffManagement/dashboard/Dashboard.jsx` | Staff Management dashboard page (KPI cards, staff directory table) |
| `StaffManagement/employee/Employee.jsx` | Employee directory page (staff cards grid with live search, add/edit modals) |
| `StaffManagement/attendance/Attendance.jsx` | Attendance tracking page (records, filters, stats) |
| `StaffManagement/activityLogs/ActivityLogs.jsx` | Activity logs page (logs, filters, stats) |
| `StaffManagement/kiosk/Kiosk.jsx` | Check In / Check Out kiosk page (employee ID lookup, check-in/out actions, live clock) |
| `StaffManagement/StaffInformation.jsx` | Staff information/detail page (profile, KPIs, contact, documents) |

#### Inventory Management

| File | Description |
|------|-------------|
| `InventoryManagement/CurrentStock.jsx` | Current stock overview page |
| `InventoryManagement/OpeningStock.jsx` | Opening stock page |
| `InventoryManagement/ClosingStock.jsx` | Closing stock page |
| `InventoryManagement/AvailableStock.jsx` | Available stock page |
| `InventoryManagement/ReservedStock.jsx` | Reserved stock page |
| `InventoryManagement/BatchManagement.jsx` | Batch management page |
| `InventoryManagement/StockAdjustment.jsx` | Stock adjustments page |
| `InventoryManagement/StockTransfer.jsx` | Stock transfers page |
| `InventoryManagement/PhysicalVerification.jsx` | Physical verification page |
| `InventoryManagement/DamagedStock.jsx` | Damaged stock page |
| `InventoryManagement/ExpiredStock.jsx` | Expired stock page |
| `InventoryManagement/NearExpiry.jsx` | Near-expiry stock page |
| `InventoryManagement/LowStockAlerts.jsx` | Low stock alerts page |
| `InventoryManagement/OverstockAlerts.jsx` | Overstock alerts page |
| `InventoryManagement/StockLedger.jsx` | Stock ledger page |

### Components (`src/components/`)

#### `supplierManagement/dashboard/`

| File | Description |
|------|-------------|
| `DashboardHeader.jsx` | Header component for the dashboard |
| `KpiCards.jsx` | KPI summary cards (key metrics display) |
| `Sidebar.jsx` | Sidebar navigation for the dashboard |
| `SupplierRow.jsx` | Individual supplier row in the table |
| `SupplierTable.jsx` | Supplier data table component |
| `Topbar.jsx` | Top navigation bar for the dashboard |

#### `supplierManagement/suppliers/`

| File | Description |
|------|-------------|
| `SupplierCard.jsx` | Supplier card component for the listing grid |
| `SupplierContactCard.jsx` | Contact information panel for the supplier detail page |
| `SupplierHeader.jsx` | Header with title and "Add New Supplier" action |
| `SupplierModal.jsx` | Reusable modal form for add/edit supplier |
| `SupplierOverviewCards.jsx` | KPI metric cards (balance, orders, last order, payment terms) |
| `SupplierProfileHeader.jsx` | Profile header with avatar, status, rating, and edit action |
| `SupplierPurchaseOrders.jsx` | Recent purchase orders table for the supplier detail page |

#### `staffManagement/`

| File | Description |
|------|-------------|
| `Sidebar.jsx` | Sidebar navigation for the staff management module (Dashboard, Employee, Attendance, Check In/Out, Logout) |
| `Topbar.jsx` | Top navigation bar with quick nav links (Attendance, Check In/Out, Logs) |

#### `staffManagement/employee/`

| File | Description |
|------|-------------|
| `StaffCard.jsx` | Staff card component for the listing grid |
| `StaffContactCard.jsx` | Contact information panel for the staff detail page |
| `StaffDocuments.jsx` | Documents table for the staff detail page |
| `StaffHeader.jsx` | Header with title and "Add New Staff" action |
| `StaffModal.jsx` | Reusable modal form for add/edit staff |
| `StaffOverviewCards.jsx` | KPI metric cards (years of service, certifications, last shift, documents) |
| `StaffProfileHeader.jsx` | Profile header with avatar, status, role, and edit action |

#### `staffManagement/attendance/`

| File | Description |
|------|-------------|
| `AttendanceHeader.jsx` | Header with title and export action |
| `AttendanceFilters.jsx` | Filter controls for attendance records |
| `AttendanceTable.jsx` | Attendance data table component |
| `AttendanceTableRow.jsx` | Individual attendance record row |
| `AttendanceStatsCards.jsx` | KPI metric cards for attendance |
| `AttendanceStatusBadge.jsx` | Status badge (Present, Late, Absent) |

#### `staffManagement/activityLogs/`

| File | Description |
|------|-------------|
| `ActivityLogsHeader.jsx` | Header with title and export action |
| `ActivityLogsFilters.jsx` | Filter controls for activity logs |
| `ActivityLogsTable.jsx` | Activity logs data table component |
| `ActivityLogsTableRow.jsx` | Individual activity log row |
| `ActivityLogsStatsCards.jsx` | KPI metric cards for activity logs |

#### `staffManagement/kiosk/`

| File | Description |
|------|-------------|
| `ActionButtons.jsx` | Check In / Check Out action buttons with disabled states |
| `ConfirmationDisplay.jsx` | Employee verification card (avatar, name, timestamp, status) |
| `EmployeeIdInput.jsx` | Labeled employee ID input field with icon and focus states |
| `KioskCard.jsx` | Glass-panel card composing input, actions, and confirmation |
| `KioskFooter.jsx` | Footer with secure terminal branding |
| `LiveClock.jsx` | Real-time clock updating every second with date display |

#### `inventoryManagement/common/`

| File | Description |
|------|-------------|
| `DataTable.jsx` | Reusable enterprise data table |
| `EntryModal.jsx` | Reusable modal form for add/edit entries |
| `entryModalConfigs.js` | Modal field configuration definitions |
| `FilterBar.jsx` | Filter controls for inventory tables |
| `Pagination.jsx` | Pagination controls |
| `Sidebar.jsx` | Sidebar navigation for the inventory module |
| `StatCard.jsx` | KPI summary card component |
| `StatusBadge.jsx` | Status badge component |
| `StockTabs.jsx` | Tab navigation for stock views |
| `Topbar.jsx` | Top navigation bar for the inventory module |

### Data (`src/data/`)

| File | Description |
|------|-------------|
| `inventoryManagement/inventoryData.js` | Mock inventory data |
| `staffManagement/activityLogsData.js` | Mock activity logs data |
| `staffManagement/attendanceData.js` | Mock attendance data |

### Layouts (`src/layouts/`)

| File | Description |
|------|-------------|
| `supplierManagement/SupplierManagemetnLayout.jsx` | Layout wrapper for Supplier Management pages (note: "Managemetn" typo in filename) |
| `staffManagement/StaffManagementLayout.jsx` | Layout wrapper for Staff Management pages |
| `inventoryManagement/InventoryLayout.jsx` | Layout wrapper for Inventory Management pages |

### Routing (`src/routes/`)

| File | Description |
|------|-------------|
| `Router.jsx` | Main router configuration using React Router DOM v7 |

### Entry Points

| File | Description |
|------|-------------|
| `src/main.jsx` | React entry point — renders the app into the DOM |
| `src/index.css` | Global CSS with Tailwind directives |
| `index.html` | Vite HTML shell (mounts `#root`) |

---

## Routing Overview

The application is organized into three primary route groups, each wrapped in a module-specific layout:

| Base Path | Layout | Routes |
|-----------|--------|--------|
| `/` | Supplier Management | Dashboard (index), `suppliers`, `suppliers/:supplierId` |
| `/staff` | Staff Management | Dashboard (index), `directory`, `attendance`, `kiosk`, `activity-logs`, `:staffId` |
| `/inventory` | Inventory Management | Current Stock (index), `opening`, `closing`, `available`, `reserved`, `batches`, `adjustments`, `transfers`, `verification`, `damaged`, `expired`, `near-expiry`, `low-stock`, `overstock`, `stock-ledger` |

---

## Empty / Scaffolded Directories

The following directories exist but are currently empty, serving as placeholders for future development:

| Directory | Planned Purpose |
|-----------|-----------------|
| `src/components/ui/` | Global reusable UI components (Button, Card, Input, Modal, etc.) |
| `src/components/supplierManagement/payments/` | Payment-related components |
| `src/components/supplierManagement/purchaseOrders/` | Purchase order components |
| `src/components/supplierManagement/reports/` | Report components |
| `src/hooks/` | Global custom React hooks |
| `src/services/` | API service layer (Axios instances, interceptors) |
| `src/store/` | Redux store configuration & slices |
| `src/utils/` | Global utility functions |

---

## Electron Integration

The project is configured for Electron desktop packaging (see `package.json`):

- **`main`**: `electron/main/main.cjs` (entry point — not yet implemented)
- **`dev:desktop`**: Runs Vite dev server + Electron concurrently
- **`dist`**: Builds Vite bundle then packages with electron-builder

The `electron/` directory does not yet exist in the project. It is planned to contain:
- `electron/main/main.cjs` — Electron main process entry
- `electron/main/preload.cjs` — Preload script (context bridge)
- `electron/main/window.cjs` — BrowserWindow management
- `electron/ipc/` — IPC handler modules
- `electron/assets/` — App icons

---

## Scripts (from `package.json`)

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `vite` | Start Vite dev server |
| `build` | `vite build` | Build for production |
| `preview` | `vite preview` | Preview production build |
| `lint` | `eslint .` | Run ESLint |
| `electron` | `electron .` | Launch Electron (requires build first) |
| `dev:desktop` | `concurrently "npm run dev" "wait-on http://localhost:5173 && electron ."` | Start dev server + Electron concurrently |
| `dist` | `npm run build && electron-builder` | Build web app + package Electron app |

---

## Vite Configuration

- **Alias**: `@` maps to `./src`
- **Dev Server**: Host `0.0.0.0`, Port `5173`, auto-open
- **Preview**: Host `0.0.0.0`, Port `4173`
- **Build Output**: `dist/` directory
- **Plugins**: `@vitejs/plugin-react` (Fast Refresh), `@tailwindcss/vite`

---

## Project Conventions

- **File naming**: PascalCase for components (e.g., `KpiCards.jsx`), camelCase for utilities
- **Styling**: Tailwind CSS utility classes (no CSS Modules currently in use)
- **Routing**: React Router DOM v7 with file-based route configuration in `Router.jsx`
- **State management**: Redux Toolkit (store directory scaffolded, not yet implemented)
- **Form handling**: React Hook Form + Zod for validation (dependencies installed)
- **Icons**: Lucide React for icons, React Icons as supplementary icon library