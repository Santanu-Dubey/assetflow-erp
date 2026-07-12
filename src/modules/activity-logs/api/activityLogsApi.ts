import { apiClient } from "@/common/services/apiClient";

export async function getActivityLogs() {
  const response = await apiClient.get("/activity-logs");
  return response.data;
}
