import { create } from "zustand";
import type { AuthenticatedUser } from "@/common/types/auth";

type AuthState = {
  currentUser: AuthenticatedUser;
  setCurrentUser: (user: AuthenticatedUser) => void;
};

const mockedUser: AuthenticatedUser = {
  id: "usr-admin-demo",
  name: "Aarav Sharma",
  email: "aarav.sharma@assetflow.local",
  role: "ADMIN",
  departmentId: "dept-operations",
};

export const useAuthStore = create<AuthState>((set) => ({
  currentUser: mockedUser,
  setCurrentUser: (user) => set({ currentUser: user }),
}));
