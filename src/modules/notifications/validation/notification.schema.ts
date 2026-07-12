import { z } from "zod";

export const notificationPreferenceSchema = z.object({
  emailEnabled: z.boolean(),
  inAppEnabled: z.boolean(),
  reminderMinutes: z.coerce.number().int().min(0),
});
