export type BookingStatus = "UPCOMING" | "ONGOING" | "COMPLETED" | "CANCELLED";

export type Booking = {
  id: string;
  resourceId: string;
  employeeId: string;
  purpose: string;
  startTime: string;
  endTime: string;
  status: BookingStatus;
};
