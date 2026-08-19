import { Navigate, Route, Routes } from 'react-router-dom';

// Pages publiques
import Home from '../pages/Home.jsx';
import AuthPage from '../pages/AuthPage.jsx';

// Pages protégées
import Dashboard from '../pages/Dashboard.jsx';
import StudentDashboard from '../pages/StudentDashboard.jsx';
import TeacherDashboard from '../pages/TeacherDashboard.jsx';
import AdminDashboard from '../pages/AdminDashboard.jsx';
import ParentDashboard from '../pages/ParentDashboard.jsx';
import ProfilePage from '../pages/ProfilePage.jsx';
import StudentsPage from '../pages/StudentsPage.jsx';
import TeachersPage from '../pages/TeachersPage.jsx';
import EstablishmentsPage from '../pages/EstablishmentsPage.jsx';

// Composants Espace Élève
import StudentCourses from '../components/StudentCourses.jsx';
import StudentHomeworks from '../components/StudentHomeworks.jsx';
import TeacherCourses from '../components/TeacherCourses.jsx';

// Layout & Sécurité
import ProtectedRoute from '../components/ProtectedRoute.jsx';
import MainLayout from '../layouts/MainLayout.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      {/* ==================== ROUTES PUBLIQUES ==================== */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/signin" element={<AuthPage />} />

      {/* ==================== SUPER ADMIN ==================== */}
      <Route
        path="/super-admin/establishments"
        element={
          <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
            <EstablishmentsPage />
          </ProtectedRoute>
        }
      />

      {/* ==================== ROUTES AVEC MAIN LAYOUT ==================== */}
      <Route element={<MainLayout />}>
        
        {/* Dashboard générique */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Espace Élève */}
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute allowedRoles={['STUDENT']}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses"
          element={
            <ProtectedRoute allowedRoles={['STUDENT']}>
              <StudentCourses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/devoirs"
          element={
            <ProtectedRoute allowedRoles={['STUDENT']}>
              <StudentHomeworks />
            </ProtectedRoute>
          }
        />

        {/* Espace Enseignant */}
        <Route
          path="/teacher-dashboard"
          element={
            <ProtectedRoute allowedRoles={['TEACHER']}>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />

<Route
  path="/teacher/courses"
  element={
    <ProtectedRoute allowedRoles={['TEACHER']}>
      <TeacherCourses />
    </ProtectedRoute>
  }
/>

        {/* Espace Admin */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/students"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <StudentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/teachers"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <TeachersPage />
            </ProtectedRoute>
          }
        />

        {/* Espace Parent */}
        <Route
          path="/parent-dashboard"
          element={
            <ProtectedRoute allowedRoles={['PARENT']}>
              <ParentDashboard />
            </ProtectedRoute>
          }
        />

        {/* Profil Utilisateur */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        {/* Liste des étudiants (Accessible aux admins et enseignants) */}
        <Route
          path="/students"
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'TEACHER']}>
              <StudentsPage />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Redirection par défaut si la route n'existe pas */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}