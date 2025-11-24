export type TrafficStatus = 'Synced' | 'Queued' | 'Retrying';

export interface TrafficEvent {
  id: string;
  direction: 'Inbound' | 'Outbound';
  source: string;
  destination: string;
  status: TrafficStatus;
  latency: string;
  timestamp: string;
}
