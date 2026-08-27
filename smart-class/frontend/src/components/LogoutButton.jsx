import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Nettoyer le stockage local si nécessaire (ex: localStorage.clear())
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    // Rediriger vers la page de connexion
    navigate("/login", { replace: true });
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 rounded-xl bg-red-600/20 px-4 py-2 text-sm font-medium text-red-400 border border-red-500/30 transition hover:bg-red-600 hover:text-white"
    >
      <LogOut size={16} />
      <span>Déconnexion</span>
    </button>
  );
}