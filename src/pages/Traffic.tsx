import { ArrowDownToLine, ArrowUpFromLine, RefreshCw } from "lucide-react";
import TrafficTable from "../components/TrafficTable";
import { trafficEvents } from "../data/mockData";

const Traffic = () => (
  <div className="space-y-8">
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Live traffic</h2>
        <p className="text-sm text-slate-500">
          Staged payloads ready to push into Go High Level or back to partner
          APIs.
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 sm:w-auto">
          Auto refresh: 15s
        </button>
        <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-lumeo px-4 py-2 text-sm font-semibold text-white">
          <RefreshCw className="h-4 w-4" />
          Refresh now
        </button>
      </div>
    </div>

    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-3xl border border-slate-100 bg-white p-5">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
          Inbound
        </p>
        <div className="mt-3 flex items-end gap-3">
          <ArrowDownToLine className="h-10 w-10 rounded-2xl bg-slate-100 p-2 text-slate-700" />
          <div>
            <p className="text-3xl font-semibold text-slate-900">842</p>
            <p className="text-xs text-emerald-500">+12% vs yesterday</p>
          </div>
        </div>
      </div>
      <div className="rounded-3xl border border-slate-100 bg-white p-5">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
          Outbound
        </p>
        <div className="mt-3 flex items-end gap-3">
          <ArrowUpFromLine className="h-10 w-10 rounded-2xl bg-slate-100 p-2 text-slate-700" />
          <div>
            <p className="text-3xl font-semibold text-slate-900">791</p>
            <p className="text-xs text-slate-500">Processing now</p>
          </div>
        </div>
      </div>
      <div className="rounded-3xl border border-slate-100 bg-white p-5">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
          Retries
        </p>
        <p className="mt-3 text-3xl font-semibold text-slate-900">18</p>
        <p className="text-xs text-rose-500">Stripe throttling</p>
      </div>
      <div className="rounded-3xl border border-slate-100 bg-white p-5">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
          Avg latency
        </p>
        <p className="mt-3 text-3xl font-semibold text-slate-900">422ms</p>
        <p className="text-xs text-slate-500">p95 • last 15m</p>
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

export default Traffic;
