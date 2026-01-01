import type { TrafficEvent, User, SyncHistoryRecord } from "../types";

export const apiStats = [
  {
    label: "Patients Synced",
    value: 342,
    change: "+18 today",
    badgeColor: "bg-emerald-100 text-emerald-700",
  },
  {
    label: "Pending Appointments",
    value: 47,
    change: "8 retrying",
    badgeColor: "bg-amber-100 text-amber-700",
  },
  {
    label: "Sync Success Rate",
    value: "98.9%",
    change: "last 24h",
    badgeColor: "bg-sky-100 text-sky-700",
  },
  {
    label: "Failed Syncs",
    value: 3,
    change: "1 in progress",
    badgeColor: "bg-rose-100 text-rose-700",
  },
];

export const trafficEvents: TrafficEvent[] = [
  {
    id: "SYNC-4821",
    direction: "Inbound",
    source: "OpenDental",
    destination: "GHL Contact",
    status: "Synced",
    latency: "285ms",
    timestamp: "2 mins ago",
  },
  {
    id: "SYNC-4820",
    direction: "Inbound",
    source: "OpenDental",
    destination: "GHL Appointment",
    status: "Queued",
    latency: "Pending",
    timestamp: "6 mins ago",
  },
  {
    id: "SYNC-4819",
    direction: "Inbound",
    source: "OpenDental",
    destination: "GHL Contact",
    status: "Retrying",
    latency: "2.1s",
    timestamp: "14 mins ago",
  },
  {
    id: "SYNC-4818",
    direction: "Inbound",
    source: "OpenDental",
    destination: "GHL Appointment",
    status: "Synced",
    latency: "158ms",
    timestamp: "24 mins ago",
  },
  {
    id: "SYNC-4817",
    direction: "Inbound",
    source: "OpenDental",
    destination: "GHL Contact",
    status: "Synced",
    latency: "431ms",
    timestamp: "31 mins ago",
  },
];

export const mappingGroups = [
  {
    category: "Contact Basics",
    description: "Name, phone, email, timezone, owner",
    fields: [
      { id: "firstName", label: "First Name", enabled: true },
      { id: "lastName", label: "Last Name", enabled: true },
      { id: "email", label: "Email", enabled: true },
      { id: "phone", label: "Phone", enabled: false },
    ],
  },
  {
    category: "Lifecycle",
    description: "Stage, custom tags, attribution",
    fields: [
      { id: "pipelineStage", label: "Pipeline Stage", enabled: true },
      { id: "hotLead", label: "Hot Lead Flag", enabled: true },
      { id: "source", label: "Acquisition Source", enabled: false },
    ],
  },
  {
    category: "Revenue",
    description: "Deals, invoices, payment intents",
    fields: [
      { id: "dealValue", label: "Deal Value", enabled: true },
      { id: "planTier", label: "Subscription Tier", enabled: false },
      { id: "mrr", label: "MRR Snapshot", enabled: true },
    ],
  },
];

export const timeline = [
  {
    id: 1,
    status: "Synced",
    detail: "128 patients synced to GHL from OpenDental automated batch job.",
    time: "09:20",
  },
  {
    id: 2,
    status: "Queued",
    detail:
      "23 appointments staged awaiting field validation and provider mapping.",
    time: "08:47",
  },
  {
    id: 3,
    status: "Retrying",
    detail:
      "Patient sync retried 3x due to GHL rate limiting and API timeouts.",
    time: "08:10",
  },
  {
    id: 4,
    status: "Synced",
    detail:
      "Appointment slot conflict resolved and successfully synced to GHL pipeline.",
    time: "07:55",
  },
];

export const users: User[] = [
  {
    id: "USR-001",
    name: "Sarah Anderson",
    email: "sarah.anderson@lumeomarketing.com",
    role: "Admin",
    status: "Active",
    joinedDate: "Nov 15, 2023",
  },
  {
    id: "USR-002",
    name: "Michael Chen",
    email: "michael.chen@lumeomarketing.com",
    role: "Manager",
    status: "Active",
    joinedDate: "Jan 08, 2024",
  },
  {
    id: "USR-003",
    name: "Emma Rodriguez",
    email: "emma.rodriguez@lumeomarketing.com",
    role: "User",
    status: "Active",
    joinedDate: "Feb 20, 2024",
  },
];

export const syncHistory: SyncHistoryRecord[] = [
  {
    id: "SYNC-001",
    resourceType: "Patient",
    resourceId: "PAT-4521",
    resourceName: "John Smith",
    status: "Synced" as const,
    timestamp: "2025-01-01 14:32:15",
    latency: "285ms",
    ghlContactId: "GHLC-9821",
  },
  {
    id: "SYNC-002",
    resourceType: "Appointment",
    resourceId: "APT-3847",
    resourceName: "Patient Checkup",
    status: "Synced" as const,
    timestamp: "2025-01-01 14:28:42",
    latency: "158ms",
    ghlContactId: "GHLC-9815",
  },
  {
    id: "SYNC-003",
    resourceType: "Patient",
    resourceId: "PAT-4512",
    resourceName: "Emily Davis",
    status: "Retrying" as const,
    timestamp: "2025-01-01 14:15:09",
    latency: "2100ms",
    ghlContactId: null,
  },
  {
    id: "SYNC-004",
    resourceType: "Appointment",
    resourceId: "APT-3842",
    resourceName: "Root Canal Procedure",
    status: "Synced" as const,
    timestamp: "2025-01-01 14:02:33",
    latency: "431ms",
    ghlContactId: "GHLC-9808",
  },
  {
    id: "SYNC-005",
    resourceType: "Patient",
    resourceId: "PAT-4498",
    resourceName: "Michael Johnson",
    status: "Failed" as const,
    timestamp: "2025-01-01 13:47:21",
    latency: "3200ms",
    ghlContactId: null,
  },
  {
    id: "SYNC-006",
    resourceType: "Appointment",
    resourceId: "APT-3831",
    resourceName: "Teeth Cleaning",
    status: "Synced" as const,
    timestamp: "2025-01-01 13:32:08",
    latency: "192ms",
    ghlContactId: "GHLC-9792",
  },
  {
    id: "SYNC-007",
    resourceType: "Patient",
    resourceId: "PAT-4475",
    resourceName: "Lisa Chen",
    status: "Synced" as const,
    timestamp: "2025-01-01 13:18:44",
    latency: "267ms",
    ghlContactId: "GHLC-9781",
  },
  {
    id: "SYNC-008",
    resourceType: "Appointment",
    resourceId: "APT-3825",
    resourceName: "Consultation",
    status: "Synced" as const,
    timestamp: "2025-01-01 13:05:12",
    latency: "341ms",
    ghlContactId: "GHLC-9775",
  },
];
