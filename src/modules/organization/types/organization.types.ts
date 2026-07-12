export type DepartmentStatus = "ACTIVE" | "INACTIVE";

export type Department = {
  id: string;
  name: string;
  status: DepartmentStatus;
  departmentHeadId?: string;
  parentDepartmentId?: string;
};
