// Remarque le /api/courses pour correspondre au backend
const API_URL = "http://localhost:8080/api/courses"; 

export const courseService = {
  getAllCourses: async () => {
    // Récupère le token JWT stocké au login
    const token = localStorage.getItem("token"); 

    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : "",
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur ${response.status}: Accès refusé ou introuvable`);
    }

    return response.json();
  },

  createCourse: async (title, classLevel, file) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("classLevel", classLevel);
    if (file) formData.append("file", file);

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": token ? `Bearer ${token}` : "",
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Erreur ${response.status}: Impossible de créer le cours`);
    }

    return response.json();
  },
};