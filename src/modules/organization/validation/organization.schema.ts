import { z } from "zod";

export const departmentSchema = z.object({
  name: z.string().min(2),
  departmentHeadId: z.string().uuid().optional(),
  parentDepartmentId: z.string().uuid().optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]),
});
