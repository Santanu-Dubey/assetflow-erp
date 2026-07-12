import { BookingRepository } from "./booking.repository.js";

export class BookingService {
  private readonly repository = new BookingRepository();

  list() {
    return this.repository.list();
  }

  create(payload: unknown) {
    return this.repository.create(payload);
  }

  cancel(bookingId: string) {
    return this.repository.cancel(bookingId);
  }

  reschedule(bookingId: string, payload: unknown) {
    return this.repository.reschedule(bookingId, payload);
  }
}
