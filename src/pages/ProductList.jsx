import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/productSlice";
import { createCartItem } from "../features/cartSlice";

function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  const [quantities, setQuantities] = useState({});
  const [addingToCart, setAddingToCart] = useState({});

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleQuantityChange = (productId, value) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, parseInt(value) || 1),
    }));
  };

  const handleAddToCart = async (product) => {
    const quantity = quantities[product.id] || 1;
    setAddingToCart((prev) => ({ ...prev, [product.id]: true }));

    try {
      await dispatch(
        createCartItem({
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: quantity,
        })
      ).unwrap();

      setQuantities((prev) => ({ ...prev, [product.id]: 1 }));
    } catch (err) {
      console.error("Failed to add to cart:", err);
    } finally {
      setAddingToCart((prev) => ({ ...prev, [product.id]: false }));
    }
  };

  return (
    <section className="panel">
      <h2>Product List</h2>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6">Loading products...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="6">{error}</td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan="6">No products available.</td>
              </tr>
            ) : (
              products.map((product, index) => (
                <tr key={product.id ?? `${product.name}-${index}`}>
                  <td>{product.id ?? index + 1}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.stock}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={quantities[product.id] || 1}
                      onChange={(e) =>
                        handleQuantityChange(product.id, e.target.value)
                      }
                      className="qty-input"
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={addingToCart[product.id] || product.stock === 0}
                      className="btn-add-cart"
                    >
                      {addingToCart[product.id] ? "Adding..." : "Add to Cart"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ProductList;