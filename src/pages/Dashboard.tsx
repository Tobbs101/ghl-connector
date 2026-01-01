import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import ActivityTimeline from "../components/ActivityTimeline";
import TrafficTable from "../components/TrafficTable";
import { apiService } from "../services/apiService";

interface StatData {
  label: string;
  value: number | string;
  change: string;
  badgeColor: string;
}

const Dashboard = () => {
  const [stats, setStats] = useState<StatData[]>([]);
  const [timeline, setTimeline] = useState<any[]>([]);
  const [trafficEvents, setTrafficEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, timelineData, trafficData] = await Promise.all([
          apiService.getStats(),
          apiService.getActivityTimeline(4),
          apiService.getTrafficEvents(5),
        ]);

        const transformedStats: StatData[] = [
          {
            label: "Patients Synced",
            value: statsData.patientsSynced,
            change: `${statsData.totalSyncs} total syncs`,
            badgeColor: "bg-emerald-100 text-emerald-700",
          },
          {
            label: "Pending Syncs",
            value: statsData.queuedSyncs,
            change: `${statsData.retryingSyncs} retrying`,
            badgeColor: "bg-amber-100 text-amber-700",
          },
          {
            label: "Sync Success Rate",
            value: `${statsData.syncSuccessRate}%`,
            change: "last 24h",
            badgeColor: "bg-sky-100 text-sky-700",
          },
          {
            label: "Failed Syncs",
            value: statsData.failedSyncs,
            change: `${statsData.retryingSyncs} in progress`,
            badgeColor: "bg-rose-100 text-rose-700",
          },
        ];

        setStats(transformedStats);
        setTimeline(timelineData);
        setTrafficEvents(trafficData);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-slate-600">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-gradient-to-br from-lumeo to-black px-8 py-10 text-white shadow-xl border-orange">
        <div className="flex flex-wrap flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-white/60">
              Sync Overview
            </p>
            <h2 className="mt-4 text-3xl font-semibold lg:text-4xl">
              OpenDental to GHL connector processing {trafficEvents.length * 50}
              + resources daily.
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-white/80">
              Seamlessly sync patients, appointments, providers, and more from
              OpenDental to GoHighLevel. Monitor sync status, handle retries,
              and ensure data consistency with real-time alerts.
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
            <p className="mt-1 text-xs">Last sync completed 12m ago</p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

      <section className="grid gap-6 overflow-x-auto 2xl:grid-cols-[1.4fr_1fr]">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Sync activity
              </h3>
              <p className="text-sm text-slate-500">
                Real-time sync operations from OpenDental to GHL
              </p>
            </div>
            <button className="inline-flex items-center gap-2 text-sm font-semibold text-lumeo">
              View all
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
          <TrafficTable events={trafficEvents} />
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Activity timeline
              </h3>
              <p className="text-sm text-slate-500">Recent sync events</p>
            </div>
          </div>
          <ActivityTimeline items={timeline} />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
