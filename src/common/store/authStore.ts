import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthAccount, AuthenticatedUser } from "@/common/types/auth";

type AuthState = {
  accounts: AuthAccount[];
  currentUser: AuthenticatedUser | null;
  token: string | null;
  isAuthenticated: boolean;
  setCurrentUser: (user: AuthenticatedUser) => void;
  signup: (input: { name: string; email: string; password: string; departmentId?: string }) => {
    ok: boolean;
    message: string;
    user?: AuthenticatedUser;
  };
  login: (input: { email: string; password: string }) => { ok: boolean; message: string };
  logout: () => void;
};

const hashPassword = (password: string) => btoa(`assetflow:${password}`);

const seedAccounts: AuthAccount[] = [
  {
    id: "emp-aarav",
    name: "Aarav Sharma",
    email: "aarav@assetflow.local",
    role: "ADMIN",
    departmentId: "dept-ops",
    passwordHash: hashPassword("admin123"),
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
  },
  {
    id: "emp-meera",
    name: "Meera Iyer",
    email: "meera@assetflow.local",
    role: "ASSET_MANAGER",
    departmentId: "dept-it",
    passwordHash: hashPassword("manager123"),
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
  },
  {
    id: "emp-priya",
    name: "Priya Nair",
    email: "priya@assetflow.local",
    role: "EMPLOYEE",
    departmentId: "dept-ops",
    passwordHash: hashPassword("employee123"),
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
  },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accounts: seedAccounts,
      currentUser: null,
      token: null,
      isAuthenticated: false,
      setCurrentUser: (user) => set({ currentUser: user, isAuthenticated: true }),
      signup: (input) => {
        const email = input.email.trim().toLowerCase();
        const exists = get().accounts.some((account) => account.email === email);

        if (exists) {
          return { ok: false, message: "An account already exists with this email." };
        }

        if (input.password.length < 6) {
          return { ok: false, message: "Password must be at least 6 characters." };
        }

        const account: AuthAccount = {
          id: `emp-${crypto.randomUUID()}`,
          name: input.name.trim(),
          email,
          role: "EMPLOYEE",
          departmentId: input.departmentId,
          passwordHash: hashPassword(input.password),
          status: "ACTIVE",
          createdAt: new Date().toISOString(),
        };

        set((state) => ({ accounts: [...state.accounts, account] }));

        return {
          ok: true,
          message: "Employee account created. Please log in.",
          user: {
            id: account.id,
            name: account.name,
            email: account.email,
            role: account.role,
            departmentId: account.departmentId,
          },
        };
      },
      login: (input) => {
        const email = input.email.trim().toLowerCase();
        const account = get().accounts.find((item) => item.email === email);

        if (!account || account.passwordHash !== hashPassword(input.password)) {
          return { ok: false, message: "Invalid email or password." };
        }

        if (account.status !== "ACTIVE") {
          return { ok: false, message: "This account is not active." };
        }

        const user: AuthenticatedUser = {
          id: account.id,
          name: account.name,
          email: account.email,
          role: account.role,
          departmentId: account.departmentId,
        };

        set((state) => ({
          accounts: state.accounts.map((item) =>
            item.id === account.id ? { ...item, lastLoginAt: new Date().toISOString() } : item,
          ),
          currentUser: user,
          token: `demo-jwt-${crypto.randomUUID()}`,
          isAuthenticated: true,
        }));

        return { ok: true, message: "Login successful." };
      },
      logout: () => set({ currentUser: null, token: null, isAuthenticated: false }),
    }),
    {
      name: "assetflow-auth-store",
      partialize: (state) => ({
        accounts: state.accounts,
        currentUser: state.currentUser,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
