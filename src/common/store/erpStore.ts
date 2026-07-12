import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Status = "ACTIVE" | "INACTIVE";
export type AssetStatus = "AVAILABLE" | "ALLOCATED" | "RESERVED" | "UNDER_MAINTENANCE" | "LOST" | "RETIRED" | "DISPOSED";
export type BookingStatus = "UPCOMING" | "ONGOING" | "COMPLETED" | "CANCELLED";
export type MaintenanceStatus = "PENDING" | "APPROVED" | "REJECTED" | "TECHNICIAN_ASSIGNED" | "IN_PROGRESS" | "RESOLVED";
export type TransferStatus = "REQUESTED" | "APPROVED" | "REJECTED" | "COMPLETED";
export type AuditStatus = "DRAFT" | "ACTIVE" | "CLOSED";
export type VerificationStatus = "PENDING" | "VERIFIED" | "MISSING" | "DAMAGED";

export type Department = { id: string; name: string; headId?: string; parentId?: string; status: Status };
export type Employee = { id: string; name: string; email: string; departmentId: string; role: string; status: Status };
export type Category = { id: string; name: string; description: string; dynamicFields: string[]; status: Status };
export type Asset = {
  id: string;
  tag: string;
  name: string;
  categoryId: string;
  serialNumber: string;
  acquisitionDate: string;
  acquisitionCost: number;
  condition: string;
  location: string;
  bookable: boolean;
  status: AssetStatus;
  notes: string[];
};
export type Allocation = {
  id: string;
  assetId: string;
  employeeId?: string;
  departmentId?: string;
  expectedReturnDate: string;
  returnedAt?: string;
  conditionNotes?: string;
};
export type TransferRequest = {
  id: string;
  allocationId: string;
  toEmployeeId?: string;
  toDepartmentId?: string;
  reason: string;
  status: TransferStatus;
};
export type Booking = {
  id: string;
  resourceId: string;
  employeeId: string;
  purpose: string;
  startTime: string;
  endTime: string;
  status: BookingStatus;
};
export type Maintenance = {
  id: string;
  assetId: string;
  issue: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  status: MaintenanceStatus;
  technician?: string;
  resolution?: string;
};
export type AuditItem = { assetId: string; status: VerificationStatus; notes?: string };
export type AuditCycle = {
  id: string;
  name: string;
  scope: string;
  auditorIds: string[];
  status: AuditStatus;
  items: AuditItem[];
};
export type Notification = { id: string; title: string; message: string; type: string; read: boolean; createdAt: string };
export type ActivityLog = { id: string; action: string; entity: string; message: string; createdAt: string; actor: string };
export type AppSettings = { theme: "LIGHT" | "DARK" | "SYSTEM"; compactMode: boolean; bookingReminderMinutes: number };

type CreateAssetInput = Omit<Asset, "id" | "tag" | "status" | "notes"> & { status?: AssetStatus };

