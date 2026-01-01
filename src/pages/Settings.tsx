import { Fragment, useState } from "react";
import { Settings as SettingsIcon, Bell, Database, Shield } from "lucide-react";

const syncPreferences = [
  {
    id: "autoRetry",
    label: "Auto-retry failed syncs",
    detail:
      "Automatically retry failed patient and appointment syncs up to 3 times.",
    enabled: true,
  },
  {
    id: "batchSync",
    label: "Batch sync operations",
    detail: "Process syncs in batches of 50 records for optimal performance.",
    enabled: true,
  },
  {
    id: "syncAlerts",
    label: "Sync failure alerts",
    detail:
      "Send email notifications when sync operations exceed error threshold.",
    enabled: true,
  },
  {
    id: "logRetention",
    label: "Extended sync logs",
    detail:
      "Retain detailed sync logs for 90 days for audit and troubleshooting.",
    enabled: false,
  },
];

const Settings = () => {
  const [preferences, setPreferences] = useState(syncPreferences);

  const togglePref = (id: string) => {
    setPreferences((prev) =>
      prev.map((pref) =>
        pref.id === id ? { ...pref, enabled: !pref.enabled } : pref
      )
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">
          Sync preferences
        </h2>
        <p className="text-sm text-slate-500">
          Configure sync behavior, notifications, and integration settings for
          OpenDental to GHL synchronization.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="h-5 w-5 text-slate-700" />
            <h3 className="text-lg font-semibold text-slate-900">
              Sync Configuration
            </h3>
          </div>
          <div className="mt-6 space-y-4">
            {preferences.map((pref) => (
              <div
                key={pref.id}
                className="flex items-center justify-between gap-4 rounded-2xl border border-slate-100 px-4 py-3"
              >
                <div>
                  <p className="font-semibold text-slate-900">{pref.label}</p>
                  <p className="text-xs text-slate-500">{pref.detail}</p>
                </div>
                <button
                  onClick={() => togglePref(pref.id)}
                  className={`flex h-8 w-16 items-center rounded-full transition ${
                    pref.enabled
                      ? "bg-emerald-500 justify-end"
                      : "bg-slate-200 justify-start"
                  }`}
                >
                  <span className="mx-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-semibold text-slate-700">
                    {pref.enabled ? "On" : "Off"}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Database className="h-5 w-5 text-slate-700" />
            <h3 className="text-lg font-semibold text-slate-900">
              Integrations
            </h3>
          </div>
          <div className="mt-4 space-y-4 text-sm text-slate-600">
            {[
              {
                label: "OpenDental API endpoint",
                value: "https://api.opendental.com/v1",
                icon: "🔗",
              },
              {
                label: "GoHighLevel workspace",
                value: "ghl-workspace-2024",
                icon: "✓",
              },
              {
                label: "Sync logs storage",
                value: "AWS S3 Bucket: ghl-sync-logs",
                icon: "📦",
              },
            ].map((item, idx) => (
              <Fragment key={item.label}>
                <div>
                  <p className="font-semibold text-slate-900">{item.label}</p>
                  <p className="text-xs text-slate-500">{item.value}</p>
                </div>
                {idx < 2 && <div className="h-px bg-slate-100" />}
              </Fragment>
            ))}
          </div>
          <button className="mt-6 w-full rounded-2xl border border-dashed border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">
            Edit integrations
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
