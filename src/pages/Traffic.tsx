import { ArrowDownToLine, ArrowUpFromLine, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import TrafficTable from "../components/TrafficTable";
import { apiService } from "../services/apiService";

const Traffic = () => {
  const [trafficEvents, setTrafficEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTraffic = async () => {
    setLoading(true);
    try {
      const data = await apiService.getTrafficEvents(20);
      setTrafficEvents(data);
    } catch (error) {
      console.error("Failed to fetch traffic:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTraffic();

    // Auto refresh every 15 seconds
    const interval = setInterval(fetchTraffic, 15000);
    return () => clearInterval(interval);
  }, []);

  const syncedCount = trafficEvents.filter((e) => e.status === "Synced").length;
  const queuedCount = trafficEvents.filter((e) => e.status === "Queued").length;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            Live traffic
          </h2>
          <p className="text-sm text-slate-500">
            Real-time sync events from OpenDental to GoHighLevel
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 sm:w-auto">
            Auto refresh: 15s
          </button>
          <button
            onClick={fetchTraffic}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-lumeo px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh now
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-3xl border border-slate-100 bg-white p-5 anim">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Inbound
          </p>
          <div className="mt-3 flex items-end gap-3">
            <ArrowDownToLine className="h-10 w-10 rounded-2xl bg-slate-100 p-2 text-slate-700" />
            <div>
              <p className="text-3xl font-semibold text-slate-900">
                {trafficEvents.length}
              </p>
              <p className="text-xs text-emerald-500">Recent events</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-100 bg-white p-5 anim">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Outbound
          </p>
          <div className="mt-3 flex items-end gap-3">
            <ArrowUpFromLine className="h-10 w-10 rounded-2xl bg-slate-100 p-2 text-slate-700" />
            <div>
              <p className="text-3xl font-semibold text-slate-900">
                {syncedCount}
              </p>
              <p className="text-xs text-slate-500">Synced to GHL</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-100 bg-white p-5 anim">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Queued
          </p>
          <div className="mt-3">
            <p className="text-3xl font-semibold text-slate-900">
              {queuedCount}
            </p>
            <p className="text-xs text-amber-500">Pending sync</p>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-100 bg-white p-5 anim">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Total Events
          </p>
          <div className="mt-3">
            <p className="text-3xl font-semibold text-slate-900">
              {trafficEvents.length}
            </p>
            <p className="text-xs text-slate-500">Last 20 records</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex gap-3 overflow-x-auto pb-2 sm:flex-wrap sm:pb-0">
          {[
            "All directions",
            "Inbound",
            "Outbound",
            "Queued",
            "Synced",
            "Retrying",
          ].map((chip) => (
            <button
              key={chip}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium ${
                chip === "All directions"
                  ? "border-lumeo bg-lumeo text-white"
                  : "border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              {chip}
            </button>
          ))}
        </div>
        <TrafficTable events={trafficEvents} />
      </div>
    </div>
  );
};

export default Traffic;
