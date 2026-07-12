import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError.js";
import type { RequestUser } from "./mockAuthMiddleware.js";

export function requireRole(allowedRoles: RequestUser["role"][]) {
  return (request: Request, _response: Response, next: NextFunction) => {
    if (!allowedRoles.includes(request.user.role)) {
      next(new AppError("You do not have permission to perform this action.", 403, "FORBIDDEN"));
      return;
    }

    next();
  };
}
