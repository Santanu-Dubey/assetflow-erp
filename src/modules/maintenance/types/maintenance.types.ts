export type MaintenanceStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "TECHNICIAN_ASSIGNED"
  | "IN_PROGRESS"
  | "RESOLVED";

export type MaintenancePriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
