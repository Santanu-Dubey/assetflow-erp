import { apiClient } from "@/common/services/apiClient";

export async function getProfile() {
  const response = await apiClient.get("/profile");
  return response.data;
}
