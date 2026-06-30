import axios from "axios";

const BASE_URL = "http://localhost:8081/products";
const ITEMS_PER_PAGE = 10;

export const getProducts = async (page = 0, size = ITEMS_PER_PAGE) => {
  const response = await axios.get(BASE_URL, {
    params: { page, size },
  });
  const payload = response.data?.content ?? response.data ?? [];
  return {
    items: Array.isArray(payload) ? payload : [],
    totalPages: response.data?.totalPages ?? 1,
    totalElements: response.data?.totalElements ?? 0,
    currentPage: response.data?.number ?? page,
    size: response.data?.size ?? size,
  };
};

export const addProduct = async (product) => {
  const response = await axios.post(BASE_URL, product);
  return response.data;
};