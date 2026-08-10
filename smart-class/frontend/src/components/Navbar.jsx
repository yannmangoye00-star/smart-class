import { Bell, Menu, Search, UserCircle2 } from 'lucide-react';

export default function Navbar({ onToggleSidebar }) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="flex items-center justify-between gap-3 px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="rounded-xl border border-slate-800 p-2 text-slate-300 md:hidden"
          >
            <Menu size={18} />
          </button>

          <div className="hidden items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-300 md:flex">
            <Search size={15} />
            <span>Rechercher</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-xl border border-slate-800 p-2 text-slate-300 transition hover:border-orange-400 hover:text-orange-300"
          >
            <Bell size={18} />
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm font-semibold text-white"
          >
            <UserCircle2 size={16} />
            Admin
          </button>
        </div>
      </div>
    </header>
  );
}
