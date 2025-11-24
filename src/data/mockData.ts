import type { TrafficEvent } from "../types";

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
