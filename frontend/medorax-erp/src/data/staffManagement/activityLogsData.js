const activityLogs = [
  {
    id: "001",
    name: "Sarah Johnson",
    role: "Lead Nurse",
    action: "Modified shift schedule for Dept. B",
    actionType: "update",
    dotClass: "bg-secondary-container0",
    module: "Attendance",
    timestamp: "Oct 24, 2023 • 09:42 AM",
    ipAddress: "192.168.1.45",
    avatar: "https://i.pravatar.cc/100?img=47"
  },
  {
    id: "002",
    name: "Dr. Robert Chen",
    role: "Head of Surgery",
    action: "Authorized leave request: ID-4421",
    actionType: "authorize",
    dotClass: "bg-primary",
    module: "Employee",
    timestamp: "Oct 24, 2023 • 11:15 AM",
    ipAddress: "192.168.2.112",
    avatar: "https://i.pravatar.cc/100?img=12"
  },
  {
    id: "003",
    name: "Emma Williams",
    role: "HR Coordinator",
    action: "Deleted temporary staff entry: TS-90",
    actionType: "delete",
    dotClass: "bg-error-container0",
    module: "Employee",
    timestamp: "Oct 23, 2023 • 04:30 PM",
    ipAddress: "10.0.0.52",
    avatar: "https://i.pravatar.cc/100?img=32"
  },
  {
    id: "004",
    name: "Alice Moore",
    role: "Dept. Supervisor",
    action: "Updated permission level for security team",
    actionType: "permission",
    dotClass: "bg-secondary",
    module: "Permissions",
    timestamp: "Oct 23, 2023 • 02:10 PM",
    ipAddress: "192.168.1.99",
    initials: "AM"
  },
  {
    id: "005",
    name: "Mark Stevenson",
    role: "IT Admin",
    action: "System login: Success",
    actionType: "auth",
    dotClass: "bg-blue-400",
    module: "Auth",
    timestamp: "Oct 23, 2023 • 08:00 AM",
    ipAddress: "10.0.0.1",
    avatar: "https://i.pravatar.cc/100?img=59"
  }
];

export default activityLogs;