import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './form.css';

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', category: '', price: '' });
  const token = localStorage.getItem('token');
  const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API}/products`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(res.data);
    } catch {
      alert('Not authorized or server error');
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();
    if (!form.name || !form.category || !form.price) return alert('Fill all fields');
    await axios.post(`${API}/products`, form, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setForm({ name: '', category: '', price: '' });
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    await axios.delete(`${API}/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <header className="header">
        🛒 Online Grocery Ordering System
      </header>
      <h2 className="title">Available Products</h2>

      <form className="add-form" onSubmit={addProduct}>
        <input
          type="text"
          placeholder="Product Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={e => setForm({ ...form, price: e.target.value })}
        />
        <button type="submit" className="add-btn">Add Product</button>
      </form>

      <div className="product-grid">
        {products.map((p) => (
          <div key={p._id} className="product-card">
            <h3>{p.name}</h3>
            <p>Category: {p.category}</p>
            <p>Price: ₹{p.price}</p>
            <button onClick={() => deleteProduct(p._id)} className="del-btn">🗑 Delete</button>
          </div>
        ))}
      </div>

      <footer className="footer">
        © 2025 Grocery App — Developed by Juda Prince
      </footer>
    </div>
  );
}
