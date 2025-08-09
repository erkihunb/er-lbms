import api from "./axios";

export const getBorrows = async (params = {}) => {
  const response = await api.get("/borrows", { params });
  return response.data;
};

export const getBorrow = async (id) => {
  const response = await api.get(`/borrows/${id}`);
  return response.data;
};

export const createBorrow = async (borrowData) => {
  const response = await api.post("/borrows", borrowData);
  return response.data;
};

export const returnBorrow = async (id) => {
  const response = await api.patch(`/borrows/${id}/return`);
  return response.data;
};

export const getBorrowStats = async () => {
  const response = await api.get("/borrows/stats");
  return response.data;
};
