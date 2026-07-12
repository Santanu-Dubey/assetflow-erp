import { Request, Response } from "express";
import { DashboardService } from "./dashboard.service.js";

export class DashboardController {
  private readonly service = new DashboardService();

  getSummary = async (_request: Request, response: Response) => {
    const summary = await this.service.getSummary();
    response.json({ data: summary });
  };
}
