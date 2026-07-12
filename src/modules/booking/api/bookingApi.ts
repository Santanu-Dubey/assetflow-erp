import { apiClient } from "@/common/services/apiClient";

export async function getBookings() {
  const response = await apiClient.get("/bookings");
  return response.data;
}
