export default function Toast({ toast }) {
  if (!toast) return null;

  const palette = {
    success: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-100',
    error: 'border-rose-500/50 bg-rose-500/10 text-rose-100',
    info: 'border-blue-500/50 bg-blue-500/10 text-blue-100',
  };

  return (
    <div className="fixed right-4 top-4 z-50 max-w-sm rounded-2xl border px-4 py-3 text-sm shadow-2xl shadow-slate-950/40 backdrop-blur">
      <div className={`rounded-xl border px-3 py-2 ${palette[toast.type] || palette.info}`}>
        {toast.message}
      </div>
    </div>
  );
}
