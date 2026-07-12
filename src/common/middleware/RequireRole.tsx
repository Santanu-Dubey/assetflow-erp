import { ReactNode } from "react";
import { useAuthStore } from "@/common/store/authStore";
import type { UserRole } from "@/common/types/auth";

type RequireRoleProps = {
  allowedRoles: UserRole[];
  children: ReactNode;
};

export function RequireRole({ allowedRoles, children }: RequireRoleProps) {
  const currentUser = useAuthStore((state) => state.currentUser);

  if (!allowedRoles.includes(currentUser.role)) {
    return (
      <div className="rounded-lg border border-destructive/25 bg-destructive/10 p-6 text-destructive">
        You do not have permission to view this workspace.
      </div>
    );
  }

  return children;
}
