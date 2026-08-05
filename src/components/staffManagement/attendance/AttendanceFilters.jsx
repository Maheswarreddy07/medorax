import { Search, CalendarDays, Filter } from "lucide-react";

const AttendanceFilters = () => {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
      {/* Search */}
      <div className="md:col-span-2 flex items-center gap-2 rounded-xl border border-blue-100 bg-white p-2.5 shadow-sm transition-all duration-200 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-400/20">
        <Search size={18} className="text-blue-400" />
        <input
          type="text"
          placeholder="Search employee name or ID..."
          className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
        />
      </div>

      {/* Date */}
      <div className="flex items-center gap-2 rounded-xl border border-teal-100 bg-white p-2.5 shadow-sm transition-all duration-200 focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-400/20">
        <CalendarDays size={18} className="text-teal-500" />
        <input
          type="date"
          className="w-full bg-transparent text-sm text-slate-600 outline-none"
        />
      </div>

      {/* Status */}
      <div className="flex items-center gap-2 rounded-xl border border-emerald-100 bg-white p-2.5 shadow-sm transition-all duration-200 focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-400/20">
        <Filter size={18} className="text-emerald-500" />
        <select
          className="w-full cursor-pointer appearance-none bg-transparent text-sm text-slate-600 outline-none"
          defaultValue=""
        >
          <option value="">All Status</option>
          <option value="present">Present</option>
          <option value="absent">Absent</option>
          <option value="late">Late</option>
        </select>
      </div>
    </div>
  );
};

export default AttendanceFilters;