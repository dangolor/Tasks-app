import client from "../api/client";

export const categoryService = {
  async list() {
    const response = await client.get("/tasks/categories/");
    return response.data.results;
  },

  async create(name) {
    const response = await client.post("/tasks/categories/create/", { name });
    return response.data;
  },
};
