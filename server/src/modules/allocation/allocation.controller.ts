import { Request, Response } from "express";
import { routeParam } from "../../common/utils/http.js";
import { AllocationService } from "./allocation.service.js";

export class AllocationController {
  private readonly service = new AllocationService();

  list = async (_request: Request, response: Response) => {
    response.json({ data: await this.service.list() });
  };

  allocate = async (request: Request, response: Response) => {
    response.status(201).json({ data: await this.service.allocate(request.body) });
  };

  requestTransfer = async (request: Request, response: Response) => {
    response.status(201).json({ data: await this.service.requestTransfer(request.body) });
  };

  returnAsset = async (request: Request, response: Response) => {
    response.json({
      data: await this.service.returnAsset(routeParam(request.params.allocationId), request.body),
    });
  };
}
