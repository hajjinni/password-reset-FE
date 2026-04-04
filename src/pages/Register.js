import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";
import { RiUserAddLine, RiMailLine, RiLockLine, RiEyeLine, RiEyeOffLine, RiCheckLine } from "react-icons/ri";

const getStrength = (pw) => {
  if (!pw) return { score: 0, label: "", level: "" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const levels = ["", "weak", "fair", "strong", "strong"];
  const labels = ["", "Weak", "Fair", "Strong", "Very Strong"];
  return { score, label: labels[score], level: levels[score] };
};

const Register = () => {
  const [form, setForm]       = useState({ name: "", email: "", password: "" });
  const [showPw, setShowPw]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const strength = getStrength(form.password);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await registerUser(form);
      setSuccess(true);
      setTimeout(() => navigate("/"), 1800);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) return (
    <div className="page-wrapper">
      <div className="auth-card" style={{ textAlign: "center" }}>
        <div className="success-icon-wrap"><RiCheckLine color="var(--success)" /></div>
        <h1>You're in!</h1>
        <p className="subtitle">Account created. Redirecting to login…</p>
      </div>
    </div>
  );

  return (
    <div className="page-wrapper">
      <div className="auth-card">
        <p className="card-eyebrow">Create Account</p>
        <h1>Join SecureAuth</h1>
        <p className="subtitle">Start with a free account. No credit card required.</p>

        {error && (
          <div className="alert-custom alert-error">
            <RiShieldWarning /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <div className="input-wrapper">
              <input
                className="form-control-custom"
                name="name" type="text"
                placeholder="Jane Doe"
                value={form.name}
                onChange={handleChange}
                required
                style={{ paddingLeft: "14px" }}
              />
            </div>
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              className="form-control-custom"
              name="email" type="email"
              placeholder="jane@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-wrapper">
              <input
                className="form-control-custom"
                name="password"
                type={showPw ? "text" : "password"}
                placeholder="Min. 8 characters"
                value={form.password}
                onChange={handleChange}
                required
                style={{ paddingRight: "40px" }}
              />
              <button type="button" className="toggle-eye" onClick={() => setShowPw(!showPw)}>
                {showPw ? <RiEyeOffLine /> : <RiEyeLine />}
              </button>
            </div>
            {form.password && (
              <>
                <div className="strength-bar-wrap">
                  {[1,2,3,4].map(i => (
                    <div
                      key={i}
                      className={`strength-seg ${i <= strength.score ? `active ${strength.level}` : ""}`}
                    />
                  ))}
                </div>
                <div className="strength-label">Strength: {strength.label}</div>
              </>
            )}
          </div>

          <button className="btn-primary-custom" type="submit" disabled={loading}>
            {loading ? <><span className="spinner" />Creating account…</> : "Create Account"}
          </button>
        </form>

        <p className="text-center-small">
          Already have an account? <Link to="/" className="auth-link">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

// quick inline icon fallback
const RiShieldWarning = () => <span>⚠</span>;

export default Register;