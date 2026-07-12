import { z } from "zod";

export const assetLifecycleStatusSchema = z.enum([
  "AVAILABLE",
  "ALLOCATED",
  "RESERVED",
  "UNDER_MAINTENANCE",
  "LOST",
  "RETIRED",
  "DISPOSED",
]);

export const assetSchema = z.object({
  name: z.string().min(2),
  categoryId: z.string().uuid(),
  serialNumber: z.string().min(1).optional(),
  acquisitionDate: z.coerce.date().optional(),
  acquisitionCost: z.coerce.number().nonnegative().optional(),
  condition: z.string().min(2),
  location: z.string().min(2),
  isBookable: z.boolean().default(false),
  status: assetLifecycleStatusSchema.default("AVAILABLE"),
});
