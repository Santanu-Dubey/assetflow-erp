import { Router } from "express";
import { requireRole } from "../../common/middleware/requireRole.js";
import { OrganizationController } from "./organization.controller.js";

export const organizationRouter = Router();
const controller = new OrganizationController();

organizationRouter.get("/departments", requireRole(["ADMIN"]), controller.listDepartments);
organizationRouter.get("/categories", requireRole(["ADMIN"]), controller.listCategories);
organizationRouter.get("/employees", requireRole(["ADMIN"]), controller.listEmployees);
