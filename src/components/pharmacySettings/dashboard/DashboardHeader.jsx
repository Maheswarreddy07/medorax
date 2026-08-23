import { Download, FilePlus2 } from "lucide-react";

const DashboardHeader = () => {
  return (
    <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-on-background">
          System Overview
        </h2>
        <p className="mt-1 text-sm text-on-surface-variant">
          Welcome back, Sarah. Here's what's happening today across the enterprise.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-on-primary shadow-sm transition-colors hover:bg-primary-container"
        >
          <FilePlus2 size={18} />
          New Prescription
        </button>
        <button
          type="button"
          className="flex items-center gap-2 rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-2 text-sm font-semibold text-on-surface transition-colors hover:bg-surface-container-low"
        >
          <Download size={18} />
          Export Data
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;