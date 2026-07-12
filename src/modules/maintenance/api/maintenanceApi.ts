import { apiClient } from "@/common/services/apiClient";

export async function getMaintenanceRequests() {
  const response = await apiClient.get("/maintenance");
  return response.data;
}
