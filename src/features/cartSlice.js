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
  },

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchCartItems.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchCartItems.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    });

    builder.addCase(fetchCartItems.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(createCartItem.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });
  },
});

export default cartSlice.reducer;