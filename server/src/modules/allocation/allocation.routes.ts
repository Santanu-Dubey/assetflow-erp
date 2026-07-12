import { Router } from "express";
import { AllocationController } from "./allocation.controller.js";

export const allocationRouter = Router();
const controller = new AllocationController();

allocationRouter.get("/", controller.list);
allocationRouter.post("/", controller.allocate);
allocationRouter.post("/transfer-requests", controller.requestTransfer);
allocationRouter.post("/:allocationId/return", controller.returnAsset);
