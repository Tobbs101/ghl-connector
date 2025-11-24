import { useState } from "react";
import { CheckCircle2, SlidersHorizontal } from "lucide-react";
import { mappingGroups } from "../data/mockData";

type MappingState = typeof mappingGroups;

const Mapping = () => {
  const [groups, setGroups] = useState<MappingState>(mappingGroups);

  const toggleField = (groupIndex: number, fieldId: string) => {
    setGroups((prev) =>
      prev.map((group, idx) => {
        if (idx !== groupIndex) return group;
        return {
          ...group,
          fields: group.fields.map((field) =>
            field.id === fieldId ? { ...field, enabled: !field.enabled } : field
          ),
        };
      })
    );
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            Payload mapping
          </h2>
          <p className="text-sm text-slate-500">
            Choose which fields every integration is allowed to send into GHL.
            Toggle fields per collection and Lumeo will enforce validation
            before delivery.
          </p>
        </div>
        {groups.map((group, groupIndex) => (
          <div
            key={group.category}
            className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {group.category}
                </h3>
                <p className="text-sm text-slate-500">{group.description}</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                {group.fields.filter((field) => field.enabled).length} enabled
              </span>
            </div>
            <div className="mt-6 space-y-4">
              {group.fields.map((field) => (
                <div
                  key={field.id}
                  className="flex items-center justify-between rounded-2xl border border-slate-100 px-4 py-3"
                >
                  <div>
                    <p className="font-semibold text-slate-900">
                      {field.label}
                    </p>
                    <p className="text-xs text-slate-500">
                      Maps to GHL custom field
                    </p>
                  </div>
                  <button
                    onClick={() => toggleField(groupIndex, field.id)}
                    className={`flex h-8 w-16 items-center rounded-full transition ${
                      field.enabled
                        ? "bg-lumeo justify-end"
                        : "bg-slate-200 justify-start"
                    }`}
                    aria-pressed={field.enabled}
                  >
                    <span className="mx-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-semibold text-slate-700">
                      {field.enabled ? "On" : "Off"}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 text-slate-900">
            <SlidersHorizontal className="h-10 w-10 rounded-2xl bg-slate-100 p-2" />
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
                Profiles
              </p>
              <p className="text-xl font-semibold">Routing presets</p>
            </div>
          </div>
          <ul className="mt-6 space-y-4 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-1 h-4 w-4 text-emerald-500" />
              <span>Shopify &gt; GHL Contacts (Primary)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-1 h-4 w-4 text-emerald-500" />
              <span>Stripe &gt; GHL Deals (Revenue Ops)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-1 h-4 w-4 text-emerald-500" />
              <span>Webhooks &gt; Slack (Escalations)</span>
            </li>
          </ul>
        </div>
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">
            Field validations
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            Payloads are staged until every mandatory field passes formatting.
            Failed payloads can be auto-corrected with workflows.
          </p>
          <dl className="mt-6 grid grid-cols-2 gap-4 text-sm text-slate-500">
            <div>
              <dt>Merged duplicates</dt>
              <dd className="text-2xl font-semibold text-slate-900">37</dd>
            </div>
            <div>
              <dt>Schema drifts</dt>
              <dd className="text-2xl font-semibold text-amber-500">5</dd>
            </div>
            <div>
              <dt>Auto fixes</dt>
              <dd className="text-2xl font-semibold text-emerald-500">62</dd>
            </div>
            <div>
              <dt>Manual review</dt>
              <dd className="text-2xl font-semibold text-rose-500">8</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Mapping;
