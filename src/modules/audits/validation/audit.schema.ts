import { z } from "zod";

export const auditCycleSchema = z.object({
  name: z.string().min(3),
  scopeType: z.enum(["DEPARTMENT", "LOCATION"]),
  scopeId: z.string().min(1),
  startsAt: z.coerce.date(),
  endsAt: z.coerce.date(),
});
