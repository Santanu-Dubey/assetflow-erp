import { Router } from "express";
import { requireRole } from "../../common/middleware/requireRole.js";
import { AssetsController } from "./assets.controller.js";

export const assetsRouter = Router();
const controller = new AssetsController();

assetsRouter.get("/", controller.list);
assetsRouter.post("/", requireRole(["ADMIN", "ASSET_MANAGER"]), controller.create);
