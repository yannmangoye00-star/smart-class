import {
  LayoutDashboard,
  Baby,
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

export default function SidebarParent({ onOpenAI }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const menus = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/parent-dashboard",
    },
    {
      name: "Mon enfant",
      icon: Baby,
      path: "/parent/children", // Mis à jour pour pointer vers la page d'évolution
    },
    {
      name: "Cours",
      icon: BookOpen,
      path: "/courses",
    },
    {
      name: "Devoirs",
      icon: ClipboardCheck,
      path: "/assignments",
    },
    {
      name: "Notes",
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
      isModalTrigger: true,
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
          Espace Parent
        </p>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto p-4">
        {menus.map((item) => {
          const Icon = item.icon;

          if (item.isModalTrigger) {
            return (
              <button
                key={item.name}
                type="button"
                onClick={onOpenAI}
                className="mb-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white cursor-pointer"
              >
                <Icon size={20} className="text-blue-400" />
                <span>{item.name}</span>
              </button>
            );
          }

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `mb-2 flex items-center gap-3 rounded-xl px-4 py-3 transition ${
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

      {/* Profil */}
      <div className="border-t border-slate-800 p-5">
        <div className="mb-5 flex items-center gap-3">
          <img
            src={`https://ui-avatars.com/api/?name=${
              user?.name || "Parent"
            }&background=2563eb&color=ffffff`}
            alt="Avatar"
            className="h-12 w-12 rounded-full"
          />

          <div>
            <h3 className="font-semibold">
              {user?.name || "Parent"}
            </h3>

            <p className="text-sm text-slate-400">
              Parent
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-medium transition hover:bg-red-700 cursor-pointer"
        >
          <LogOut size={18} />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}