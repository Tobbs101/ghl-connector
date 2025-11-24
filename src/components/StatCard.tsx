interface StatCardProps {
  label: string;
  value: string | number;
  change: string;
  badgeColor: string;
}

const StatCard = ({ label, value, change, badgeColor }: StatCardProps) => (
  <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
    <p className="text-sm text-slate-500">{label}</p>
    <p className="mt-3 text-3xl font-semibold text-slate-900">{value}</p>
    <span className={`mt-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badgeColor}`}>
      {change}
    </span>
  </div>
);

export default StatCard;
