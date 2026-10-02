import api from "./api";

const adminService = {
  async getUsers() {
    const response = await api.get("/admin/users");
    return response.data;
  },

  async updateUserRole(userId, role) {
    const response = await api.patch(`/admin/users/${userId}/role`, { role });
    return response.data;
  },

  async setUserEnabled(userId, enabled) {
    const response = await api.patch(`/admin/users/${userId}/enabled`, null, {
      params: { enabled },
    });
    return response.data;
  },

  async getClasses() {
    const response = await api.get("/admin/classes");
    return response.data;
  },

  async createClass(payload) {
    const response = await api.post("/admin/classes", payload);
    return response.data;
  },

  async updateClass(classId, payload) {
    const response = await api.put(`/admin/classes/${classId}`, payload);
    return response.data;
  },

  async deleteClass(classId) {
    await api.delete(`/admin/classes/${classId}`);
  },

  async getSubjects() {
    const response = await api.get("/admin/subjects");
    return response.data;
  },

  async createSubject(payload) {
    const response = await api.post("/admin/subjects", payload);
    return response.data;
  },

  async updateSubject(subjectId, payload) {
    const response = await api.put(`/admin/subjects/${subjectId}`, payload);
    return response.data;
  },

  async deleteSubject(subjectId) {
    await api.delete(`/admin/subjects/${subjectId}`);
  },

  async assignStudent(classId, studentId) {
    const response = await api.put(`/admin/classes/${classId}/students/${studentId}`);
    return response.data;
  },

  async removeStudent(classId, studentId) {
    const response = await api.delete(`/admin/classes/${classId}/students/${studentId}`);
    return response.data;
  },

  async linkChild(parentId, studentId) {
    await api.put(`/admin/parents/${parentId}/children/${studentId}`);
  },

  async unlinkChild(parentId, studentId) {
    await api.delete(`/admin/parents/${parentId}/children/${studentId}`);
  },
};

export default adminService;
