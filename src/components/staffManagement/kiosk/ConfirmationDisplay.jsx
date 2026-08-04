const ConfirmationDisplay = ({ employee, timestamp, status }) => {
  if (!employee) return null;

  return (
    <div className="mt-6 rounded-xl border border-blue-600/10 bg-blue-50/50 p-6">
      <div className="flex items-center gap-6">
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-sm">
          <img
            src={employee.avatar}
            alt={employee.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex-1 grid grid-cols-2 gap-y-2 gap-x-8">
          <div>
            <p className="text-sm text-slate-500">Employee Name</p>
            <p className="text-2xl font-semibold text-slate-900">
              {employee.name}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Timestamp</p>
            <p className="text-2xl font-semibold text-slate-900 font-mono">
              {timestamp}
            </p>
          </div>
          <div className="col-span-2 mt-1 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-teal-600"></span>
            <p className="text-base font-semibold text-teal-700">{status}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDisplay;