import { Router } from "express";
import { DashboardController } from "./dashboard.controller.js";

export const dashboardRouter = Router();
const controller = new DashboardController();

dashboardRouter.get("/", controller.getSummary);
