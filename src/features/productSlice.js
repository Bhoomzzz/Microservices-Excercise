import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getProducts, addProduct } from "../services/productService";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (pageNum = 0) => {
    return await getProducts(pageNum, 10);
  }
);

export const createProduct = createAsyncThunk("products/createProduct", async (product) => {
  return await addProduct(product);
});

const productSlice = createSlice({
  name: "products",

  initialState: {
    items: [],
    loading: false,
    error: null,
    currentPage: 0,
    totalPages: 1,
    totalElements: 0,
    pageSize: 10,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalElements = action.payload.totalElements;
        state.pageSize = action.payload.size;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.error = action.error.message || "Failed to add product";
      });
  },
});

export default productSlice.reducer;