import { objectPayload } from "../../common/utils/http.js";

export class BookingRepository {
  async list() {
    return [];
  }

  async create(payload: unknown) {
    return payload;
  }

  async cancel(bookingId: string) {
    return { bookingId, status: "CANCELLED" };
  }

  async reschedule(bookingId: string, payload: unknown) {
    return { bookingId, ...objectPayload(payload) };
  }
}
