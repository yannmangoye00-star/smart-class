import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute";

// Pages d'authentification
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/register";

// Pages des tableaux de bord
import StudentDashboard from "../pages/StudentDashboard";
import TeacherDashboard from "../pages/TeacherPage";
import AdminDashboard from "../pages/AdminDashboard";
import SuperAdminDashboard from "../pages/SuperAdminDashboard";
import ParentDashboard from "../pages/ParentDashboard";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Routes Publiques */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Routes Protégées */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/super-admin-dashboard" element={<SuperAdminDashboard />} />
        <Route path="/parent-dashboard" element={<ParentDashboard />} />
      </Route>

      {/* Route de secours */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}