import "./LoadingSpinner.css";

function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="spinner-container">
      <div className="spinner" />
      <p className="spinner-text">{message}</p>
    </div>
  );
}

export default LoadingSpinner;
