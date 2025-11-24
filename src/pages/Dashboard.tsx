import { ArrowUpRight, ShieldCheck } from "lucide-react";
import StatCard from "../components/StatCard";
import ActivityTimeline from "../components/ActivityTimeline";
import TrafficTable from "../components/TrafficTable";
import { apiStats, timeline, trafficEvents } from "../data/mockData";

const Dashboard = () => (
  <div className="space-y-8">
    <section className="rounded-3xl bg-gradient-to-br from-lumeo to-black px-8 py-10 text-white shadow-xl">
      <div className="flex flex-wrap flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-white/60">
            Lumeo overview
          </p>
          <h2 className="mt-4 text-3xl font-semibold lg:text-4xl">
            New York workspace routing {trafficEvents.length * 24}+ payloads
            daily.
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-white/80">
            Every inbound request is staged locally before being delivered to
            GHL. Stay ahead of sync issues with proactive alerts and retry
            automations.
          </p>
        </div>
        <div className="rounded-2xl border border-white/20 px-6 py-4 text-sm text-white/80">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/50">
            Status
          </p>
          <div className="mt-2 flex items-center gap-1 text-lg font-semibold">
            <ShieldCheck className="h-5 w-5 text-emerald-300" />
            Operational
          </div>
          <p className="mt-1 text-xs">Last incident resolved 2h ago</p>
        </div>
      </div>
    </section>

    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {apiStats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </section>

    <section className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Live feed</h3>
            <p className="text-sm text-slate-500">
              Realtime sample of staged payloads
            </p>
          </div>
          <button className="inline-flex items-center gap-2 text-sm font-semibold text-lumeo">
            View all
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
        <TrafficTable events={trafficEvents.slice(0, 4)} />
      </div>
      <ActivityTimeline items={timeline} />
    </section>
  </div>
);

export default Dashboard;
