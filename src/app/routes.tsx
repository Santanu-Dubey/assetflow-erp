import { ReactElement, Suspense, lazy } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import { AppLayout } from "@/common/layouts/AppLayout";
import { RequireAuth } from "@/common/middleware/RequireAuth";
import { RequireRole } from "@/common/middleware/RequireRole";
import type { UserRole } from "@/common/types/auth";

const LoginPage = lazy(() =>
  import("@/modules/auth/pages/LoginPage").then((module) => ({ default: module.LoginPage })),
);
const SignupPage = lazy(() =>
  import("@/modules/auth/pages/SignupPage").then((module) => ({ default: module.SignupPage })),
);
const DashboardPage = lazy(() =>
  import("@/modules/dashboard/pages/DashboardPage").then((module) => ({ default: module.DashboardPage })),
);
const OrganizationPage = lazy(() =>
  import("@/modules/organization/pages/OrganizationPage").then((module) => ({ default: module.OrganizationPage })),
);
const AssetsPage = lazy(() =>
  import("@/modules/assets/pages/AssetsPage").then((module) => ({ default: module.AssetsPage })),
);
const AllocationPage = lazy(() =>
  import("@/modules/allocation/pages/AllocationPage").then((module) => ({ default: module.AllocationPage })),
);
const BookingPage = lazy(() =>
  import("@/modules/booking/pages/BookingPage").then((module) => ({ default: module.BookingPage })),
);
const MaintenancePage = lazy(() =>
  import("@/modules/maintenance/pages/MaintenancePage").then((module) => ({ default: module.MaintenancePage })),
);
const AuditsPage = lazy(() =>
  import("@/modules/audits/pages/AuditsPage").then((module) => ({ default: module.AuditsPage })),
);
const NotificationsPage = lazy(() =>
  import("@/modules/notifications/pages/NotificationsPage").then((module) => ({
    default: module.NotificationsPage,
  })),
);
const ReportsPage = lazy(() =>
  import("@/modules/reports/pages/ReportsPage").then((module) => ({ default: module.ReportsPage })),
);
const SettingsPage = lazy(() =>
  import("@/modules/settings/pages/SettingsPage").then((module) => ({ default: module.SettingsPage })),
);
const ActivityLogsPage = lazy(() =>
  import("@/modules/activity-logs/pages/ActivityLogsPage").then((module) => ({
    default: module.ActivityLogsPage,
  })),
);
const ProfilePage = lazy(() =>
  import("@/modules/profile/pages/ProfilePage").then((module) => ({ default: module.ProfilePage })),
);

const allRoles: UserRole[] = ["ADMIN", "ASSET_MANAGER", "DEPARTMENT_HEAD", "EMPLOYEE"];

function routeElement(element: ReactElement, allowedRoles: UserRole[] = allRoles) {
  return (
    <Suspense fallback={<div className="rounded-lg border border-border bg-card p-6 text-sm">Loading workspace...</div>}>
      <RequireRole allowedRoles={allowedRoles}>{element}</RequireRole>
    </Suspense>
  );
}

export const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <Suspense fallback={<div className="p-6 text-sm">Loading login...</div>}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "/signup",
    element: (
      <Suspense fallback={<div className="p-6 text-sm">Loading signup...</div>}>
        <SignupPage />
      </Suspense>
    ),
  },
  {
    path: "/",
    element: (
      <RequireAuth>
        <AppLayout />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: "dashboard", element: routeElement(<DashboardPage />) },
      { path: "organization", element: routeElement(<OrganizationPage />, ["ADMIN"]) },
      { path: "assets", element: routeElement(<AssetsPage />, ["ADMIN", "ASSET_MANAGER", "DEPARTMENT_HEAD"]) },
      { path: "allocation", element: routeElement(<AllocationPage />) },
      { path: "booking", element: routeElement(<BookingPage />) },
      { path: "maintenance", element: routeElement(<MaintenancePage />) },
      { path: "audits", element: routeElement(<AuditsPage />, ["ADMIN", "ASSET_MANAGER", "DEPARTMENT_HEAD"]) },
      { path: "notifications", element: routeElement(<NotificationsPage />) },
      { path: "reports", element: routeElement(<ReportsPage />, ["ADMIN", "ASSET_MANAGER", "DEPARTMENT_HEAD"]) },
      { path: "settings", element: routeElement(<SettingsPage />) },
      { path: "activity-logs", element: routeElement(<ActivityLogsPage />, ["ADMIN", "ASSET_MANAGER"]) },
      { path: "profile", element: routeElement(<ProfilePage />) },
    ],
  },
]);
