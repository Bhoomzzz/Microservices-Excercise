import { useState, useMemo } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/productSlice";
import { createCartItem } from "../features/cartSlice";
import LoadingSpinner from "../components/LoadingSpinner";

function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  const cartError = useSelector((state) => state.cart.error);
  const currentPage = useSelector((state) => state.products.currentPage);
  const totalPages = useSelector((state) => state.products.totalPages);
  const [quantities, setQuantities] = useState({});
  const [addingToCart, setAddingToCart] = useState({});
  const [cartMessage, setCartMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    dispatch(fetchProducts(0));
  }, [dispatch]);

  const handlePageChange = (pageNum) => {
    if (pageNum >= 0 && pageNum < totalPages) {
      dispatch(fetchProducts(pageNum));
      setQuantities({});
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const price = parseFloat(product.price) || 0;
      const min = minPrice ? parseFloat(minPrice) : -Infinity;
      const max = maxPrice ? parseFloat(maxPrice) : Infinity;
      const matchesPrice = price >= min && price <= max;

      return matchesSearch && matchesPrice;
    });
  }, [products, searchTerm, minPrice, maxPrice]);

  const handleQuantityChange = (productId, value) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, parseInt(value) || 1),
    }));
  };

  const handleAddToCart = async (product) => {
    const quantity = quantities[product.id] || 1;
    setAddingToCart((prev) => ({ ...prev, [product.id]: true }));
    setCartMessage("");

    try {
      await dispatch(
        createCartItem({
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: quantity,
        })
      ).unwrap();

      setCartMessage(`Added ${quantity} ${product.name}(s) to cart`);
      setQuantities((prev) => ({ ...prev, [product.id]: 1 }));
    } catch (err) {
      console.error("Failed to add to cart:", err);
      setCartMessage(`Failed to add ${product.name} to cart`);
    } finally {
      setAddingToCart((prev) => ({ ...prev, [product.id]: false }));
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading products..." />;
  }

  const pageNumbers = [];
  const maxPagesToShow = 5;
  let startPage = Math.max(0, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow);
  if (endPage - startPage < maxPagesToShow) {
    startPage = Math.max(0, endPage - maxPagesToShow);
  }
  for (let i = startPage; i < endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <section className="panel">
      <h2>Product List</h2>

      {error && (
        <div className="alert alert-error">
          <strong>Error:</strong> {error}
        </div>
      )}

      {cartError && (
        <div className="alert alert-error">
          <strong>Cart Error:</strong> {cartError}
        </div>
      )}

      {cartMessage && (
        <div className="alert alert-success">
          {cartMessage}
        </div>
      )}

      <div className="search-filter-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by product name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-box">
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="filter-input"
            min="0"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="filter-input"
            min="0"
          />
        </div>

        <div className="filter-info">
          Showing {filteredProducts.length} of {products.length} products
        </div>
      </div>

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
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="6">
                  {products.length === 0
                    ? "No products available."
                    : "No products match your search or filter."}
                </td>
              </tr>
            ) : (
              filteredProducts.map((product, index) => (
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
                      disabled={addingToCart[product.id]}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={addingToCart[product.id] || product.stock === 0}
                      className="btn-add-cart"
                    >
                      {addingToCart[product.id] ? (
                        <>
                          <span className="spinner-mini" />
                          Adding...
                        </>
                      ) : (
                        "Add to Cart"
                      )}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
            className="pagination-btn"
          >
            ← Prev
          </button>

          <div className="page-numbers">
            {startPage > 0 && (
              <>
                <button
                  onClick={() => handlePageChange(0)}
                  className="page-num"
                >
                  1
                </button>
                {startPage > 1 && <span className="page-ellipsis">...</span>}
              </>
            )}

            {pageNumbers.map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`page-num ${pageNum === currentPage ? "active" : ""}`}
              >
                {pageNum + 1}
              </button>
            ))}

            {endPage < totalPages && (
              <>
                {endPage < totalPages - 1 && (
                  <span className="page-ellipsis">...</span>
                )}
                <button
                  onClick={() => handlePageChange(totalPages - 1)}
                  className="page-num"
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
            className="pagination-btn"
          >
            Next →
          </button>
        </div>
      )}

      {totalPages > 1 && (
        <div className="pagination-info">
          Page {currentPage + 1} of {totalPages}
        </div>
      )}
    </section>
  );
}

export default ProductList;