import { BarChart3, Download, ShieldAlert } from 'lucide-react';
import { timeline } from '../data/mockData';

const Reports = () => (
  <div className="space-y-8">
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Reports</h2>
        <p className="text-sm text-slate-500">Audit every payload that entered or left the platform.</p>
      </div>
      <div className="flex gap-3">
        <button className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600">
          <Download className="mr-2 inline h-4 w-4" />
          Export CSV
        </button>
        <button className="inline-flex items-center gap-2 rounded-2xl bg-lumeo px-4 py-2 text-sm font-semibold text-white">
          Schedule report
        </button>
      </div>
    </div>

    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Delivery performance</h3>
          <BarChart3 className="h-5 w-5 text-slate-400" />
        </div>
        <p className="mt-2 text-sm text-slate-500">Rolling 7 day view</p>
        <div className="mt-6 grid grid-cols-7 gap-2">
          {[18, 15, 19, 22, 20, 24, 26].map((value, idx) => (
            <div key={idx} className="flex flex-col-reverse items-center gap-2">
              <div
                className="w-full rounded-full bg-gradient-to-t from-lumeo/30 to-lumeo"
                style={{ height: `${value * 10}px` }}
              />
              <span className="text-xs text-slate-400">D{idx + 1}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Failures by integration</h3>
          <ShieldAlert className="h-5 w-5 text-amber-500" />
        </div>
        <ul className="mt-6 space-y-4 text-sm text-slate-600">
          {[
            { label: 'Stripe invoices', count: 8, pct: 12 },
            { label: 'Shopify orders', count: 5, pct: 8 },
            { label: 'Facebook leads', count: 4, pct: 7 },
          ].map((item) => (
            <li key={item.label}>
              <div className="flex items-center justify-between text-slate-900">
                <span>{item.label}</span>
                <span className="font-semibold">{item.count}</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-slate-100">
                <div className="h-2 rounded-full bg-rose-500" style={{ width: `${item.pct * 2}%` }} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>

    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">Latest audit trail</h3>
      <div className="mt-6 space-y-4">
        {timeline.map((event) => (
          <div key={event.id} className="flex flex-col gap-2 rounded-2xl border border-slate-100 px-4 py-3 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{event.time}</p>
              <p className="mt-1 text-base text-slate-900">{event.detail}</p>
            </div>
            <span className="inline-flex rounded-full bg-slate-900/10 px-3 py-1 text-xs font-semibold text-slate-900">
              {event.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Reports;
