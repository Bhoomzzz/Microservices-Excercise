import { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { useProducts } from "../hooks";

function AddProduct() {
  const { addProduct, loading, error } = useProducts(0);

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
      const result = await addProduct({
        name: product.name,
        price: product.price,
        stock: product.stock,
      });

      if (result.success) {
        setMessage("Product added successfully");
        setMessageType("success");
        setProduct({
          name: "",
          price: "",
          stock: "",
        });
      } else {
        setMessage(result.error || "Unable to add product");
        setMessageType("error");
      }
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

      <button onClick={saveProduct} disabled={isSaving || loading}>
        {isSaving ? "Saving..." : "Save Product"}
      </button>

      {message && (
        <p className={`status-message ${messageType}`}>{message}</p>
      )}
      {error && <p className="status-message error">{error}</p>}
    </section>
  );
}

export default AddProduct;