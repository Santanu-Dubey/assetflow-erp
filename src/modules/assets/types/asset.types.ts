export type AssetLifecycleStatus =
  | "AVAILABLE"
  | "ALLOCATED"
  | "RESERVED"
  | "UNDER_MAINTENANCE"
  | "LOST"
  | "RETIRED"
  | "DISPOSED";

export type Asset = {
  id: string;
  assetTag: string;
  name: string;
  categoryId: string;
  status: AssetLifecycleStatus;
  isBookable: boolean;
};
