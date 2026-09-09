import { useState } from "react";

import KioskCard from "../../../components/staffManagement/kiosk/KioskCard";
import LiveClock from "../../../components/staffManagement/kiosk/LiveClock";
import KioskFooter from "../../../components/staffManagement/kiosk/KioskFooter";

const MOCK_EMPLOYEES = [
  {
    id: "MX-8829",
    name: "John Doe",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAPVT-U5eF0UVwqbh8ASL6IOGx6OB47vHZqdUlieMZNyD_iSfBFX0Y6xiBBrYO0pZKxqpotJXwTUPD5yS7nCYxYskpyRPV9OEgH-5o39pXoWKv8jTO76sSUJaiWSawxm4isX6KTU3u1kejDcCpkkcANS2J8p4-DqbhHo-uXyN7y27YuMHSwPgJ3JpHR82rW6dJ7cwi26W9efkgAHMOf8vmUeYFkQyi7MtyxZ4YP3MeeZdLv0tQE6456",
  },
];

const Kiosk = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [confirmedEmployee, setConfirmedEmployee] = useState(null);
  const [timestamp, setTimestamp] = useState("");
  const [status, setStatus] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAction = (actionType) => {
    if (!employeeId.trim()) return;

    setIsProcessing(true);

    const employee = MOCK_EMPLOYEES.find(
      (record) => record.id.toLowerCase() === employeeId.trim().toLowerCase()
    );

    if (!employee) {
      setConfirmedEmployee(null);
      setStatus("Employee not found. Please verify the ID.");
      setIsProcessing(false);
      return;
    }

    const now = new Date();
    const timeString = now.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
    });

    setConfirmedEmployee(employee);
    setTimestamp(timeString);
    setStatus(
      actionType === "check-in"
        ? `Status: Checked In at ${timeString}`
        : `Status: Checked Out at ${timeString}`
    );

    setTimeout(() => setIsProcessing(false), 600);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden p-8">
        <KioskCard
          employeeId={employeeId}
          onEmployeeIdChange={setEmployeeId}
          onCheckIn={() => handleAction("check-in")}
          onCheckOut={() => handleAction("check-out")}
          isProcessing={isProcessing}
          confirmedEmployee={confirmedEmployee}
          timestamp={timestamp}
          status={status}
        />

        <LiveClock />
      </div>

      <KioskFooter />
    </div>
  );
};

export default Kiosk;