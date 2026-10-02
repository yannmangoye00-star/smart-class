import api from "./api";

const parentService = {
  async getChildren() {
    const response = await api.get("/parents/me/children");
    return response.data;
  },

  async getChildDashboard(studentId) {
    const response = await api.get(`/parents/me/children/${studentId}/dashboard`);
    return response.data;
  },
};

export default parentService;
