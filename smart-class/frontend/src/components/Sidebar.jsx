import { NavLink } from 'react-router-dom';
import {
  GraduationCap,
  House,
  LogIn,
  LayoutDashboard,
  Shield,
  UserCircle2,
  Settings,
  Bell,
  Users,
  UserRound,
  Users2,
} from 'lucide-react';

const links = [
  { to: '/', label: 'Accueil', icon: House },
  { to: '/login', label: 'Connexion', icon: LogIn },
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/student-dashboard', label: 'Étudiant', icon: GraduationCap },
  { to: '/teacher-dashboard', label: 'Enseignant', icon: UserCircle2 },
  { to: '/admin-dashboard', label: 'Admin', icon: Shield },
  { to: '/parent-dashboard', label: 'Parent', icon: Users },
  { to: '/students', label: 'Étudiants', icon: Users2 },
  { to: '/profile', label: 'Profil', icon: UserRound },
];

export default function Sidebar({ open, onClose }) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-slate-800 bg-slate-950/95 p-4 backdrop-blur transition-transform duration-200 md:static md:translate-x-0 ${
        open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}
    >
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-orange-400 p-2 text-white shadow-lg shadow-blue-900/40">
            <GraduationCap size={18} />
          </div>
          <div>
            <p className="text-base font-bold text-white">Smart Classe</p>
            <p className="text-[11px] text-slate-400">SaaS Education</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border border-slate-800 px-2 py-1 text-xs text-slate-300 md:hidden"
        >
          Fermer
        </button>
      </div>

      <nav className="space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-950/50'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`
              }
            >
              <Icon size={16} />
              {link.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-8 rounded-2xl border border-orange-500/30 bg-orange-500/10 p-3 text-xs text-orange-100">
        <div className="mb-2 flex items-center gap-2 font-semibold">
          <Bell size={14} />
          Notifications
        </div>
        <p>3 nouveaux événements à suivre dans la plateforme.</p>
      </div>

      <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-3 text-xs text-slate-300">
        <div className="mb-2 flex items-center gap-2 font-semibold text-white">
          <Settings size={14} />
          Paramètres rapides
        </div>
        <p>Profil, sécurité, intégration, thème, API.</p>
      </div>
    </aside>
  );
}
