import { AllocationRepository } from "./allocation.repository.js";

export class AllocationService {
  private readonly repository = new AllocationRepository();

  list() {
    return this.repository.list();
  }

  allocate(payload: unknown) {
    return this.repository.allocate(payload);
  }

  requestTransfer(payload: unknown) {
    return this.repository.requestTransfer(payload);
  }

  returnAsset(allocationId: string, payload: unknown) {
    return this.repository.returnAsset(allocationId, payload);
  }
}
