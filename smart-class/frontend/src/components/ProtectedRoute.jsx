import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const storedUserRaw = localStorage.getItem("user");
  const storedUser = storedUserRaw ? JSON.parse(storedUserRaw) : null;
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