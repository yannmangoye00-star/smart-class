import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import authService from '../services/authService.js';

const AuthContext = createContext(null);
const STORAGE_KEY = 'smartclass-auth-session';

const defaultSession = {
  isAuthenticated: false,
  role: null,
  user: null,
  token: null,
  expiresAt: null,
  loading: false,
};

const normalizeRole = (role) => String(role || 'STUDENT').toUpperCase();
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const persistSession = (session) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
};

const clearSession = () => {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(STORAGE_KEY);
};

const readStoredSession = () => {
  if (typeof window === 'undefined') return null;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    if (parsed.expiresAt && parsed.expiresAt < Date.now()) {
      clearSession();
      return null;
    }
    return parsed;
  } catch {
    clearSession();
    return null;
  }
};

const buildSession = (response) => {
  const role = normalizeRole(response.user?.role || response.role || 'STUDENT');
  const user = {
    email: response.user?.email || response.email,
    name: response.user?.name || response.name || (response.user?.email || response.email)?.split('@')[0],
    role,
  };

  return {
    isAuthenticated: true,
    role,
    user,
    token: response.token || response.user?.token,
    expiresAt: Date.now() + 1000 * 60 * 60 * 2,
    loading: false,
  };
};

export function AuthProvider({ children }) {
  // 🎯 FIX 1 : Si un token est en mémoire, on garde loading à true le temps de vérifier la session
  const [auth, setAuth] = useState(() => {
    const stored = readStoredSession();
    if (stored?.token) {
      return { ...stored, loading: true };
    }
    return { ...defaultSession, loading: false };
  });

  useEffect(() => {
    const restoreSession = async () => {
      const stored = readStoredSession();
      if (!stored?.token) {
        setAuth({ ...defaultSession, loading: false });
        return;
      }

      try {
        const currentUser = await authService.getCurrentUser();
        const nextSession = buildSession({
          ...currentUser,
          token: stored.token,
        });

        persistSession(nextSession);
        setAuth(nextSession);
      } catch {
        clearSession();
        setAuth({ ...defaultSession, loading: false });
      }
    };

    restoreSession();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (auth.isAuthenticated && auth.expiresAt && auth.expiresAt < Date.now()) {
        clearSession();
        setAuth({ ...defaultSession, loading: false });
      }
    }, 1000);

    return () => window.clearInterval(timer);
  }, [auth]);

  const login = async ({ email, password, role = 'STUDENT' }) => {
    if (!validateEmail(email)) {
      throw new Error('Adresse e-mail invalide.');
    }

    if (!password || password.length < 6) {
      throw new Error('Le mot de passe doit contenir au moins 6 caractères.');
    }

    setAuth((current) => ({ ...current, loading: true }));

    try {
      const response = await authService.login({ email, password, role });
      if (!response || (!response.token && !response.user?.token)) {
        throw new Error('Identifiants incorrects ou problème serveur.');
      }

      const nextSession = buildSession(response);
      persistSession(nextSession);
      setAuth(nextSession);
      return response;
    } catch (error) {
      setAuth((current) => ({ ...current, loading: false }));
      throw error;
    }
  };

  const register = async ({ name, email, password, role = 'STUDENT' }) => {
    if (!name?.trim()) {
      throw new Error('Le nom complet est requis.');
    }

    if (!validateEmail(email)) {
      throw new Error('Adresse e-mail invalide.');
    }

    if (!password || password.length < 6) {
      throw new Error('Le mot de passe doit contenir au moins 6 caractères.');
    }

    setAuth((current) => ({ ...current, loading: true }));

    try {
      const response = await authService.register({ name, email, password, role });

      // 🎯 FIX 2 : Vérification souple compatible avec le JSON direct de Spring Boot
      if (!response || response.success === false) {
        throw new Error(response?.message || 'Inscription impossible.');
      }

      const nextSession = buildSession(response);
      persistSession(nextSession);
      setAuth(nextSession);
      return response;
    } catch (error) {
      setAuth((current) => ({ ...current, loading: false }));
      throw error;
    }
  };

  const forgotPassword = async ({ email }) => {
    if (!validateEmail(email)) {
      throw new Error('Adresse e-mail invalide.');
    }

    setAuth((current) => ({ ...current, loading: true }));

    try {
      const response = await authService.forgotPassword({ email });
      if (response && response.success === false) {
        throw new Error(response.message || 'La demande de réinitialisation a échoué.');
      }
      setAuth((current) => ({ ...current, loading: false }));
      return response;
    } catch (error) {
      setAuth((current) => ({ ...current, loading: false }));
      throw error;
    }
  };

  const resetPassword = async ({ email, token, password }) => {
    if (!validateEmail(email)) {
      throw new Error('Adresse e-mail invalide.');
    }

    if (!token?.trim()) {
      throw new Error('Le token de réinitialisation est requis.');
    }

    if (!password || password.length < 6) {
      throw new Error('Le nouveau mot de passe doit contenir au moins 6 caractères.');
    }

    setAuth((current) => ({ ...current, loading: true }));

    try {
      const response = await authService.resetPassword({ email, token, password });
      if (response && response.success === false) {
        throw new Error(response.message || 'La réinitialisation a échoué.');
      }
      setAuth((current) => ({ ...current, loading: false }));
      return response;
    } catch (error) {
      setAuth((current) => ({ ...current, loading: false }));
      throw error;
    }
  };

  const verifyEmail = async ({ email, code }) => {
    if (!validateEmail(email)) {
      throw new Error('Adresse e-mail invalide.');
    }

    if (!code?.trim()) {
      throw new Error('Le code de vérification est requis.');
    }

    setAuth((current) => ({ ...current, loading: true }));

    try {
      const response = await authService.verifyEmail({ email, code });
      if (response && response.success === false) {
        throw new Error(response.message || 'La vérification a échoué.');
      }
      setAuth((current) => ({ ...current, loading: false }));
      return response;
    } catch (error) {
      setAuth((current) => ({ ...current, loading: false }));
      throw error;
    }
  };

  const logout = () => {
    clearSession();
    setAuth({ ...defaultSession, loading: false });
  };

  const value = useMemo(
    () => ({
      ...auth,
      login,
      register,
      forgotPassword,
      resetPassword,
      verifyEmail,
      logout,
    }),
    [auth],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}