import {
  BarChart3,
  Building2,
  CalendarClock,
  ClipboardList,
  PackageSearch,
} from "lucide-react";
import type { UserRole } from "@/common/types/auth";

export type NavigationItem = {
  label: string;
  path: string;
  icon: typeof BarChart3;
  allowedRoles: UserRole[];
};

export const navigationItems: NavigationItem[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: BarChart3,
    allowedRoles: ["ADMIN", "ASSET_MANAGER", "DEPARTMENT_HEAD", "EMPLOYEE"],
  },
  {
    label: "Organization",
    path: "/organization",
    icon: Building2,
    allowedRoles: ["ADMIN"],
  },
  {
    label: "Assets",
    path: "/assets",
    icon: PackageSearch,
    allowedRoles: ["ADMIN", "ASSET_MANAGER", "DEPARTMENT_HEAD"],
  },
  {
    label: "Allocation",
    path: "/allocation",
    icon: ClipboardList,
    allowedRoles: ["ADMIN", "ASSET_MANAGER", "DEPARTMENT_HEAD", "EMPLOYEE"],
  },
  {
    label: "Booking",
    path: "/booking",
    icon: CalendarClock,
    allowedRoles: ["ADMIN", "ASSET_MANAGER", "DEPARTMENT_HEAD", "EMPLOYEE"],
  },
];
