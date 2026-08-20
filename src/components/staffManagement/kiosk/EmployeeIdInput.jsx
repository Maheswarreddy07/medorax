import { BadgeCheck } from "lucide-react";

const EmployeeIdInput = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor="employee-id"
        className="ml-3 text-sm font-semibold text-slate-900"
      >
        Enter Employee ID
      </label>
      <div className="relative group">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-blue-600">
          <BadgeCheck size={22} />
        </span>
        <input
          id="employee-id"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. MX-8829"
          className="w-full rounded-xl border border-slate-300 py-4 pl-12 pr-4 text-2xl font-medium tracking-wider outline-none transition-all focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
        />
      </div>
    </div>
  );
};

export default EmployeeIdInput;