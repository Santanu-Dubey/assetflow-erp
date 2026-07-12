import { apiClient } from "@/common/services/apiClient";

export async function getDepartments() {
  const response = await apiClient.get("/organization/departments");
  return response.data;
}
