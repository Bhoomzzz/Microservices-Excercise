import LoadingSpinner from "../components/LoadingSpinner";
import { useCart } from "../hooks";

function Cart() {
  const { items, loading, error, calculateTotal } = useCart();

  if (loading) {
    return <LoadingSpinner message="Loading cart..." />;
  }

  return (
    <section className="panel">
      <h2>Shopping Cart</h2>

      {error && (
        <div className="alert alert-error">
          <strong>Error:</strong> {error}
        </div>
      )}

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
            {items.length === 0 ? (
              <tr>
                <td colSpan="5">Your cart is empty.</td>
              </tr>
            ) : (
              items.map((item, index) => (
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

      {items.length > 0 && (
        <div className="cart-summary">
          <h3>Total: ${calculateTotal().toFixed(2)}</h3>
          <button className="btn-checkout">Proceed to Checkout</button>
        </div>
      )}
    </section>
  );
}

export default Cart;