import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, createProduct } from "../features/productSlice";

export const useProducts = (page = 0) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  const currentPage = useSelector((state) => state.products.currentPage);
  const totalPages = useSelector((state) => state.products.totalPages);
  const totalElements = useSelector((state) => state.products.totalElements);

  useEffect(() => {
    dispatch(fetchProducts(page));
  }, [dispatch, page]);

  const addProduct = async (productData) => {
    try {
      await dispatch(
        createProduct({
          ...productData,
          price: Number(productData.price),
          stock: Number(productData.stock),
        })
      ).unwrap();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return {
    products,
    loading,
    error,
    currentPage,
    totalPages,
    totalElements,
    addProduct,
  };
};
