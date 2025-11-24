type TimelineItem = {
  id: number;
  status: string;
  detail: string;
  time: string;
};

interface ActivityTimelineProps {
  items: TimelineItem[];
}

const ActivityTimeline = ({ items }: ActivityTimelineProps) => (
  <div className="rounded-3xl w-full border border-gray-100 bg-white p-6 shadow-sm">
    <h3 className="text-lg font-semibold text-slate-900">Activity timeline</h3>
    <div className="mt-6 space-y-6">
      {items.map((item, index) => (
        <div key={item.id} className="flex gap-4">
          <div className="flex flex-col items-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              {item.time}
            </span>
            {index < items.length - 1 && (
              <span
                className="mt-2 h-full w-px bg-slate-200"
                aria-hidden="true"
              />
            )}
          </div>
          <div>
            <span className="inline-flex rounded-full bg-slate-900/10 px-3 py-1 text-xs font-semibold text-slate-900">
              {item.status}
            </span>
            <p className="mt-2 text-sm text-slate-600">{item.detail}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ActivityTimeline;
