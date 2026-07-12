import { NextFunction, Request, Response } from "express";

export type RequestUser = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "ASSET_MANAGER" | "DEPARTMENT_HEAD" | "EMPLOYEE";
  departmentId?: string;
};

declare global {
  namespace Express {
    interface Request {
      user: RequestUser;
    }
  }
}

export function mockAuthMiddleware(request: Request, _response: Response, next: NextFunction) {
  request.user = {
    id: request.header("x-demo-user-id") ?? "usr-admin-demo",
    name: "Aarav Sharma",
    email: "aarav.sharma@assetflow.local",
    role: "ADMIN",
    departmentId: "dept-operations",
  };

  next();
}
