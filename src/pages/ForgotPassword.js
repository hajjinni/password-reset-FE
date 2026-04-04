import React, { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../services/api";
import { RiMailSendLine, RiArrowLeftLine } from "react-icons/ri";

const ForgotPassword = () => {
  const [email, setEmail]     = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [sent, setSent]       = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await forgotPassword({ email });
      setSent(true);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) return (
    <div className="page-wrapper">
      <div className="auth-card" style={{ textAlign: "center" }}>
        <div className="success-icon-wrap"><RiMailSendLine color="var(--accent)" /></div>
        <p className="card-eyebrow">Check Your Inbox</p>
        <h1>Email Sent!</h1>
        <p className="subtitle">
          We've sent a password reset link to <strong>{email}</strong>.
          The link expires in <strong>30 minutes</strong>.
        </p>
        <div className="alert-custom alert-info" style={{ textAlign: "left" }}>
          💡 Didn't get it? Check your spam folder.
        </div>
        <Link to="/" className="auth-link" style={{ fontSize: 14 }}>
          <RiArrowLeftLine style={{ verticalAlign: "middle" }} /> Back to Login
        </Link>
      </div>
    </div>
  );

  return (
    <div className="page-wrapper">
      <div className="auth-card">
        <Link to="/" className="auth-link" style={{ fontSize: 13, display: "inline-flex", alignItems: "center", gap: 4, marginBottom: 20 }}>
          <RiArrowLeftLine /> Back to Login
        </Link>
        <p className="card-eyebrow">Account Recovery</p>
        <h1>Forgot Password?</h1>
        <p className="subtitle">
          Enter your email and we'll send you a secure reset link, valid for 30 minutes.
        </p>

        {error && <div className="alert-custom alert-error">⚠ {error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              className="form-control-custom"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              required
            />
          </div>

          <button className="btn-primary-custom" type="submit" disabled={loading}>
            {loading ? <><span className="spinner" />Sending…</> : "Send Reset Link →"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;