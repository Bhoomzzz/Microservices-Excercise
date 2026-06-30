import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../features/productSlice";
import LoadingSpinner from "../components/LoadingSpinner";

function AddProduct() {
  const dispatch = useDispatch();
  const productLoading = useSelector((state) => state.products.loading);
  const productError = useSelector((state) => state.products.error);

  const [product, setProduct] = useState({
    name: "",
    price: "",
    stock: "",
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const saveProduct = async () => {
    if (!product.name || !product.price || !product.stock) {
      setMessage("Please fill in all fields");
      setMessageType("error");
      return;
    }

    setIsSaving(true);
    setMessage("");
    setMessageType("");

    try {
      await dispatch(
        createProduct({
          ...product,
          price: Number(product.price),
          stock: Number(product.stock),
        })
      ).unwrap();

      setMessage("Product added successfully");
      setMessageType("success");
      setProduct({
        name: "",
        price: "",
        stock: "",
      });
    } catch (error) {
      console.error(error);
      setMessage(error?.message || "Unable to add product");
      setMessageType("error");
    } finally {
      setIsSaving(false);
    }
  };

  if (isSaving) {
    return <LoadingSpinner message="Adding product..." />;
  }

  return (
    <section className="panel">
      <h2>Add Product</h2>

      <div className="form-grid">
        <label>
          <span>Name</span>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={handleChange}
            disabled={isSaving}
          />
        </label>

        <label>
          <span>Price</span>
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            disabled={isSaving}
          />
        </label>

        <label>
          <span>Stock</span>
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={product.stock}
            onChange={handleChange}
            disabled={isSaving}
          />
        </label>
      </div>

      <button onClick={saveProduct} disabled={isSaving || productLoading}>
        {isSaving ? "Saving..." : "Save Product"}
      </button>

      {message && (
        <p className={`status-message ${messageType}`}>{message}</p>
      )}
      {productError && <p className="status-message error">{productError}</p>}
    </section>
  );
}

export default AddProduct;