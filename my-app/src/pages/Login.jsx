import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/api.js";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { handleLogin, handleAdminLogin } = useAuth();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await AuthService.login(email, password);
      
      if (response.success) {
        if (response.data.role === "ADMIN") {
          handleAdminLogin(response.data);
          navigate("/admin-dashboard");
        } else {
          handleLogin(response.data);
          navigate("/dashboard");
        }
      } else {
        setError(response.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <form onSubmit={handleLoginSubmit} className="card p-4 shadow">
            <h2 className="mb-4 text-center">Login</h2>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
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

export default Login;