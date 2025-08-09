import api from "./axios";

export const getBooks = async (params = {}) => {
  const response = await api.get("/books", { params });
  return response.data;
};

export const getBook = async (id) => {
  const response = await api.get(`/books/${id}`);
  return response.data;
};

export const createBook = async (bookData) => {
  const response = await api.post("/books", bookData);
  return response.data;
};

export const updateBook = async (id, bookData) => {
  const response = await api.patch(`/books/${id}`, bookData);
  return response.data;
};

export const deleteBook = async (id) => {
  const response = await api.delete(`/books/${id}`);
  return response.data;
};

export const getBookStats = async () => {
  const response = await api.get("/books/stats");
  return response.data;
};

export const getBookStatsByGenre = async () => {
  const response = await api.get("/books/stats/by-genre");
  return response.data;
};
