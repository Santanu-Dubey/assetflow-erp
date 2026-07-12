import { DashboardRepository } from "./dashboard.repository.js";

export class DashboardService {
  private readonly repository = new DashboardRepository();

  async getSummary() {
    return this.repository.getSummary();
  }
}
