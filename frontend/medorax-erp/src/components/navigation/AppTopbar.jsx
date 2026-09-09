import { useEffect, useState } from "react";
import { Bell, Menu } from "lucide-react";
import { API_BASE_URL } from "../../services/inventoryApi";

const AppTopbar = ({ onMenuClick }) => {
  const [profile, setProfile] = useState(() => {
    try {
      const user = JSON.parse(localStorage.getItem("current_user") || "null");
      return {
        name: user?.name || user?.full_name || user?.email || "Admin User",
        role: user?.role || user?.role_name || "Administrator",
      };
    } catch {
      return { name: "Admin User", role: "Administrator" };
    }
  });
  const [hasNotifications, setHasNotifications] = useState(false);

  useEffect(() => {
    const token =
      localStorage.getItem("access_token") || localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const loadProfile = async () => {
      if (!token) return;
      try {
        const response = await fetch(`${API_BASE_URL}/users/me`, { headers });
        if (!response.ok) return;
        const user = await response.json();
        localStorage.setItem("current_user", JSON.stringify(user));
        setProfile({
          name: user.name || user.full_name || user.email || "Admin User",
          role: user.role || user.role_name || "Administrator",
        });
      } catch {
        // Keep the existing display when the profile service is unavailable.
      }
    };
    const loadNotifications = async () => {
      if (!token) {
        try {
          const [lowStockResponse, nearExpiryResponse] = await Promise.all([
            fetch(`${API_BASE_URL}/inventory/alerts/low-stock/`),
            fetch(`${API_BASE_URL}/inventory/reports/expiry/?days=30`),
          ]);
          const [lowStock, nearExpiry] = await Promise.all([
            lowStockResponse.json(),
            nearExpiryResponse.json(),
          ]);
          setHasNotifications(
            (Array.isArray(lowStock) && lowStock.length > 0) ||
              (Array.isArray(nearExpiry?.items) && nearExpiry.items.length > 0),
          );
        } catch {
          setHasNotifications(false);
        }
        return;
      }
      try {
        const response = await fetch(
          `${API_BASE_URL}/notifications?unread_only=true`,
          { headers },
        );
        if (!response.ok) throw new Error("Notifications service unavailable");
        const notifications = await response.json();
        setHasNotifications(
          Array.isArray(notifications) && notifications.length > 0,
        );
      } catch {
        Promise.all([
          fetch(`${API_BASE_URL}/inventory/alerts/low-stock/`),
          fetch(`${API_BASE_URL}/inventory/reports/expiry/?days=30`),
        ])
          .then((responses) =>
            Promise.all(responses.map((response) => response.json())),
          )
          .then(([lowStock, nearExpiry]) =>
            setHasNotifications(
              (Array.isArray(lowStock) && lowStock.length > 0) ||
                (Array.isArray(nearExpiry?.items) &&
                  nearExpiry.items.length > 0),
            ),
          )
          .catch(() => setHasNotifications(false));
      }
    };
    loadProfile();
    loadNotifications();
  }, []);

  const initials = profile.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <header className="fixed left-0 right-0 top-0 z-30 flex h-16 items-center justify-between border-b border-outline-variant bg-surface-container-lowest px-4 shadow-sm md:left-[260px] md:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Open navigation"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-on-surface-variant transition-colors hover:bg-surface-container md:hidden"
        >
          <Menu size={22} />
        </button>
        <div>
          <p className="text-base font-bold tracking-tight text-primary">
            MEDORAX
          </p>
          <p className="hidden text-xs text-on-surface-variant sm:block">
            Pharmacy management workspace
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container"
        >
          <Bell size={20} />
          {hasNotifications && (
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-error" />
          )}
        </button>

        <div className="h-8 w-px bg-outline-variant" />

        <button
          type="button"
          className="flex items-center gap-3 rounded-xl px-2 py-1 transition-colors hover:bg-surface-container-low"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-on-primary">
            {initials || "A"}
          </span>
          <span className="hidden text-left lg:block">
            <span className="block text-sm font-semibold text-on-background">
              {profile.name}
            </span>
            <span className="block text-xs text-on-surface-variant">
              {profile.role}
            </span>
          </span>
        </button>
      </div>
    </header>
  );
};

export default AppTopbar;
