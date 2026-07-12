import { apiClient } from "@/common/services/apiClient";

export async function getDashboardSummary() {
  const response = await apiClient.get("/dashboard");
  return response.data;
}
