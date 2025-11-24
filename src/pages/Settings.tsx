import { Fragment, useState } from 'react';

const toggles = [
  {
    id: 'alerts',
    label: 'Escalation alerts',
    detail: 'Send Slack + email notification when retries exceed threshold.',
    enabled: true,
  },
  {
    id: 'backup',
    label: 'Daily backups',
    detail: 'Store payload snapshots in cold storage for 30 days.',
    enabled: true,
  },
  {
    id: 'sandbox',
    label: 'Sandbox sync',
    detail: 'Mirror payloads into GHL sandbox workspace for QA.',
    enabled: false,
  },
];

const Settings = () => {
  const [preferences, setPreferences] = useState(toggles);

  const togglePref = (id: string) => {
    setPreferences((prev) =>
      prev.map((pref) =>
        pref.id === id ? { ...pref, enabled: !pref.enabled } : pref,
      ),
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Workspace settings</h2>
        <p className="text-sm text-slate-500">
          Configure alerts, safe guards, and destinations for the New York workspace.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Safeguards</h3>
          <div className="mt-6 space-y-4">
            {preferences.map((pref) => (
              <div key={pref.id} className="flex items-center justify-between gap-4 rounded-2xl border border-slate-100 px-4 py-3">
                <div>
                  <p className="font-semibold text-slate-900">{pref.label}</p>
                  <p className="text-xs text-slate-500">{pref.detail}</p>
                </div>
                <button
                  onClick={() => togglePref(pref.id)}
                  className={`flex h-8 w-16 items-center rounded-full transition ${pref.enabled ? 'bg-lumeo justify-end' : 'bg-slate-200 justify-start'}`}
                >
                  <span className="mx-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-semibold text-slate-700">
                    {pref.enabled ? 'On' : 'Off'}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Destinations</h3>
          <div className="mt-4 space-y-4 text-sm text-slate-600">
            {[
              { label: 'Primary Go High Level workspace', value: 'revops@lumeo.com' },
              { label: 'Secondary workspace', value: 'sandbox@lumeo.com' },
              { label: 'Escalation Slack channel', value: '#revops-escalations' },
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
          <button className="mt-6 w-full rounded-2xl border border-dashed border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600">
            Add destination
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
