import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { fetchCartItemsAPI, addToCartAPI } from "../services/cartService";

export const fetchCartItems = createAsyncThunk("cart/fetchCartItems", async () => {
  return await fetchCartItemsAPI();
});

export const createCartItem = createAsyncThunk("cart/createCartItem", async (cart) => {
  return await addToCartAPI(cart);
});

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    items: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch cart items";
      })
      .addCase(createCartItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(createCartItem.rejected, (state, action) => {
        state.error = action.error.message || "Failed to add item to cart";
      });
  },
});

export default cartSlice.reducer;