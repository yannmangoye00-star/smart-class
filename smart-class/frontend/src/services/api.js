import axios from "axios";

const configuredBaseURL = (
  import.meta.env.VITE_API_BASE_URL || "https://smartclass-backend-1jwt.onrender.com"
).replace(/\/+$/, "");

export const API_BASE_URL = configuredBaseURL.endsWith("/api")
  ? configuredBaseURL
  : `${configuredBaseURL}/api`;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const rawSession = localStorage.getItem("smartclass-auth-session");
    let token = localStorage.getItem("token");

    if (rawSession) {
      try {
        const session = JSON.parse(rawSession);
        token = session?.token || token;
      } catch {
        localStorage.removeItem("smartclass-auth-session");
      }
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("smartclass-auth-session");
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;