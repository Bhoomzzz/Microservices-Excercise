import AddProduct from "./pages/AddProduct";
import ProductList from "./pages/ProductList";
import "./App.css";

function App() {
  return (
    <div className="app-shell">
      <h1>Product Management</h1>

      <div className="divider" />

      <AddProduct />

      <div className="divider" />

      <ProductList />
    </div>
  );
}

export default App;