import api from "./api";

const courseQuizService = {
  async getCourses(subsystem) {
    const response = await api.get("/courses", {
      params: subsystem ? { subsystem } : undefined,
    });
    return response.data;
  },

  async getCourse(courseId) {
    const response = await api.get(`/courses/${courseId}`);
    return response.data;
  },

  async getQuizzes(subsystem) {
    const response = await api.get("/quizzes", {
      params: subsystem ? { subsystem } : undefined,
    });
    return response.data;
  },

  async getQuiz(quizId) {
    const response = await api.get(`/quizzes/${quizId}`);
    return response.data;
  },

  async startAttempt(quizId) {
    const response = await api.post(`/quizzes/${quizId}/attempts`);
    return response.data;
  },

  async submitAttempt(attemptId, answers) {
    const response = await api.post(`/quizzes/attempts/${attemptId}/submit`, {
      answers,
    });
    return response.data;
  },

  async getAttemptResult(attemptId) {
    const response = await api.get(`/quizzes/attempts/${attemptId}/result`);
    return response.data;
  },

  getPdfUrl(courseId) {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";
    return `${baseUrl}/courses/${courseId}/pdf`;
  },

  async openPdf(courseId) {
    const response = await api.get(`/courses/${courseId}/pdf`, { responseType: "blob" });
    const url = URL.createObjectURL(response.data);
    window.open(url, "_blank", "noopener,noreferrer");
    window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
  },
};

export default courseQuizService;
