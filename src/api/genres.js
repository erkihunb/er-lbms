import api from "./axios";

export const getGenres = async (params = {}) => {
  const response = await api.get("/genres", { params });
  return response.data;
};

// Add other genre-related API functions as needed
export const createGenre = async (genreData) => {
  const response = await api.post("/genres", genreData);
  return response.data;
};

export const updateGenre = async (id, genreData) => {
  const response = await api.patch(`/genres/${id}`, genreData);
  return response.data;
};

export const deleteGenre = async (id) => {
  const response = await api.delete(`/genres/${id}`);
  return response.data;
};
