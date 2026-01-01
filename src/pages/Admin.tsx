import {
  Download,
  Database,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react";
import { useEffect, useState } from "react";
import { apiService } from "../services/apiService";
import type { SyncHistoryRecord } from "../types";

const Admin = () => {
  const [syncHistory, setSyncHistory] = useState<SyncHistoryRecord[]>([]);
  const [stats, setStats] = useState({
    totalSyncs: 0,
    successfulSyncs: 0,
    retryingSyncs: 0,
    failedSyncs: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [historyData, statsData] = await Promise.all([
          apiService.getSyncHistory(50),
          apiService.getStats(),
        ]);

        setSyncHistory(historyData);
        setStats({
          totalSyncs: statsData.totalSyncs,
          successfulSyncs: statsData.successfulSyncs,
          retryingSyncs: statsData.retryingSyncs,
          failedSyncs: statsData.failedSyncs,
        });
      } catch (error) {
        console.error("Failed to fetch sync history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getSyncStatusColor = (status: string) => {
    switch (status) {
      case "Synced":
        return "bg-emerald-50 text-emerald-700";
      case "Retrying":
        return "bg-amber-50 text-amber-700";
      case "Failed":
        return "bg-rose-50 text-rose-700";
      case "Queued":
        return "bg-blue-50 text-blue-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getSyncStatusIcon = (status: string) => {
    switch (status) {
      case "Synced":
        return <CheckCircle className="h-4 w-4" />;
      case "Retrying":
        return <Clock className="h-4 w-4" />;
      case "Failed":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const downloadCSV = () => {
    const headers = [
      "Sync ID",
      "Resource Type",
      "Resource ID",
      "Resource Name",
      "Status",
      "Timestamp",
      "Latency",
      "GHL Contact ID",
    ];

    const rows = syncHistory.map((record: SyncHistoryRecord) => [
      record.id,
      record.resourceType,
      record.resourceId,
      record.resourceName,
      record.status,
      record.timestamp,
      record.latency,
      record.ghlContactId || "N/A",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `sync-history-${new Date().toISOString().split("T")[0]}.csv`
    );
    link.click();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-slate-600">Loading sync history...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-white px-8 py-10 shadow-md border-orange">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <Database className="h-8 w-8 text-slate-900" />
              <h1 className="text-3xl font-bold text-slate-900 lg:text-4xl">
                Sync Management
              </h1>
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Monitor and manage OpenDental to GHL synchronization history
            </p>
          </div>
          <button
            onClick={downloadCSV}
            disabled={syncHistory.length === 0}
            className="rounded-lg bg-slate-900 px-6 py-2 text-sm font-semibold text-white transition-all hover:bg-slate-800 disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download CSV
          </button>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-4">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm anim">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Syncs</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">
                {stats.totalSyncs}
              </p>
            </div>
            <Database className="h-8 w-8 text-slate-400" />
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm anim">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Successful</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">
                {stats.successfulSyncs}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-emerald-400" />
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm anim">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Retrying</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">
                {stats.retryingSyncs}
              </p>
            </div>
            <Clock className="h-8 w-8 text-amber-400" />
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm anim">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Failed</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">
                {stats.failedSyncs}
              </p>
            </div>
            <AlertCircle className="h-8 w-8 text-rose-400" />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Sync History ({syncHistory.length})
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Recent OpenDental to GHL synchronization records
          </p>
        </div>

        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Sync ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Resource Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Resource
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  GHL Contact ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Latency
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {syncHistory.map((record: SyncHistoryRecord) => (
                <tr
                  key={record.id}
                  className="transition-colors hover:bg-slate-50"
                >
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm font-semibold text-slate-900">
                      {record.id}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex rounded-full px-3 py-1 text-xs font-medium bg-slate-100 text-slate-700">
                      {record.resourceType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {record.resourceName}
                      </p>
                      <p className="text-xs text-slate-500">
                        {record.resourceId}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getSyncStatusIcon(record.status)}
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${getSyncStatusColor(
                          record.status
                        )}`}
                      >
                        {record.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm text-slate-600">
                      {record.ghlContactId || "-"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm font-medium text-slate-900">
                      {record.latency}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">
                      {record.timestamp}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Admin;
