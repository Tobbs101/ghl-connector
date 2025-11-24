import { clsx } from "clsx";
import type { TrafficEvent } from "../types";

interface TrafficTableProps {
  events: TrafficEvent[];
}

const badgeStyles: Record<TrafficEvent["status"], string> = {
  Synced: "bg-emerald-50 text-emerald-700",
  Queued: "bg-amber-50 text-amber-700",
  Retrying: "bg-rose-50 text-rose-700",
};

const TrafficTable = ({ events }: TrafficTableProps) => (
  <div className="rounded-3xl border border-slate-100 bg-white shadow-sm">
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[720px] divide-y divide-slate-100 text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-6 py-3">Request</th>
            <th className="px-6 py-3">Direction</th>
            <th className="px-6 py-3">Source</th>
            <th className="px-6 py-3">Destination</th>
            <th className="px-6 py-3">Latency</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Updated</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white text-slate-600">
          {events.map((event) => (
            <tr key={event.id}>
              <td className="px-6 py-4 font-semibold text-slate-900">
                {event.id}
              </td>
              <td className="px-6 py-4">
                <span
                  className={clsx(
                    "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
                    event.direction === "Inbound"
                      ? "bg-slate-900/10 text-slate-900"
                      : "bg-slate-200 text-slate-700"
                  )}
                >
                  {event.direction}
                </span>
              </td>
              <td className="px-6 py-4">{event.source}</td>
              <td className="px-6 py-4">{event.destination}</td>
              <td className="px-6 py-4 font-mono text-sm">{event.latency}</td>
              <td className="px-6 py-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    badgeStyles[event.status]
                  }`}
                >
                  {event.status}
                </span>
              </td>
              <td className="px-6 py-4 text-xs text-slate-400">
                {event.timestamp}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default TrafficTable;
