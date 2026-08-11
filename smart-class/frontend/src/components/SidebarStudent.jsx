import {
  LayoutDashboard,
  BookOpen,
  ClipboardCheck,
  ClipboardList,
  CalendarDays,
  MessageCircle,
  Bot,
  User,
  Settings,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function SidebarStudent() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const menus = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/student-dashboard",
    },
    {
      name: "Mes cours",
      icon: BookOpen,
      path: "/courses",
    },
    {
      name: "Mes devoirs",
      icon: ClipboardCheck,
      path: "/assignments",
    },
    {
      name: "Mes notes",
      icon: ClipboardList,
      path: "/grades",
    },
    {
      name: "Emploi du temps",
      icon: CalendarDays,
      path: "/schedule",
    },
    {
      name: "Messages",
      icon: MessageCircle,
      path: "/messages",
    },
    {
      name: "Assistant IA",
      icon: Bot,
      path: "/assistant",
    },
    {
      name: "Mon profil",
      icon: User,
      path: "/profile",
    },
    {
      name: "Paramètres",
      icon: Settings,
      path: "/settings",
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <aside className="flex h-screen w-72 flex-col bg-slate-900 text-white shadow-2xl">

      {/* Logo */}
      <div className="border-b border-slate-800 p-6">
        <h1 className="text-2xl font-bold text-blue-400">
          🎓 Smart Classe
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Espace Élève
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">

        {menus.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `mb-2 flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}

      </nav>

      {/* Utilisateur */}
      <div className="border-t border-slate-800 p-5">

        <div className="mb-5 flex items-center gap-3">

          <img
            src={`https://ui-avatars.com/api/?name=${
              user?.name || "Étudiant"
            }&background=2563eb&color=ffffff`}
            alt="Avatar"
            className="h-12 w-12 rounded-full"
          />

          <div>
            <h3 className="font-semibold">
              {user?.name || "Étudiant"}
            </h3>

            <p className="text-sm text-slate-400">
              Élève
            </p>
          </div>

        </div>

        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-medium transition hover:bg-red-700"
        >
          <LogOut size={18} />
          Déconnexion
        </button>

      </div>

    </aside>
  );
}