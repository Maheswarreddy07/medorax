import {
  Users,
  UserCheck,
  UserX,
  Building2,
  ArrowRight,
  Shield,
  Settings
} from "lucide-react";

const ACTIVITY_ITEMS = [
  {
    id: 1,
    user: "John Doe",
    action: "checked in",
    time: "08:02 AM",
    location: "Main Entrance",
    badge: "Success",
    badgeClass: "bg-secondary-container text-on-secondary-fixed-variant",
    avatar: "https://i.pravatar.cc/100?img=33"
  },
  {
    id: 2,
    user: "Admin",
    action: "updated role for Jane Smith",
    time: "09:15 AM",
    location: "HR Panel",
    badge: "Security",
    badgeClass: "bg-primary-fixed text-primary",
    icon: Shield
  },
  {
    id: 3,
    user: "Dr. Aris",
    action: "requested annual leave",
    time: "10:45 AM",
    location: "Mobile App",
    badge: "Request",
    badgeClass: "bg-secondary-container text-teal-700",
    avatar: "https://i.pravatar.cc/100?img=45"
  },
  {
    id: 4,
    user: "System",
    action: "completed weekly payroll audit",
    time: "11:30 AM",
    location: "Automated",
    badge: "System",
    badgeClass: "bg-surface-container text-on-surface-variant",
    icon: Settings
  },
  {
    id: 5,
    user: "Marcus",
    action: "updated profile information",
    time: "12:05 PM",
    location: "Profile Settings",
    badge: "Update",
    badgeClass: "bg-primary-fixed/60 text-primary",
    avatar: "https://i.pravatar.cc/100?img=53"
  }
];

const DEPT_DISTRIBUTION = [
  { name: "Emergency", count: 42, percentage: 45, barColor: "bg-primary" },
  { name: "Pediatrics", count: 28, percentage: 30, barColor: "bg-primary-container" },
  { name: "Surgery", count: 31, percentage: 35, barColor: "bg-secondary" }
];

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-on-background">
          Dashboard
        </h2>
        <p className="mt-1 text-base text-on-surface-variant">
          Overview of your organization
        </p>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Employees */}
        <div className="group relative flex flex-col gap-2 overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/30 hover:shadow-lg">
          <div className="absolute right-0 top-0 p-4 opacity-10 transition-opacity group-hover:opacity-20">
            <Users size={64} className="text-primary" />
          </div>
          <span className="text-sm font-semibold uppercase tracking-wider text-on-surface-variant">
            Total Employees
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-on-background">124</span>
            <span className="text-sm font-bold text-secondary">+4.2%</span>
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full bg-surface-container">
            <div className="h-full w-[85%] bg-primary"></div>
          </div>
        </div>

        {/* Present Today */}
        <div className="group relative flex flex-col gap-2 overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest p-6 transition-all duration-300 hover:-translate-y-1 hover:border-teal-400/30 hover:shadow-lg">
          <div className="absolute right-0 top-0 p-4 opacity-10 transition-opacity group-hover:opacity-20">
            <UserCheck size={64} className="text-secondary" />
          </div>
          <span className="text-sm font-semibold uppercase tracking-wider text-on-surface-variant">
            Present Today
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-on-background">118</span>
            <span className="text-sm font-bold text-secondary">95%</span>
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full bg-surface-container">
            <div className="h-full w-[95%] bg-primary-container"></div>
          </div>
        </div>

        {/* On Leave/Absent */}
        <div className="group relative flex flex-col gap-2 overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest p-6 transition-all duration-300 hover:-translate-y-1 hover:border-red-400/30 hover:shadow-lg">
          <div className="absolute right-0 top-0 p-4 opacity-10 transition-opacity group-hover:opacity-20">
            <UserX size={64} className="text-error" />
          </div>
          <span className="text-sm font-semibold uppercase tracking-wider text-on-surface-variant">
            On Leave/Absent
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-on-background">6</span>
            <span className="text-sm font-bold text-error">Urgent</span>
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full bg-surface-container">
            <div className="h-full w-[5%] bg-red-600"></div>
          </div>
        </div>

        {/* Total Departments */}
        <div className="group relative flex flex-col gap-2 overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/30 hover:shadow-lg">
          <div className="absolute right-0 top-0 p-4 opacity-10 transition-opacity group-hover:opacity-20">
            <Building2 size={64} className="text-secondary" />
          </div>
          <span className="text-sm font-semibold uppercase tracking-wider text-on-surface-variant">
            Total Departments
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-on-background">8</span>
            <span className="text-sm font-bold text-on-surface-variant">Active</span>
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full bg-surface-container">
            <div className="h-full w-full bg-secondary"></div>
          </div>
        </div>
      </div>

      {/* Bottom Content Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Recent Activity Feed */}
        <div className="overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest lg:col-span-2">
          <div className="flex items-center justify-between border-b border-outline-variant p-6">
            <h3 className="text-xl font-bold text-on-background">Recent Activity</h3>
            <button className="text-sm font-semibold text-primary transition hover:underline">
              View All
            </button>
          </div>

          <div className="divide-y divide-outline-variant">
            {ACTIVITY_ITEMS.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-6 transition-colors hover:bg-surface-container-low"
                >
                  {/* Avatar or Icon */}
                  {item.avatar ? (
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full">
                      <img
                        src={item.avatar}
                        alt={item.user}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-on-primary ${
                        item.badge === "Security"
                          ? "bg-primary"
                          : "bg-slate-800"
                      }`}
                    >
                      {Icon && <Icon size={20} />}
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1">
                    <p className="text-base text-on-background">
                      <span className="font-bold">{item.user}</span>{" "}
                      {item.action}
                    </p>
                    <p className="text-sm text-on-surface-variant">
                      {item.time} &bull; {item.location}
                    </p>
                  </div>

                  {/* Badge */}
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${item.badgeClass}`}
                  >
                    {item.badge}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Secondary Insight Cards */}
        <div className="space-y-8">
          {/* Shift Coverage */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-on-primary shadow-xl">
            <div className="relative z-10">
              <h4 className="mb-4 text-xl font-bold">Shift Coverage</h4>
              <p className="mb-6 text-sm text-blue-200">
                Morning shift is currently at 98% capacity. Afternoon shift
                requires 2 more nurses.
              </p>
              <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-on-primary transition hover:opacity-90">
                Manage Shifts
                <ArrowRight size={16} />
              </button>
            </div>
            {/* Background decoration */}
            <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl"></div>
          </div>

          {/* Department Distribution */}
          <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6">
            <h4 className="mb-6 text-xl font-bold text-on-background">
              Dept. Distribution
            </h4>
            <div className="space-y-4">
              {DEPT_DISTRIBUTION.map((dept) => (
                <div key={dept.name}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-on-surface-variant">
                      {dept.name}
                    </span>
                    <span className="font-bold text-on-background">
                      {dept.count}
                    </span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-surface-container">
                    <div
                      className={`h-full rounded-full ${dept.barColor}`}
                      style={{ width: `${dept.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;