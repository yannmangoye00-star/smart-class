import api from "./api";

const STORAGE_KEY = "smartclass-auth-session";

const authService = {
  /*
   * ============================
   * CONNEXION
   * ============================
   */
  async login(credentials) {
    const response = await api.post("/auth/login", credentials);

    const data = response.data;

    const session = {
      token: data.token,

      user: {
        email: data.email,
        name: data.name,
        role: String(data.role || "STUDENT").toUpperCase(),
      },
    };

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(session)
    );

    return {
      ...data,
      success: true,
      user: session.user,
    };
  },

  /*
   * ============================
   * INSCRIPTION
   * ============================
   */
  async register(data) {
    const response = await api.post(
      "/auth/register",
      data
    );

    return response.data;
  },

  /*
   * ============================
   * UTILISATEUR CONNECTÉ
   * ============================
   */
  async me() {
    const response = await api.get("/auth/me");

    return response.data;
  },

  /*
   * ============================
   * MOT DE PASSE OUBLIÉ
   * ============================
   */
  async forgotPassword(data) {
    const response = await api.post(
      "/auth/forgot-password",
      data
    );

    return response.data;
  },

  /*
   * ============================
   * RÉINITIALISER MOT DE PASSE
   * ============================
   */
  async resetPassword(data) {
    const response = await api.post(
      "/auth/reset-password",
      data
    );

    return response.data;
  },

  /*
   * ============================
   * VÉRIFICATION EMAIL
   * ============================
   */
  async verifyEmail(data) {
    const response = await api.post(
      "/auth/verify-email",
      data
    );

    return response.data;
  },

  /*
   * ============================
   * DÉCONNEXION
   * ============================
   */
  logout() {
    localStorage.removeItem(STORAGE_KEY);
  },

  /*
   * ============================
   * SESSION
   * ============================
   */
  getSession() {
    const session =
      localStorage.getItem(STORAGE_KEY);

    if (!session) {
      return null;
    }

    try {
      return JSON.parse(session);
    } catch {
      return null;
    }
  },

  /*
   * ============================
   * TOKEN
   * ============================
   */
  getToken() {
    return this.getSession()?.token || null;
  },

  /*
   * ============================
   * UTILISATEUR
   * ============================
   */
  getCurrentUser() {
    return this.getSession()?.user || null;
  },

  /*
   * ============================
   * CONNECTÉ ?
   * ============================
   */
  isAuthenticated() {
    return Boolean(this.getToken());
  },
};

export default authService;