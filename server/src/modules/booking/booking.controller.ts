import { Request, Response } from "express";
import { routeParam } from "../../common/utils/http.js";
import { BookingService } from "./booking.service.js";

export class BookingController {
  private readonly service = new BookingService();

  list = async (_request: Request, response: Response) => {
    response.json({ data: await this.service.list() });
  };

  create = async (request: Request, response: Response) => {
    response.status(201).json({ data: await this.service.create(request.body) });
  };

  cancel = async (request: Request, response: Response) => {
    response.json({ data: await this.service.cancel(routeParam(request.params.bookingId)) });
  };

  reschedule = async (request: Request, response: Response) => {
    response.json({ data: await this.service.reschedule(routeParam(request.params.bookingId), request.body) });
  };
}
