import axios from "axios";

const API_URL = "http://localhost:8083/cart";

export const fetchCartItemsAPI = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const addToCartAPI = async (cartItem) => {
    const response = await axios.post(API_URL, cartItem);
    return response.data;
};