import client from "../api/client";

export const tasksService = {
  async list(params={}) {
    const response = await client.get("/tasks/", { params });
    return response.data;
  },

  async create(data) {
    const response = await client.post("/tasks/create/", data);
    return response.data;
  },
  async edit(id, status) {
    const response = await client.patch(`/tasks/${id}/edit/`, { status });
    return response.data;
  },
  async delete(id) {
    const response = await client.delete(`/tasks/${id}/delete/`);
    return response.data;
  },
};
