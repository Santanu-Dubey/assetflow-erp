import { apiClient } from "@/common/services/apiClient";

export async function getNotifications() {
  const response = await apiClient.get("/notifications");
  return response.data;
}
