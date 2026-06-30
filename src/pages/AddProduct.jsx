import { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../features/productSlice";

function AddProduct() {
  const dispatch = useDispatch();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    stock: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const saveProduct = async () => {
    try {
      await dispatch(
        createProduct({
          ...product,
          price: Number(product.price),
          stock: Number(product.stock),
        })
      ).unwrap();

      setMessage("Product added successfully");
      setProduct({
        name: "",
        price: "",
        stock: "",
      });
    } catch (error) {
      console.error(error);
      setMessage("Unable to add product");
    }
  };

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
          />
        </label>
      </div>

      <button onClick={saveProduct}>Save Product</button>
      {message ? <p className="status-message">{message}</p> : null}
    </section>
  );
}

export default AddProduct;