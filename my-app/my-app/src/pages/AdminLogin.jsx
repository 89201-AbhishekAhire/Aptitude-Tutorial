import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminLogin({ onAdminLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("/adminUsers.json");
      const adminUsers = res.data;
      const admin = adminUsers.find(
        (u) => u.email === email && u.password === password && u.role === "admin"
      );
      if (admin) {
        onAdminLogin(admin);
        setError("");
        navigate("/admin-dashboard");
      } else {
        setError("Invalid admin credentials");
      }
    } catch (err) {
      setError("Error fetching admin users");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <form onSubmit={handleLogin} className="card p-4 shadow">
            <h2 className="mb-4 text-center text-danger">Admin Login</h2>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Admin Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Admin Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-danger w-100">
              Admin Login
            </button>
            {error && (
              <div className="alert alert-danger mt-3" role="alert">
                {error}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
