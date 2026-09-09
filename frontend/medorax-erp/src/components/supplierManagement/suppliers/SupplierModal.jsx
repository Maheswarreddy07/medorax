import { X } from "lucide-react";

const SupplierModal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  onSubmit,
  formData,
  setFormData,
  submitLabel
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs overflow-y-auto">
      <div className="w-full max-w-lg rounded-2xl bg-surface-container-lowest p-6 shadow-2xl transition-all my-8">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-on-background">{title}</h2>
            <p className="text-xs text-on-surface-variant">{subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-outline hover:bg-surface-container hover:text-on-surface-variant"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="mt-4 space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-on-surface-variant mb-1">
              Company / Supplier Name *
            </label>
            <input
              type="text"
              value={formData.name || ""}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full rounded-xl border border-outline-variant p-2.5 outline-none focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-on-surface-variant mb-1">
                Contact Person *
              </label>
              <input
                type="text"
                value={formData.contactPerson || ""}
                onChange={(e) =>
                  setFormData({ ...formData, contactPerson: e.target.value })
                }
                required
                className="w-full rounded-xl border border-outline-variant p-2.5 outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block font-semibold text-on-surface-variant mb-1">
                Category
              </label>
              <select
                value={formData.category || "Pharmaceuticals"}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full rounded-xl border border-outline-variant p-2.5 outline-none focus:border-primary bg-surface-container-lowest"
              >
                <option value="Pharmaceuticals">Pharmaceuticals</option>
                <option value="Medical Equipment">Medical Equipment</option>
                <option value="Reagents & Kits">Reagents & Kits</option>
                <option value="Consumables">Consumables</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-on-surface-variant mb-1">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email || ""}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="w-full rounded-xl border border-outline-variant p-2.5 outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block font-semibold text-on-surface-variant mb-1">
                Phone Number *
              </label>
              <input
                type="text"
                value={formData.phone || ""}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
                className="w-full rounded-xl border border-outline-variant p-2.5 outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-on-surface-variant mb-1">
                GSTIN / Tax ID
              </label>
              <input
                type="text"
                value={formData.gstin || ""}
                onChange={(e) =>
                  setFormData({ ...formData, gstin: e.target.value })
                }
                className="w-full rounded-xl border border-outline-variant p-2.5 outline-none focus:border-primary font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-on-surface-variant mb-1">
                Status
              </label>
              <select
                value={formData.status || "Active"}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full rounded-xl border border-outline-variant p-2.5 outline-none focus:border-primary bg-surface-container-lowest"
              >
                <option value="Active">Active</option>
                <option value="Pending Review">Pending Review</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-on-surface-variant mb-1">
              Address
            </label>
            <input
              type="text"
              value={formData.address || ""}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="w-full rounded-xl border border-outline-variant p-2.5 outline-none focus:border-primary"
            />
          </div>

          <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-outline-variant px-4 py-2 font-semibold text-on-surface-variant hover:bg-surface-container-low"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-primary px-5 py-2 font-semibold text-on-primary hover:bg-primary-container shadow-sm"
            >
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SupplierModal;
