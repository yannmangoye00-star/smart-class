import { Outlet, useNavigate } from "react-router-dom";
import { LogOut, LayoutDashboard, User } from "lucide-react";

export default function MainLayout() {
  const navigate = useNavigate();
  
  // Récupération des infos de l'utilisateur connecté
  const userRaw = localStorage.getItem("user");
  const user = userRaw ? JSON.parse(userRaw) : null;

  const handleLogout = () => {
    // Vider la session
    localStorage.clear();
    // Rediriger vers la connexion
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Barre de navigation supérieure */}
      <header className="border-b border-slate-800 bg-slate-900 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white">
            SC
          </div>
          <span className="font-semibold text-lg text-white">Smart Classe</span>
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
              <User size={14} className="text-blue-400" />
              <span>{user.email}</span>
              <span className="bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded font-bold uppercase text-[10px]">
                {user.role}
              </span>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1.5 text-xs font-semibold transition"
          >
            <LogOut size={16} />
            Déconnexion
          </button>
        </div>
      </header>

      {/* Contenu de la page (les dashboards s'affichent ici) */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}