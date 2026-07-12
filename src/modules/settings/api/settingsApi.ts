import { apiClient } from "@/common/services/apiClient";

export async function getSettings() {
  const response = await apiClient.get("/settings");
  return response.data;
}
