import { Navigate, createBrowserRouter } from "react-router-dom";
import { AppLayout } from "@/common/layouts/AppLayout";
import { RequireRole } from "@/common/middleware/RequireRole";
import { AllocationPage } from "@/modules/allocation/pages/AllocationPage";
import { AssetsPage } from "@/modules/assets/pages/AssetsPage";
import { BookingPage } from "@/modules/booking/pages/BookingPage";
import { DashboardPage } from "@/modules/dashboard/pages/DashboardPage";
import { OrganizationPage } from "@/modules/organization/pages/OrganizationPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: "dashboard", element: <DashboardPage /> },
      {
        path: "organization",
        element: (
          <RequireRole allowedRoles={["ADMIN"]}>
            <OrganizationPage />
          </RequireRole>
        ),
      },
      { path: "assets", element: <AssetsPage /> },
      { path: "allocation", element: <AllocationPage /> },
      { path: "booking", element: <BookingPage /> },
    ],
  },
]);
