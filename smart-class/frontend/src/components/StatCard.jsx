export default function StatCard({ title, value, change, icon: Icon, tone = 'blue' }) {
  const toneStyles = {
    blue: 'from-blue-500/20 to-blue-400/5 text-blue-200 border-blue-500/20',
    orange: 'from-orange-500/20 to-orange-400/5 text-orange-100 border-orange-500/20',
    emerald: 'from-emerald-500/20 to-emerald-400/5 text-emerald-100 border-emerald-500/20',
  };

  return (
    <div className={`rounded-2xl border bg-gradient-to-br ${toneStyles[tone]} p-4 shadow-lg shadow-slate-950/30`}>
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-200">{title}</span>
        {Icon ? <Icon size={18} className="text-slate-200" /> : null}
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="mt-1 text-xs text-slate-300">{change}</div>
    </div>
  );
}
