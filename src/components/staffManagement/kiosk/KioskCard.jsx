import EmployeeIdInput from "./EmployeeIdInput";
import ActionButtons from "./ActionButtons";
import ConfirmationDisplay from "./ConfirmationDisplay";

const KioskCard = ({
  employeeId,
  onEmployeeIdChange,
  onCheckIn,
  onCheckOut,
  isProcessing,
  confirmedEmployee,
  timestamp,
  status,
}) => {
  return (
    <div className="relative z-10 w-full max-w-2xl rounded-xl border border-slate-200 bg-white/80 p-8 shadow-lg backdrop-blur-xl">
      <div className="mb-8 text-center">
        <h2 className="mb-1 text-3xl font-bold text-slate-900">
          Attendance Kiosk
        </h2>
        <p className="text-base text-slate-500">
          Please verify your identity to log your shift status.
        </p>
      </div>

      <div className="space-y-6">
        <EmployeeIdInput value={employeeId} onChange={onEmployeeIdChange} />

        <ActionButtons
          onCheckIn={onCheckIn}
          onCheckOut={onCheckOut}
          disabled={isProcessing}
        />

        <ConfirmationDisplay
          employee={confirmedEmployee}
          timestamp={timestamp}
          status={status}
        />
      </div>
    </div>
  );
};

export default KioskCard;