import { NavLink } from "react-router-dom";
import { Boxes } from "lucide-react";
import { navigationItems } from "@/common/constants/navigation";
import { useAuthStore } from "@/common/store/authStore";
import { cn } from "@/common/utils/cn";

export function Sidebar() {
  const role = useAuthStore((state) => state.currentUser?.role);
  if (!role) {
    return null;
  }

  const visibleItems = navigationItems.filter((item) => item.allowedRoles.includes(role));

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-border bg-card/95 backdrop-blur lg:block">
      <div className="flex h-16 items-center gap-3 border-b border-border px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Boxes className="h-5 w-5" />
        </div>
        <div>
          <p className="text-base font-semibold">AssetFlow</p>
          <p className="text-xs text-muted-foreground">ERP Operations</p>
        </div>
      </div>
      <nav className="h-[calc(100vh-4rem)] space-y-1 overflow-y-auto p-4">
        {visibleItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              className={({ isActive }) =>
                cn(
                  "flex h-11 items-center gap-3 rounded-md px-3 text-sm font-medium text-muted-foreground transition",
                  "hover:bg-muted hover:text-foreground",
                  isActive && "bg-primary/10 text-primary",
                )
              }
              key={item.path}
              to={item.path}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
