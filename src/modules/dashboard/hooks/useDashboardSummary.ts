import { useQuery } from "@tanstack/react-query";
import { getDashboardSummary } from "@/modules/dashboard/api/dashboardApi";

export function useDashboardSummary() {
  return useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: getDashboardSummary,
    enabled: false,
  });
}
