import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/common/store/authStore";
import type { UserRole } from "@/common/types/auth";

type RequireRoleProps = {
  allowedRoles: UserRole[];
  children: ReactNode;
};

export function RequireRole({ allowedRoles, children }: RequireRoleProps) {
  const currentUser = useAuthStore((state) => state.currentUser);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated || !currentUser) {
    return <Navigate replace to="/login" state={{ from: location.pathname }} />;
  }

  if (!allowedRoles.includes(currentUser.role)) {
    return (
      <div className="rounded-lg border border-destructive/25 bg-destructive/10 p-6 text-destructive">
        You do not have permission to view this workspace.
      </div>
    );
  }

  return children;
}
