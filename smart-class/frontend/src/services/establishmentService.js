import api from "./api";

const establishmentService = {
  /*
   * =========================================================
   * CREER UN ETABLISSEMENT
   * =========================================================
   */
  async create(data) {
    const response = await api.post("/establishments", data);
    return response.data;
  },

  /*
   * =========================================================
   * RECUPERER TOUS LES ETABLISSEMENTS
   * =========================================================
   */
  async getAll() {
    const response = await api.get("/establishments");
    return response.data;
  },

  /*
   * =========================================================
   * RECHERCHER PAR CODE
   * =========================================================
   */
  async getByCode(code) {
    const response = await api.get(
      `/establishments/${encodeURIComponent(code)}`
    );

    return response.data;
  },
};

export default establishmentService;