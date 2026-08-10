export default function DataTable({ title, subtitle, columns, rows }) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-4 shadow-xl shadow-slate-950/30 md:p-5">
      <div className="mb-4">
        <h2 className="text-base font-bold text-white">{title}</h2>
        {subtitle ? <p className="text-xs text-slate-400">{subtitle}</p> : null}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-800">
        <table className="min-w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-950 text-xs uppercase text-slate-400">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-4 py-3 font-semibold">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-slate-800 bg-slate-900/60">
                {columns.map((column) => (
                  <td key={`${row.id}-${column.key}`} className="px-4 py-3">
                    {row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
