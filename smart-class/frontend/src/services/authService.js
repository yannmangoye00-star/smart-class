import api from './api.js';

const normalizeRole = (role) => String(role || 'STUDENT').toUpperCase();

const buildAuthenticatedResponse = (response, fallbackMessage) => {
  const role = normalizeRole(response.role || response.user?.role);
  const email = response.email || response.user?.email;
  const name = response.name || response.user?.name || email?.split('@')[0];

  return {
    success: true,
    message: fallbackMessage,
    token: response.token,
    user: {
      email,
      name,
      role,
    },
  };
};

const getErrorMessage = (error) => {
  const apiMessage = error?.response?.data?.message;
  const apiErrors = error?.response?.data?.errors;

  if (apiMessage) {
    return apiMessage;
  }

  if (apiErrors && typeof apiErrors === 'object') {
    return Object.values(apiErrors).flat().join(' ');
  }

  return error?.message || 'Une erreur inattendue s’est produite.';
};

export const authService = {
  login: async (payload) => {
    try {
      const response = await api.post('/auth/login', {
        ...payload,
        role: normalizeRole(payload.role),
      });

      return buildAuthenticatedResponse(response.data, 'Connexion réussie.');
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  register: async (payload) => {
    try {
      const response = await api.post('/auth/register', {
        ...payload,
        role: normalizeRole(payload.role),
      });

      return buildAuthenticatedResponse(response.data, 'Inscription réussie.');
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      const role = normalizeRole(response.data.roles?.[0]?.replace('ROLE_', '') || 'STUDENT');

      return {
        success: true,
        user: {
          email: response.data.email,
          name: response.data.email?.split('@')[0],
          role,
        },
      };
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  forgotPassword: async () => {
    throw new Error('La récupération de mot de passe n’est pas encore exposée par l’API Spring Boot.');
  },

  resetPassword: async () => {
    throw new Error('La réinitialisation de mot de passe n’est pas encore exposée par l’API Spring Boot.');
  },

  verifyEmail: async () => {
    throw new Error('La vérification d’email n’est pas encore exposée par l’API Spring Boot.');
  },
};
