import { apiClient } from "@/common/services/apiClient";

export async function getReportsOverview() {
  const response = await apiClient.get("/reports");
  return response.data;
}
