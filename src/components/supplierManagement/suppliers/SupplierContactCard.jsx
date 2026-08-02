import {
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  FileText
} from "lucide-react";

const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 ring-1 ring-slate-100">
      <Icon size={15} className="text-slate-500" />
    </div>
    <div className="min-w-0">
      <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
        {label}
      </p>
      <p className="mt-0.5 text-sm font-medium text-slate-800 break-words">
        {value}
      </p>
    </div>
  </div>
);

const SupplierContactCard = ({ supplier }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-base font-bold text-slate-900">
        Contact Information
      </h2>

      <div className="space-y-4">
        <InfoRow
          icon={User}
          label="Contact Person"
          value={supplier.contactPerson}
        />
        <InfoRow icon={Mail} label="Email Address" value={supplier.email} />
        <InfoRow icon={Phone} label="Phone Number" value={supplier.phone} />
        <InfoRow icon={MapPin} label="Address" value={supplier.address} />
        <InfoRow icon={Building2} label="Supplier Code" value={supplier.code} />
        <InfoRow icon={FileText} label="GSTIN / Tax ID" value={supplier.gstin} />
      </div>
    </div>
  );
};

export default SupplierContactCard;
