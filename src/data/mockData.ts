import type { TrafficEvent, User } from "../types";

export const apiStats = [
  {
    label: "Live Sources",
    value: 18,
    change: "+3 new",
    badgeColor: "bg-emerald-100 text-emerald-700",
  },
  {
    label: "Queued Payloads",
    value: 128,
    change: "12 retrying",
    badgeColor: "bg-amber-100 text-amber-700",
  },
  {
    label: "Delivery SLA",
    value: "99.2%",
    change: "last 30m",
    badgeColor: "bg-sky-100 text-sky-700",
  },
  {
    label: "Alerts",
    value: 4,
    change: "2 critical",
    badgeColor: "bg-rose-100 text-rose-700",
  },
];

export const trafficEvents: TrafficEvent[] = [
  {
    id: "REQ-9821",
    direction: "Inbound",
    source: "Shopify",
    destination: "GHL Contacts",
    status: "Synced",
    latency: "342ms",
    timestamp: "2 mins ago",
  },
  {
    id: "REQ-9820",
    direction: "Outbound",
    source: "GHL Pipeline",
    destination: "HubSpot",
    status: "Queued",
    latency: "Pending",
    timestamp: "6 mins ago",
  },
  {
    id: "REQ-9819",
    direction: "Inbound",
    source: "Stripe",
    destination: "GHL Deals",
    status: "Retrying",
    latency: "1.4s",
    timestamp: "14 mins ago",
  },
  {
    id: "REQ-9818",
    direction: "Outbound",
    source: "GHL Webhooks",
    destination: "Slack",
    status: "Synced",
    latency: "211ms",
    timestamp: "24 mins ago",
  },
  {
    id: "REQ-9817",
    direction: "Inbound",
    source: "Facebook Lead Ads",
    destination: "GHL Contacts",
    status: "Synced",
    latency: "512ms",
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
    detail: "54 contacts pushed to GHL from Shopify nightly job.",
    time: "09:20",
  },
  {
    id: 2,
    status: "Queued",
    detail: "11 payloads staged awaiting field validation review.",
    time: "08:47",
  },
  {
    id: 3,
    status: "Retrying",
    detail: "Stripe invoice webhook retried 2x due to rate limiting.",
    time: "08:10",
  },
  {
    id: 4,
    status: "Synced",
    detail: "Slack alert delivered to RevOps escalation channel.",
    time: "07:55",
  },
];

export const users: User[] = [
  {
    id: "USR-001",
    name: "Sarah Anderson",
    email: "sarah.anderson@company.com",
    role: "Admin",
    status: "Active",
    joinedDate: "Nov 15, 2023",
  },
  {
    id: "USR-002",
    name: "Michael Chen",
    email: "michael.chen@company.com",
    role: "Manager",
    status: "Active",
    joinedDate: "Jan 08, 2024",
  },
  {
    id: "USR-003",
    name: "Emma Rodriguez",
    email: "emma.rodriguez@company.com",
    role: "User",
    status: "Active",
    joinedDate: "Feb 20, 2024",
  },
  // {
  //   id: "USR-004",
  //   name: "James Wilson",
  //   email: "james.wilson@company.com",
  //   role: "Manager",
  //   status: "Active",
  //   joinedDate: "Dec 01, 2023",
  // },
  // {
  //   id: "USR-005",
  //   name: "Lisa Thompson",
  //   email: "lisa.thompson@company.com",
  //   role: "User",
  //   status: "Inactive",
  //   joinedDate: "Oct 10, 2023",
  // },
  // {
  //   id: "USR-006",
  //   name: "David Park",
  //   email: "david.park@company.com",
  //   role: "User",
  //   status: "Active",
  //   joinedDate: "Mar 15, 2024",
  // },
  // {
  //   id: "USR-007",
  //   name: "Amanda Foster",
  //   email: "amanda.foster@company.com",
  //   role: "Admin",
  //   status: "Active",
  //   joinedDate: "Sep 22, 2023",
  // },
  // {
  //   id: "USR-008",
  //   name: "Robert Martinez",
  //   email: "robert.martinez@company.com",
  //   role: "User",
  //   status: "Active",
  //   joinedDate: "Apr 05, 2024",
  // },
];
