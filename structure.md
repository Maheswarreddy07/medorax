# Medorax ERP - Project Structure

## Overview

Medorax ERP is a cross-platform Enterprise Resource Planning (ERP) system built with **React 19** for the frontend, **Vite** as the build tool, and **Electron** for desktop packaging. The project currently focuses on the **Supplier Management** module, with scaffolded directories for future modules (Authentication, Inventory, Billing, HR, etc.).

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
├── assets/                   # Static assets (images, icons) — empty
├── components/               # Reusable UI components
│   ├── ui/                   # Global reusable UI components — empty
│   └── supplierManagement/   # Supplier Management domain components
│       ├── dashboard/        # Dashboard sub-components
│       │   ├── DashboardHeader.jsx
│       │   ├── KpiCards.jsx
│       │   ├── Sidebar.jsx
│       │   ├── SupplierRow.jsx
│       │   ├── SupplierTable.jsx
│       │   └── Topbar.jsx
│       ├── payments/         # Payment components — empty
│       ├── purchaseOrders/   # Purchase order components — empty
│       ├── reports/          # Report components — empty
│       └── suppliers/        # Supplier components — empty
├── hooks/                    # Custom React hooks — empty
├── layouts/                  # Layout components
│   └── supplierManagement/
│       └── SupplierManagemetnLayout.jsx   # Supplier Management layout wrapper
├── pages/                    # Page-level components
│   └── SupplierManagement/
│       ├── Dashboard.jsx     # Supplier Management dashboard page
│       └── Suppliers.jsx     # Suppliers listing page
├── routes/                   # Route definitions
│   └── Router.jsx            # Main router configuration
├── services/                 # API/service layer — empty
├── store/                    # Redux store configuration — empty
└── utils/                    # Utility functions — empty
```

---

## Implemented Files

### Pages (`src/pages/`)

| File | Description |
|------|-------------|
| `SupplierManagement/Dashboard.jsx` | Supplier Management dashboard page |
| `SupplierManagement/Suppliers.jsx` | Suppliers listing page |

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

### Layouts (`src/layouts/`)

| File | Description |
|------|-------------|
| `supplierManagement/SupplierManagemetnLayout.jsx` | Layout wrapper for Supplier Management pages (note: "Managemetn" typo in filename) |

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

## Empty / Scaffolded Directories

The following directories exist but are currently empty, serving as placeholders for future development:

| Directory | Planned Purpose |
|-----------|-----------------|
| `src/assets/` | Static assets (images, icons, fonts) |
| `src/components/ui/` | Global reusable UI components (Button, Card, Input, Modal, etc.) |
| `src/components/supplierManagement/payments/` | Payment-related components |
| `src/components/supplierManagement/purchaseOrders/` | Purchase order components |
| `src/components/supplierManagement/reports/` | Report components |
| `src/components/supplierManagement/suppliers/` | Supplier form/detail components |
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
