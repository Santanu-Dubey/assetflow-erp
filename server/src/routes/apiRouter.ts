import { Router } from "express";
import { allocationRouter } from "../modules/allocation/allocation.routes.js";
import { assetsRouter } from "../modules/assets/assets.routes.js";
import { bookingRouter } from "../modules/booking/booking.routes.js";
import { dashboardRouter } from "../modules/dashboard/dashboard.routes.js";
import { organizationRouter } from "../modules/organization/organization.routes.js";

export const apiRouter = Router();

apiRouter.use("/dashboard", dashboardRouter);
apiRouter.use("/organization", organizationRouter);
apiRouter.use("/assets", assetsRouter);
apiRouter.use("/allocations", allocationRouter);
apiRouter.use("/bookings", bookingRouter);
