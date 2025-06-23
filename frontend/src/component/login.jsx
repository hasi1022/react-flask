// src/component/login.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", formData);
      if (res.data) {
        alert("Login successful");
        navigate("/trains");
      }
    } catch (err) {
      alert("Login failed: Invalid credentials");
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f9ff", paddingTop: "50px" }}>
      <div className="container d-flex justify-content-center align-items-start">
        <div className="card shadow-lg" style={{ width: "100%", maxWidth: "400px" }}>
          <div className="card-header bg-primary text-white text-center">
            <h3>Login</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input name="username" className="form-control" placeholder="Username" onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <input name="password" type="password" className="form-control" placeholder="Password" onChange={handleChange} required />
              </div>
              <div className="text-center">
                <button className="btn btn-primary w-100">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
