import { objectPayload } from "../../common/utils/http.js";

export class AllocationRepository {
  async list() {
    return [];
  }

  async allocate(payload: unknown) {
    return payload;
  }

  async requestTransfer(payload: unknown) {
    return payload;
  }

  async returnAsset(allocationId: string, payload: unknown) {
    return { allocationId, ...objectPayload(payload) };
  }
}
