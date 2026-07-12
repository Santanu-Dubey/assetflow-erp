import { z } from "zod";

export const maintenanceRequestSchema = z.object({
  assetId: z.string().uuid(),
  issue: z.string().min(5),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
});
