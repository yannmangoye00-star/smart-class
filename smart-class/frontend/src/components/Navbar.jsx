import { Search, Bell, CalendarDays, Moon } from "lucide-react";

export default function Navbar() {
  const today = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between shadow-sm">

      {/* Recherche */}
      <div className="relative w-96">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Rechercher un étudiant, un cours..."
          className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 focus:border-blue-500 focus:outline-none"
        />
      </div>

      {/* Partie droite */}
      <div className="flex items-center gap-6">

        <div className="hidden lg:flex items-center gap-2 text-slate-600">
          <CalendarDays size={18} />
          <span>{today}</span>
        </div>

        <button className="rounded-xl p-2 hover:bg-slate-100">
          <Moon size={20} />
        </button>

        <button className="relative rounded-xl p-2 hover:bg-slate-100">
          <Bell size={20} />

          <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
            3
          </span>
        </button>

        <div className="flex items-center gap-3">

          <img
            src="https://ui-avatars.com/api/?name=Yann+Floyd&background=2563eb&color=fff"
            alt="avatar"
            className="h-11 w-11 rounded-full"
          />

          <div className="hidden md:block">
            <h3 className="font-semibold text-slate-800">
              Yann Floyd
            </h3>

            <p className="text-sm text-slate-500">
              Administrateur
            </p>
          </div>

        </div>

      </div>

    </header>
  );
}