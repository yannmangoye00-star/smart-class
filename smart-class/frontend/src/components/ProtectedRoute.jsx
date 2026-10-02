import { Navigate } from "react-router-dom";
import authService from "../services/authService";

export default function ProtectedRoute({ children, allowedRoles }) {
  const session = authService.getSession();
  const token = session?.token || localStorage.getItem("token");
  const storedUser = session?.user || (() => {
    const storedUserRaw = localStorage.getItem("user");
    return storedUserRaw ? JSON.parse(storedUserRaw) : null;
  })();
  const userRole = storedUser?.role;

  // 1. Si pas connecté (pas de token), redirection vers /login
  if (!token || !storedUser) {
    return <Navigate to="/login" replace />;
  }

  // 2. Vérification optionnelle des rôles autorisés
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}