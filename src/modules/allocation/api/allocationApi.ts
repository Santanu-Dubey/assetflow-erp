import { apiClient } from "@/common/services/apiClient";

export async function getAllocations() {
  const response = await apiClient.get("/allocations");
  return response.data;
}
