import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/api.js";

function Register({ onRegister }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "STUDENT",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const userData = {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role.toUpperCase()
      };

      const response = await AuthService.register(userData);
      
      if (response.success) {
        setSuccess("Registration successful! Redirecting to login...");
        // Call the onRegister callback with the new user data
        if (onRegister) {
          onRegister(response.data);
        }
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setError(response.message || "Registration failed");
      }
    } catch (err) {
      console.error('Registration error:', err);
      if (err.response?.data?.message?.includes('already exists')) {
        setError("Email already exists");
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <form onSubmit={handleRegister} className="card p-4 shadow">
            <h2 className="mb-4 text-center">Register</h2>
            <div className="mb-3">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <select
                name="role"
                className="form-select"
                value={form.role}
                onChange={handleChange}
              >
                <option value="STUDENT">Student</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
            <button type="submit" className="btn btn-success w-100" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
            {error && (
              <div className="alert alert-danger mt-3" role="alert">
                {error}
              </div>
            )}
            {success && (
              <div className="alert alert-success mt-3" role="alert">
                {success}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;