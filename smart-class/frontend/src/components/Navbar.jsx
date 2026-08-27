import { Search, Bell, CalendarDays, Moon } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { t, i18n } = useTranslation();

  // Authentification
  const { user, logout } = useAuth();

  const today = new Date().toLocaleDateString(
    i18n.language === "en" ? "en-US" : "fr-FR",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-800 bg-slate-900 px-8 text-white shadow-md">

      {/* Recherche */}
      <div className="relative w-96">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder={t("navigation.search")}
          className="w-full rounded-xl border border-slate-700 bg-slate-800/80 py-2.5 pl-11 pr-4 text-sm text-white placeholder-slate-400 transition focus:border-blue-500 focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Partie droite */}
      <div className="flex items-center gap-6">

        {/* Langue */}
        <LanguageSwitcher />

        {/* Date */}
        <div className="hidden items-center gap-2 text-slate-300 lg:flex capitalize text-sm">
          <CalendarDays size={18} className="text-blue-400" />
          <span>{today}</span>
        </div>

        {/* Mode sombre */}
        <button
          type="button"
          className="rounded-xl p-2 text-slate-300 transition hover:bg-slate-800 hover:text-white"
          title={t("navigation.darkMode")}
        >
          <Moon size={20} />
        </button>

        {/* Notifications */}
        <button
          type="button"
          className="relative rounded-xl p-2 text-slate-300 transition hover:bg-slate-800 hover:text-white"
          title={t("navigation.notifications")}
        >
          <Bell size={20} />

          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            3
          </span>
        </button>

        {/* Profil + menu */}
        <div className="relative group">

          <button
            type="button"
            className="flex items-center gap-3"
          >
            <img
              src="https://ui-avatars.com/api/?name=Yann+Floyd&background=2563eb&color=fff"
              alt="avatar"
              className="h-11 w-11 rounded-full border border-slate-700 shadow-sm"
            />

            <div className="hidden md:block text-left">
              <h3 className="font-semibold text-white">
                {user?.name || "Utilisateur"}
              </h3>

              <p className="text-xs text-slate-400">
                {user?.role || "Utilisateur"}
              </p>
            </div>
          </button>

          {/* Menu profil */}
          <div className="absolute right-0 top-full z-50 mt-3 hidden w-52 rounded-2xl border border-slate-700 bg-slate-900 p-2 shadow-xl group-hover:block">

            {/* Profil */}
            <button
              type="button"
              onClick={() => {
                window.location.href = "/profile";
              }}
              className="w-full rounded-xl px-4 py-2 text-left text-sm text-slate-300 transition hover:bg-slate-800"
            >
              👤 Mon profil
            </button>

            {/* Déconnexion */}
            <button
              type="button"
              onClick={logout}
              className="w-full rounded-xl px-4 py-2 text-left text-sm text-red-400 transition hover:bg-red-500/10"
            >
              🚪 Déconnexion
            </button>

          </div>
        </div>

      </div>
    </header>
  );
}