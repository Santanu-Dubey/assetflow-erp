export type UserRole = "ADMIN" | "ASSET_MANAGER" | "DEPARTMENT_HEAD" | "EMPLOYEE";

export type AuthenticatedUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  departmentId?: string;
};

export type AuthAccount = AuthenticatedUser & {
  passwordHash: string;
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  createdAt: string;
  lastLoginAt?: string;
};
