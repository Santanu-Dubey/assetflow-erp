import { apiClient } from "@/common/services/apiClient";

export async function getAuditCycles() {
  const response = await apiClient.get("/audits");
  return response.data;
}
