import { OrganizationRepository } from "./organization.repository.js";

export class OrganizationService {
  private readonly repository = new OrganizationRepository();

  listDepartments() {
    return this.repository.listDepartments();
  }

  listCategories() {
    return this.repository.listCategories();
  }

  listEmployees() {
    return this.repository.listEmployees();
  }
}
