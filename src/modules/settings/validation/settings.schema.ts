import { z } from "zod";

export const settingsSchema = z.object({
  theme: z.enum(["LIGHT", "DARK", "SYSTEM"]),
  compactMode: z.boolean(),
});
