import axios from "axios";

const BASE_URL = "http://localhost:8081/products";

export const getProducts = async () => {
  const response = await axios.get(BASE_URL);
  const payload = response.data?.content ?? response.data ?? [];
  return Array.isArray(payload) ? payload : [];
};

export const addProduct = async (product) => {
  const response = await axios.post(BASE_URL, product);
  return response.data;
};