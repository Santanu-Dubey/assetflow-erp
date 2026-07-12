import { Router } from "express";
import { z } from "zod";

type DemoAccount = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: "ADMIN" | "ASSET_MANAGER" | "DEPARTMENT_HEAD" | "EMPLOYEE";
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
};

const accounts: DemoAccount[] = [
  {
    id: "emp-aarav",
    name: "Aarav Sharma",
    email: "aarav@assetflow.local",
    passwordHash: hashPassword("admin123"),
    role: "ADMIN",
    status: "ACTIVE",
  },
];

const signupSchema = z
  .object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    departmentId: z.string().optional(),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const authRouter = Router();

authRouter.post("/signup", (request, response) => {
  const payload = signupSchema.parse(request.body);
  const email = payload.email.trim().toLowerCase();
  const exists = accounts.some((account) => account.email === email);

  if (exists) {
    response.status(409).json({ success: false, message: "User already exists." });
    return;
  }

  const account: DemoAccount = {
    id: `emp-${crypto.randomUUID()}`,
    name: `${payload.firstName.trim()} ${payload.lastName.trim()}`,
    email,
    passwordHash: hashPassword(payload.password),
    role: "EMPLOYEE",
    status: "ACTIVE",
  };

  accounts.push(account);

  response.status(201).json({
    success: true,
    message: "Employee account created successfully.",
    user: publicUser(account),
  });
});

authRouter.post("/login", (request, response) => {
  const payload = loginSchema.parse(request.body);
  const account = accounts.find((item) => item.email === payload.email.trim().toLowerCase());

  if (!account || account.passwordHash !== hashPassword(payload.password)) {
    response.status(401).json({ success: false, message: "Invalid email or password." });
    return;
  }

  if (account.status !== "ACTIVE") {
    response.status(403).json({ success: false, message: "This account is not active." });
    return;
  }

  response.json({
    success: true,
    message: "Login successful.",
    token: `demo-jwt-${crypto.randomUUID()}`,
    user: publicUser(account),
  });
});

authRouter.get("/session", (request, response) => {
  response.json({ success: true, user: request.user });
});

function hashPassword(password: string) {
  return Buffer.from(`assetflow:${password}`).toString("base64");
}

function publicUser(account: DemoAccount) {
  return {
    id: account.id,
    name: account.name,
    email: account.email,
    role: account.role,
    status: account.status,
  };
}
