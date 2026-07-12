import { z } from "zod";

export const reportFilterSchema = z.object({
  dateFrom: z.coerce.date().optional(),
  dateTo: z.coerce.date().optional(),
  departmentId: z.string().uuid().optional(),
});
