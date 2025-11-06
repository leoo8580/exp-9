import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import API from './api';  // ✅ Import API instance
import './app.css';

function App() {

  // ✅ Test backend connection once when the app loads
  useEffect(() => {
    API.get('/products')
      .then(res => {
        console.log("✅ Backend connected successfully!");
        console.log("Products:", res.data);
      })
      .catch(err => {
        console.error("❌ Error connecting to backend:", err);
      });
  }, []);

  return (
    <Router>
      <div className="nav">
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>
      <div className="container">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