type ErpState = {
  departments: Department[];
  employees: Employee[];
  categories: Category[];
  assets: Asset[];
  allocations: Allocation[];
  transfers: TransferRequest[];
  bookings: Booking[];
  maintenance: Maintenance[];
  audits: AuditCycle[];
  notifications: Notification[];
  activityLogs: ActivityLog[];
  settings: AppSettings;
  addDepartment: (input: Omit<Department, "id">) => void;
  addEmployee: (input: Omit<Employee, "id">) => void;
  addCategory: (input: Omit<Category, "id">) => void;
  addAsset: (input: CreateAssetInput) => void;
  allocateAsset: (input: Omit<Allocation, "id">) => { ok: boolean; message: string };
  returnAsset: (allocationId: string, notes: string) => void;
  requestTransfer: (input: Omit<TransferRequest, "id" | "status">) => void;
  approveTransfer: (transferId: string) => void;
  rejectTransfer: (transferId: string) => void;
  createBooking: (input: Omit<Booking, "id" | "status">) => { ok: boolean; message: string };
  cancelBooking: (bookingId: string) => void;
  createMaintenance: (input: Omit<Maintenance, "id" | "status">) => void;
  updateMaintenanceStatus: (id: string, status: MaintenanceStatus, extra?: Partial<Maintenance>) => void;
  createAudit: (input: Pick<AuditCycle, "name" | "scope" | "auditorIds">) => void;
  markAuditItem: (auditId: string, assetId: string, status: VerificationStatus, notes?: string) => void;
  closeAudit: (auditId: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
};

const id = (prefix: string) => `${prefix}-${crypto.randomUUID()}`;
const today = () => new Date().toISOString().slice(0, 10);

const seedDepartments: Department[] = [
  { id: "dept-ops", name: "Operations", headId: "emp-aarav", status: "ACTIVE" },
  { id: "dept-it", name: "IT", headId: "emp-meera", parentId: "dept-ops", status: "ACTIVE" },
  { id: "dept-fac", name: "Facilities", headId: "emp-raj", parentId: "dept-ops", status: "ACTIVE" },
];

const seedEmployees: Employee[] = [
  { id: "emp-aarav", name: "Aarav Sharma", email: "aarav@assetflow.local", departmentId: "dept-ops", role: "ADMIN", status: "ACTIVE" },
  { id: "emp-meera", name: "Meera Iyer", email: "meera@assetflow.local", departmentId: "dept-it", role: "ASSET_MANAGER", status: "ACTIVE" },
  { id: "emp-priya", name: "Priya Nair", email: "priya@assetflow.local", departmentId: "dept-ops", role: "EMPLOYEE", status: "ACTIVE" },
  { id: "emp-raj", name: "Raj Malhotra", email: "raj@assetflow.local", departmentId: "dept-fac", role: "DEPARTMENT_HEAD", status: "ACTIVE" },
];

const seedCategories: Category[] = [
  { id: "cat-elec", name: "Electronics", description: "Laptops, tablets, projectors", dynamicFields: ["Warranty", "Serial"], status: "ACTIVE" },
  { id: "cat-room", name: "Meeting Rooms", description: "Shared rooms and spaces", dynamicFields: ["Capacity"], status: "ACTIVE" },
  { id: "cat-vehicle", name: "Vehicles", description: "Cars and vans", dynamicFields: ["Engine Number"], status: "ACTIVE" },
];

const seedAssets: Asset[] = [
  { id: "asset-1", tag: "AF-0001", name: "MacBook Pro 14", categoryId: "cat-elec", serialNumber: "MBP-901", acquisitionDate: "2026-01-12", acquisitionCost: 2100, condition: "Excellent", location: "HQ Floor 2", bookable: false, status: "AVAILABLE", notes: [] },
  { id: "asset-2", tag: "AF-0114", name: "Dell Latitude", categoryId: "cat-elec", serialNumber: "DL-114", acquisitionDate: "2025-11-04", acquisitionCost: 1200, condition: "Good", location: "Priya Nair", bookable: false, status: "ALLOCATED", notes: [] },
  { id: "asset-3", tag: "AF-0220", name: "Room B2", categoryId: "cat-room", serialNumber: "ROOM-B2", acquisitionDate: "2024-04-01", acquisitionCost: 0, condition: "Ready", location: "HQ Floor 1", bookable: true, status: "AVAILABLE", notes: [] },
  { id: "asset-4", tag: "AF-0301", name: "Company Vehicle", categoryId: "cat-vehicle", serialNumber: "VH-301", acquisitionDate: "2025-03-18", acquisitionCost: 24000, condition: "Service due", location: "Garage", bookable: true, status: "UNDER_MAINTENANCE", notes: [] },
];

const seedAllocations: Allocation[] = [
  { id: "alloc-1", assetId: "asset-2", employeeId: "emp-priya", expectedReturnDate: "2026-07-20" },
];

const makeLog = (action: string, entity: string, message: string): ActivityLog => ({
  id: id("log"),
  action,
  entity,
  message,
  createdAt: new Date().toISOString(),
  actor: "Aarav Sharma",
});

const makeNotification = (title: string, message: string, type: string): Notification => ({
  id: id("ntf"),
  title,
  message,
  type,
  read: false,
  createdAt: new Date().toISOString(),
});

export const useErpStore = create<ErpState>()(
  persist(
    (set, get) => ({
      departments: seedDepartments,
      employees: seedEmployees,
      categories: seedCategories,
      assets: seedAssets,
      allocations: seedAllocations,
      transfers: [],
      bookings: [
        { id: "book-1", resourceId: "asset-3", employeeId: "emp-raj", purpose: "Operations sync", startTime: "2026-07-13T09:00", endTime: "2026-07-13T10:00", status: "UPCOMING" },
      ],
      maintenance: [
        { id: "mnt-1", assetId: "asset-4", issue: "Scheduled vehicle servicing", priority: "HIGH", status: "IN_PROGRESS", technician: "Vendor Team" },
      ],
      audits: [],
      notifications: [makeNotification("Welcome to AssetFlow", "Your ERP workspace is ready.", "SYSTEM")],
      activityLogs: [makeLog("SEED", "System", "Initial demo data loaded")],
      settings: { theme: "LIGHT", compactMode: false, bookingReminderMinutes: 15 },
      addDepartment: (input) => set((s) => ({ departments: [...s.departments, { ...input, id: id("dept") }], activityLogs: [makeLog("CREATE", "Department", `Created department ${input.name}`), ...s.activityLogs] })),
      addEmployee: (input) => set((s) => ({ employees: [...s.employees, { ...input, id: id("emp") }], activityLogs: [makeLog("CREATE", "Employee", `Created employee ${input.name}`), ...s.activityLogs] })),
      addCategory: (input) => set((s) => ({ categories: [...s.categories, { ...input, id: id("cat") }], activityLogs: [makeLog("CREATE", "Category", `Created category ${input.name}`), ...s.activityLogs] })),
      addAsset: (input) =>
        set((s) => {
          const tag = `AF-${String(s.assets.length + 1).padStart(4, "0")}`;
          return {
            assets: [...s.assets, { ...input, id: id("asset"), tag, status: input.status ?? "AVAILABLE", notes: [] }],
            notifications: [makeNotification("Asset registered", `${input.name} registered as ${tag}.`, "ASSET"), ...s.notifications],
            activityLogs: [makeLog("CREATE", "Asset", `Registered ${input.name} as ${tag}`), ...s.activityLogs],
          };
        }),
      allocateAsset: (input) => {
        const state = get();
        const asset = state.assets.find((item) => item.id === input.assetId);
        const existing = state.allocations.find((item) => item.assetId === input.assetId && !item.returnedAt);
        if (!asset) return { ok: false, message: "Asset not found." };
        if (existing || asset.status !== "AVAILABLE") {
          const holder = state.employees.find((item) => item.id === existing?.employeeId)?.name ?? "another holder";
          return { ok: false, message: `${asset.tag} is already taken by ${holder}. Create a transfer request instead.` };
        }
        set((s) => ({
          allocations: [...s.allocations, { ...input, id: id("alloc") }],
          assets: s.assets.map((item) => (item.id === input.assetId ? { ...item, status: "ALLOCATED", location: s.employees.find((emp) => emp.id === input.employeeId)?.name ?? item.location } : item)),
          notifications: [makeNotification("Asset allocated", `${asset.tag} has been allocated.`, "ALLOCATION"), ...s.notifications],
          activityLogs: [makeLog("ALLOCATE", "Asset", `Allocated ${asset.tag}`), ...s.activityLogs],
        }));
        return { ok: true, message: `${asset.tag} allocated successfully.` };
      },
      returnAsset: (allocationId, notes) =>
        set((s) => {
          const allocation = s.allocations.find((item) => item.id === allocationId);
          return {
            allocations: s.allocations.map((item) => (item.id === allocationId ? { ...item, returnedAt: today(), conditionNotes: notes } : item)),
            assets: s.assets.map((item) => (item.id === allocation?.assetId ? { ...item, status: "AVAILABLE", location: "Stock Room", notes: [...item.notes, notes] } : item)),
            activityLogs: [makeLog("RETURN", "Asset", "Asset returned and made available"), ...s.activityLogs],
          };
        }),
      requestTransfer: (input) => set((s) => ({ transfers: [...s.transfers, { ...input, id: id("trn"), status: "REQUESTED" }], notifications: [makeNotification("Transfer requested", input.reason, "TRANSFER"), ...s.notifications], activityLogs: [makeLog("TRANSFER", "Asset", input.reason), ...s.activityLogs] })),
      approveTransfer: (transferId) =>
        set((s) => {
          const transfer = s.transfers.find((item) => item.id === transferId);
          const allocation = s.allocations.find((item) => item.id === transfer?.allocationId);
          return {
            transfers: s.transfers.map((item) => (item.id === transferId ? { ...item, status: "COMPLETED" } : item)),
            allocations: s.allocations.map((item) => (item.id === allocation?.id ? { ...item, employeeId: transfer?.toEmployeeId, departmentId: transfer?.toDepartmentId } : item)),
            activityLogs: [makeLog("APPROVE", "Transfer", "Transfer approved and allocation updated"), ...s.activityLogs],
          };
        }),
      rejectTransfer: (transferId) => set((s) => ({ transfers: s.transfers.map((item) => (item.id === transferId ? { ...item, status: "REJECTED" } : item)), activityLogs: [makeLog("REJECT", "Transfer", "Transfer request rejected"), ...s.activityLogs] })),
      createBooking: (input) => {
        const state = get();
        const overlaps = state.bookings.some((booking) => booking.resourceId === input.resourceId && booking.status !== "CANCELLED" && input.startTime < booking.endTime && input.endTime > booking.startTime);
        if (overlaps) return { ok: false, message: "Booking rejected because the selected slot overlaps an existing booking." };
        set((s) => ({ bookings: [...s.bookings, { ...input, id: id("book"), status: "UPCOMING" }], notifications: [makeNotification("Booking confirmed", input.purpose, "BOOKING"), ...s.notifications], activityLogs: [makeLog("BOOKING", "Resource", `Booked resource for ${input.purpose}`), ...s.activityLogs] }));
        return { ok: true, message: "Booking confirmed." };
      },
      cancelBooking: (bookingId) => set((s) => ({ bookings: s.bookings.map((item) => (item.id === bookingId ? { ...item, status: "CANCELLED" } : item)), activityLogs: [makeLog("CANCEL", "Booking", "Booking cancelled"), ...s.activityLogs] })),
      createMaintenance: (input) => set((s) => ({ maintenance: [...s.maintenance, { ...input, id: id("mnt"), status: "PENDING" }], notifications: [makeNotification("Maintenance request raised", input.issue, "MAINTENANCE"), ...s.notifications], activityLogs: [makeLog("CREATE", "Maintenance", input.issue), ...s.activityLogs] })),
      updateMaintenanceStatus: (maintenanceId, status, extra = {}) =>
        set((s) => {
          const request = s.maintenance.find((item) => item.id === maintenanceId);
          return {
            maintenance: s.maintenance.map((item) => (item.id === maintenanceId ? { ...item, ...extra, status } : item)),
            assets: s.assets.map((item) => (item.id === request?.assetId ? { ...item, status: status === "APPROVED" || status === "IN_PROGRESS" ? "UNDER_MAINTENANCE" : status === "RESOLVED" ? "AVAILABLE" : item.status } : item)),
            activityLogs: [makeLog("UPDATE", "Maintenance", `Maintenance moved to ${status}`), ...s.activityLogs],
          };
        }),
      createAudit: (input) => set((s) => ({ audits: [...s.audits, { ...input, id: id("aud"), status: "ACTIVE", items: s.assets.map((asset) => ({ assetId: asset.id, status: "PENDING" })) }], activityLogs: [makeLog("CREATE", "Audit", `Created audit ${input.name}`), ...s.activityLogs] })),
      markAuditItem: (auditId, assetId, status, notes) => set((s) => ({ audits: s.audits.map((audit) => (audit.id === auditId ? { ...audit, items: audit.items.map((item) => (item.assetId === assetId ? { ...item, status, notes } : item)) } : audit)), notifications: status === "MISSING" || status === "DAMAGED" ? [makeNotification("Audit discrepancy flagged", notes ?? status, "AUDIT"), ...s.notifications] : s.notifications })),
      closeAudit: (auditId) =>
        set((s) => {
          const audit = s.audits.find((item) => item.id === auditId);
          const missingIds = new Set(audit?.items.filter((item) => item.status === "MISSING").map((item) => item.assetId));
          return {
            audits: s.audits.map((item) => (item.id === auditId ? { ...item, status: "CLOSED" } : item)),
            assets: s.assets.map((asset) => (missingIds.has(asset.id) ? { ...asset, status: "LOST" } : asset)),
            activityLogs: [makeLog("CLOSE", "Audit", "Audit cycle closed"), ...s.activityLogs],
          };
        }),
      markNotificationRead: (notificationId) => set((s) => ({ notifications: s.notifications.map((item) => (item.id === notificationId ? { ...item, read: true } : item)) })),
      markAllNotificationsRead: () => set((s) => ({ notifications: s.notifications.map((item) => ({ ...item, read: true })) })),
      updateSettings: (settings) => set((s) => ({ settings: { ...s.settings, ...settings }, activityLogs: [makeLog("UPDATE", "Settings", "Application settings updated"), ...s.activityLogs] })),
    }),
    { name: "assetflow-erp-store" },
  ),
);
