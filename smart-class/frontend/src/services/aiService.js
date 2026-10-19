// src/services/aiService.js
import { API_BASE_URL } from "./api";

const API_URL = `${API_BASE_URL}/ai`;

export const aiService = {
  // Élève : Tuteur IA
  askStudentTutor: async (prompt, subject) => {
    const res = await fetch(`${API_URL}/tutor`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ prompt, subject }),
    });
    return res.json();
  },

  // Enseignant : Générateur de QCM / Examen
  generateQuiz: async (topic, level, count) => {
    const res = await fetch(`${API_URL}/generate-quiz`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ topic, level, count }),
    });
    return res.json();
  },

  // Parent : Résumé du bulletin
  getStudentReport: async (studentId) => {
    const res = await fetch(`${API_URL}/parent-report/${studentId}`, {
      headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    });
    return res.json();
  },

  // Admin : Analyse du risque de décrochage
  getDropoutRiskAnalysis: async () => {
    const res = await fetch(`${API_URL}/predict-dropout`, {
      headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    });
    return res.json();
  }
};