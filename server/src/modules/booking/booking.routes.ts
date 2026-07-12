import { Router } from "express";
import { BookingController } from "./booking.controller.js";

export const bookingRouter = Router();
const controller = new BookingController();

bookingRouter.get("/", controller.list);
bookingRouter.post("/", controller.create);
bookingRouter.patch("/:bookingId/cancel", controller.cancel);
bookingRouter.patch("/:bookingId/reschedule", controller.reschedule);
