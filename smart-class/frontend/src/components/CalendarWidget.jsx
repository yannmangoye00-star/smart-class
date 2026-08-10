export default function CalendarWidget() {
  const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  const dates = [1, 2, 3, 4, 5, 6, 7];

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-4 shadow-xl shadow-slate-950/30 md:p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white">Calendrier</h2>
          <p className="text-xs text-slate-400">Planning et évènements</p>
        </div>
        <span class="rounded-full bg-orange-500/15 px-3 py-1 text-[11px] font-semibold text-orange-300">Juillet</span>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-xs text-slate-400">
        {days.map((day) => (
          <div key={day} className="py-2 font-semibold">
            {day}
          </div>
        ))}

        {dates.map((date) => (
          <div
            key={date}
            className={`rounded-xl border p-3 ${
              date === 3 || date === 5
                ? 'border-orange-500/40 bg-orange-500/10 text-orange-100'
                : 'border-slate-800 bg-slate-950 text-slate-300'
            }`}
          >
            {date}
          </div>
        ))}
      </div>
    </section>
  );
}
