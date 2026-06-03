import React, { useState } from "react";
import "./ProductForm.css";

const ProductForm = ({ onProductAdded }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !image || !price) {
      alert("Please fill in all fields.");
      return;
    }

    const newProduct = {
      name,
      image,
      price: price,
    };

    fetch("http://localhost:3001/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        onProductAdded(data);
        setName("");
        setImage("");
        setPrice("");
      })
      .catch((err) => console.error("Error adding product:", err));
  };

  return (
    <div className="product-form-container">
      <h2 className="form-title">➕ Add New Product</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL</label>
          <input
            id="image"
            type="text"
            placeholder="Enter image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price (₹)</label>
          <input
            id="price"
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button type="submit" className="add-btn">
          + Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
