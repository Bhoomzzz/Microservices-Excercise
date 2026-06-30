import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems, createCartItem } from "../features/cartSlice";

export const useCart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const loading = useSelector((state) => state.cart.loading);
  const error = useSelector((state) => state.cart.error);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const addToCart = async (cartItem) => {
    try {
      await dispatch(createCartItem(cartItem)).unwrap();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  return {
    items,
    loading,
    error,
    addToCart,
    calculateTotal,
    getItemCount,
  };
};
