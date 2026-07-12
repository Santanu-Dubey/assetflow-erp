import {
  BarChart3,
  Building2,
  CalendarClock,
  ClipboardList,
  FileClock,
  LineChart,
  ListChecks,
  Settings,
  UserCircle,
  Wrench,
  Bell,
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
  {
    label: "Maintenance",
    path: "/maintenance",
    icon: Wrench,
    allowedRoles: ["ADMIN", "ASSET_MANAGER", "DEPARTMENT_HEAD", "EMPLOYEE"],
  },
  {
    label: "Audits",
    path: "/audits",
    icon: ListChecks,
    allowedRoles: ["ADMIN", "ASSET_MANAGER", "DEPARTMENT_HEAD"],
  },
  {
    label: "Notifications",
    path: "/notifications",
    icon: Bell,
    allowedRoles: ["ADMIN", "ASSET_MANAGER", "DEPARTMENT_HEAD", "EMPLOYEE"],
  },
  {
    label: "Reports",
    path: "/reports",
    icon: LineChart,
    allowedRoles: ["ADMIN", "ASSET_MANAGER", "DEPARTMENT_HEAD"],
  },
  {
    label: "Activity Logs",
    path: "/activity-logs",
    icon: FileClock,
    allowedRoles: ["ADMIN", "ASSET_MANAGER"],
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
    allowedRoles: ["ADMIN", "ASSET_MANAGER", "DEPARTMENT_HEAD", "EMPLOYEE"],
  },
  {
    label: "Profile",
    path: "/profile",
    icon: UserCircle,
    allowedRoles: ["ADMIN", "ASSET_MANAGER", "DEPARTMENT_HEAD", "EMPLOYEE"],
  },
];
