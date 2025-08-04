import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register({ users, onRegister }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (users.find((u) => u.email === form.email)) {
      setError("Email already exists");
      setSuccess("");
      return;
    }
    const newUser = {
      ...form,
      user_id: users.length + 1,
      created_at: new Date().toISOString(),
    };
    onRegister(newUser);
    setSuccess("Registration successful! Redirecting to login...");
    setError("");
    setTimeout(() => {
      navigate("/login");
    }, 1500); // 1.5 seconds delay for user to see the message
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
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" className="btn btn-success w-100">
              Register
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