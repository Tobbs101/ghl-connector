export type TrafficStatus = "Synced" | "Queued" | "Retrying";

export interface TrafficEvent {
  id: string;
  direction: "Inbound" | "Outbound";
  source: string;
  destination: string;
  status: TrafficStatus;
  latency: string;
  timestamp: string;
}

export type UserRole = "Admin" | "Manager" | "User";
export type UserStatus = "Active" | "Inactive";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  joinedDate: string;
}

export type SyncStatus = "Synced" | "Retrying" | "Failed" | "Queued";

export interface SyncHistoryRecord {
  id: string;
  resourceType: "Patient" | "Appointment";
  resourceId: string;
  resourceName: string;
  status: SyncStatus;
  timestamp: string;
  latency: string;
  ghlContactId: string | null;
}
