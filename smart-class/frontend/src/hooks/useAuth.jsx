import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import authService from "../services/authService";

const AuthContext = createContext(null);

const defaultSession = {
  isAuthenticated: false,
  role: null,
  user: null,
  token: null,
  loading: false,
};

const normalizeRole = (role) => {
  return String(role || "").toUpperCase();
};

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const session = authService.getSession();

    if (!session?.token) {
      return defaultSession;
    }

    return {
      isAuthenticated: true,
      role: normalizeRole(session.user?.role),
      user: session.user,
      token: session.token,
      loading: false,
    };
  });

  useEffect(() => {
    const restoreSession = async () => {
      const session = authService.getSession();

      if (!session?.token) {
        return;
      }

      try {
        const response = await authService.me();

        const user = {
          email: response.email,
          name: response.name,
          role: normalizeRole(response.role),
        };

        const updatedSession = {
          isAuthenticated: true,
          role: user.role,
          user,
          token: session.token,
          loading: false,
        };

        localStorage.setItem(
          "smartclass-auth-session",
          JSON.stringify({
            token: session.token,
            user,
          })
        );

        setAuth(updatedSession);
      } catch {
        authService.logout();
        setAuth(defaultSession);
      }
    };

    restoreSession();
  }, []);

  const login = async ({ email, password, role }) => {
    setAuth((current) => ({
      ...current,
      loading: true,
    }));

    try {
      const response = await authService.login({
        email,
        password,
        role,
      });

      const user = {
        email: response.email,
        name: response.name,
        role: normalizeRole(response.role),
      };

      const nextAuth = {
        isAuthenticated: true,
        role: user.role,
        user,
        token: response.token,
        loading: false,
      };

      localStorage.setItem(
        "smartclass-auth-session",
        JSON.stringify({
          token: response.token,
          user,
        })
      );

      setAuth(nextAuth);

      return response;
    } catch (error) {
      setAuth((current) => ({
        ...current,
        loading: false,
      }));

      throw error;
    }
  };

  const register = async ({
    name,
    email,
    password,
    role,
  }) => {
    setAuth((current) => ({
      ...current,
      loading: true,
    }));

    try {
      const response = await authService.register({
        name,
        email,
        password,
        role,
      });

      setAuth((current) => ({
        ...current,
        loading: false,
      }));

      return response;
    } catch (error) {
      setAuth((current) => ({
        ...current,
        loading: false,
      }));

      throw error;
    }
  };

  const forgotPassword = async (data) => {
    return authService.forgotPassword(data);
  };

  const resetPassword = async (data) => {
    return authService.resetPassword(data);
  };

  const verifyEmail = async (data) => {
    return authService.verifyEmail(data);
  };

  const logout = () => {
    authService.logout();
    setAuth(defaultSession);
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
    [auth]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth doit être utilisé à l'intérieur de AuthProvider"
    );
  }

  return context;
}