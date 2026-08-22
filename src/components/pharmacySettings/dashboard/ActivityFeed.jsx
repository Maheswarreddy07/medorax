import {
  Building,
  ClipboardList,
  ShoppingCart,
  UserPlus,
} from "lucide-react";
import { recentActivity } from "../../../data/pharmacySettings/pharmacySettingsData";

const activityIconMap = {
  "shopping-cart": ShoppingCart,
  "building-2": Building,
  pencil: ClipboardList,
  "log-in": UserPlus,
};

const toneClasses = {
  primary: "bg-primary/10 text-primary border-primary/20",
  secondary: "bg-primary-fixed text-on-primary-fixed-variant border-primary-fixed-dim",
  neutral: "bg-surface-container-high text-on-surface-variant border-outline-variant",
  muted: "bg-surface-container-low text-on-surface-variant border-outline-variant",
};

const ActivityFeed = () => (
  <div className="flex h-[480px] flex-col overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest shadow-sm">
    <div className="border-b border-outline-variant bg-primary/5 px-4 py-3 text-sm font-bold text-primary">
      Recent Activity
    </div>
    <div className="flex-1 space-y-6 overflow-y-auto p-6">
      {recentActivity.map(({ title, detail, meta, tone, icon }) => {
        const Icon = activityIconMap[icon] ?? ShoppingCart;

        return (
          <div key={meta} className="flex gap-4">
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${toneClasses[tone]}`}
            >
              <Icon size={16} />
            </span>
            <div>
              <p className="text-sm text-on-background">
                <span className="font-bold">{title}</span> {detail}
              </p>
              <p className="text-[11px] font-medium text-on-surface-variant">{meta}</p>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default ActivityFeed;