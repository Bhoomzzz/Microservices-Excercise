import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "../features/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const loading = useSelector((state) => state.cart.loading);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity || 0);
    }, 0);
  };

  return (
    <section className="panel">
      <h2>Shopping Cart</h2>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5">Loading cart...</td>
              </tr>
            ) : cartItems.length === 0 ? (
              <tr>
                <td colSpan="5">Your cart is empty.</td>
              </tr>
            ) : (
              cartItems.map((item, index) => (
                <tr key={item.id ?? `${item.name}-${index}`}>
                  <td>{item.productId ?? item.id ?? index + 1}</td>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>{item.quantity}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {cartItems.length > 0 && (
        <div className="cart-summary">
          <h3>Total: ${calculateTotal().toFixed(2)}</h3>
          <button className="btn-checkout">Proceed to Checkout</button>
        </div>
      )}
    </section>
  );
}

export default Cart;