import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Stethoscope,
  User
} from "lucide-react";

const StaffContactCard = ({ staff }) => {
  const contactItems = [
    {
      icon: User,
      label: "Full Name",
      value: staff.name,
      iconColor: "text-blue-500"
    },
    {
      icon: Mail,
      label: "Email Address",
      value: staff.email,
      iconColor: "text-blue-500"
    },
    {
      icon: Phone,
      label: "Phone Number",
      value: staff.phone,
      iconColor: "text-blue-500"
    },
    {
      icon: Stethoscope,
      label: "Department",
      value: staff.department,
      iconColor: "text-emerald-500"
    },
    {
      icon: Shield,
      label: "Role",
      value: staff.role,
      iconColor: "text-violet-500"
    },
    {
      icon: Calendar,
      label: "License Number",
      value: staff.license,
      iconColor: "text-amber-500"
    },
    {
      icon: MapPin,
      label: "Address",
      value: staff.address,
      iconColor: "text-slate-500"
    }
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-base font-bold text-slate-900">
          Contact Information
        </h2>
        <p className="mt-0.5 text-sm text-slate-500">
          Primary contact details for {staff.name}
        </p>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {contactItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <div key={index} className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 ring-1 ring-slate-100">
                  <Icon size={14} className={item.iconColor} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-sm text-slate-700 break-words">
                    {item.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StaffContactCard;
