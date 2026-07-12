export type TransferStatus = "REQUESTED" | "APPROVED" | "REJECTED" | "COMPLETED";

export type Allocation = {
  id: string;
  assetId: string;
  employeeId?: string;
  departmentId?: string;
  expectedReturnDate?: string;
  returnedAt?: string;
};
