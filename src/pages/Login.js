import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";

const Login = () => {
  const [form, setForm]       = useState({ email: "", password: "" });
  const [showPw, setShowPw]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await loginUser(form);
      navigate("/"); // replace with dashboard route if you have one
      alert("Login successful! 🎉");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="auth-card">
        <p className="card-eyebrow">Welcome Back</p>
        <h1>Sign in</h1>
        <p className="subtitle">Enter your credentials to access your account.</p>

        {error && <div className="alert-custom alert-error">⚠ {error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              className="form-control-custom"
              name="email" type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Password
              <Link to="/forgot-password" className="auth-link" style={{ float: "right", fontWeight: 400 }}>
                Forgot password?
              </Link>
            </label>
            <div className="input-wrapper">
              <input
                className="form-control-custom"
                name="password"
                type={showPw ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
                style={{ paddingRight: "40px" }}
              />
              <button type="button" className="toggle-eye" onClick={() => setShowPw(!showPw)}>
                {showPw ? <RiEyeOffLine /> : <RiEyeLine />}
              </button>
            </div>
          </div>

          <button className="btn-primary-custom" type="submit" disabled={loading}>
            {loading ? <><span className="spinner" />Signing in…</> : "Sign In →"}
          </button>
        </form>

        <p className="text-center-small">
          New here? <Link to="/register" className="auth-link">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;