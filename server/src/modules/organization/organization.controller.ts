import { Request, Response } from "express";
import { OrganizationService } from "./organization.service.js";

export class OrganizationController {
  private readonly service = new OrganizationService();

  listDepartments = async (_request: Request, response: Response) => {
    response.json({ data: await this.service.listDepartments() });
  };

  listCategories = async (_request: Request, response: Response) => {
    response.json({ data: await this.service.listCategories() });
  };

  listEmployees = async (_request: Request, response: Response) => {
    response.json({ data: await this.service.listEmployees() });
  };
}
