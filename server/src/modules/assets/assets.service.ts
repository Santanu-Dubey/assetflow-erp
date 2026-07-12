import { AssetsRepository } from "./assets.repository.js";

export class AssetsService {
  private readonly repository = new AssetsRepository();

  list() {
    return this.repository.list();
  }

  create(payload: unknown) {
    return this.repository.create(payload);
  }
}
