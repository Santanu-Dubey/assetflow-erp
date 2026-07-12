import { Request, Response } from "express";
import { AssetsService } from "./assets.service.js";

export class AssetsController {
  private readonly service = new AssetsService();

  list = async (_request: Request, response: Response) => {
    response.json({ data: await this.service.list() });
  };

  create = async (request: Request, response: Response) => {
    response.status(201).json({ data: await this.service.create(request.body) });
  };
}
