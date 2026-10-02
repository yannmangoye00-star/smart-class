import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GraduationCap, LogIn } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("STUDENT");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await login({ email, password, role });
      const userRole = data.user?.role || data.role || role;

      // Redirection dynamique vers le bon dashboard
      redirectByRole(userRole);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Identifiants incorrects ou accès refusé.");
    } finally {
      setLoading(false);
    }
  };

  const redirectByRole = (targetRole) => {
    switch (targetRole) {
      case "PARENT":
        navigate("/parent-dashboard");
        break;
      case "TEACHER":
        navigate("/teacher-dashboard");
        break;
      case "ADMIN":
        navigate("/admin-dashboard");
        break;
      case "SUPER_ADMIN":
        navigate("/super-admin-dashboard");
        break;
      case "STUDENT":
      default:
        navigate("/student-dashboard");
        break;
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4 text-slate-100">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400">
            <GraduationCap size={28} />
          </div>
          <h1 className="text-2xl font-bold text-white">Connexion Smart Classe</h1>
          <p className="mt-1 text-xs text-slate-400">Entrez vos identifiants pour accéder à votre espace</p>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="votre@email.com"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Mot de passe</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Rôle</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="STUDENT">Élève</option>
              <option value="PARENT">Parent</option>
              <option value="TEACHER">Enseignant</option>
              <option value="ADMIN">Administrateur</option>
              <option value="SUPER_ADMIN">Super Admin</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 transition shadow-lg shadow-blue-500/25 disabled:opacity-50"
          >
            <LogIn size={18} />
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-400">
          Vous n'avez pas encore de compte ?{" "}
          <Link to="/register" className="font-semibold text-blue-400 hover:underline">
            S'inscrire
          </Link>
        </div>
      </div>
    </div>
  );
}