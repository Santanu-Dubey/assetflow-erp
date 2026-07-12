import { apiClient } from "@/common/services/apiClient";

export async function getAssets() {
  const response = await apiClient.get("/assets");
  return response.data;
}
