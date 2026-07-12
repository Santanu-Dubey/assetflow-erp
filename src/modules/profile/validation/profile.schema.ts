import { z } from "zod";

export const profilePreferenceSchema = z.object({
  theme: z.enum(["LIGHT", "DARK", "SYSTEM"]),
  compactMode: z.boolean(),
  emailNotifications: z.boolean(),
});
