import { z } from "zod";

export const allocationSchema = z.object({
  assetId: z.string().uuid(),
  employeeId: z.string().uuid().optional(),
  departmentId: z.string().uuid().optional(),
  expectedReturnDate: z.coerce.date().optional(),
});

export const transferRequestSchema = z.object({
  allocationId: z.string().uuid(),
  requestedToEmployeeId: z.string().uuid().optional(),
  requestedToDepartmentId: z.string().uuid().optional(),
  reason: z.string().min(5),
});
