import { z } from "zod";

export const bookingSchema = z
  .object({
    resourceId: z.string().uuid(),
    employeeId: z.string().uuid(),
    purpose: z.string().min(3),
    startTime: z.coerce.date(),
    endTime: z.coerce.date(),
  })
  .refine((value) => value.endTime > value.startTime, {
    message: "End time must be after start time.",
    path: ["endTime"],
  });
