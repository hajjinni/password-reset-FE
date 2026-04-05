import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { validateToken, resetPassword } from "../services/api";
import { RiTimeLine, RiCheckDoubleLine, RiEyeOffLine, RiEyeLine } from 'react-icons/ri';

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

const ResetPassword = () => {
  const { token } = useParams();
  const navigate  = useNavigate();

  const [status, setStatus]   = useState("validating"); // validating | valid | expired | success
  const [form, setForm]       = useState({ password: "", confirm: "" });
  const [showPw, setShowPw]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const strength = getStrength(form.password);

  // Validate token on mount
  useEffect(() => {
    const validate = async () => {
      try {
        await validateToken(token);
        setStatus("valid");
      } catch {
        setStatus("expired");
      }
    };
    validate();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await resetPassword(token, { password: form.password });
      setStatus("success");
      setTimeout(() => navigate("/"), 2500);
    } catch (err) {
      setError(err.response?.data?.message || "Reset failed. The link may have expired.");
    } finally {
      setLoading(false);
    }
  };

  // ── Validating ──
  if (status === "validating") return (
    <div className="page-wrapper">
      <div className="auth-card" style={{ textAlign: "center" }}>
        <span className="spinner" style={{ width: 32, height: 32, borderWidth: 3, borderTopColor: "var(--accent)" }} />
        <p className="subtitle" style={{ marginTop: 20 }}>Verifying your reset link…</p>
      </div>
    </div>
  );

  // ── Expired ──
  if (status === "expired") return (
    <div className="page-wrapper">
      <div className="auth-card" style={{ textAlign: "center" }}>
        <div className="success-icon-wrap" style={{ background: "rgba(248,113,113,0.1)", borderColor: "rgba(248,113,113,0.3)" }}>
          <RiTimeLine color="var(--danger)" />
        </div>
        <p className="card-eyebrow" style={{ color: "var(--danger)" }}>Link Expired</p>
        <h1>Reset Link Invalid</h1>
        <p className="subtitle">
          This password reset link has expired or already been used. Links are valid for <strong>30 minutes</strong>.
        </p>
        <Link to="/forgot-password">
          <button className="btn-primary-custom" style={{ marginTop: 0 }}>Request New Link</button>
        </Link>
        <p className="text-center-small">
          <Link to="/" className="auth-link">Back to Login</Link>
        </p>
      </div>
    </div>
  );

  // ── Success ──
  if (status === "success") return (
    <div className="page-wrapper">
      <div className="auth-card" style={{ textAlign: "center" }}>
        <div className="success-icon-wrap"><RiCheckDoubleLine color="var(--success)" /></div>
        <p className="card-eyebrow">All Done!</p>
        <h1>Password Reset!</h1>
        <p className="subtitle">Your password has been updated. Redirecting to login…</p>
      </div>
    </div>
  );

  // ── Reset Form ──
  return (
    <div className="page-wrapper">
      <div className="auth-card">
        <p className="card-eyebrow">New Password</p>
        <h1>Reset Password</h1>
        <p className="subtitle">Choose a strong password for your account.</p>

        {error && <div className="alert-custom alert-error">⚠ {error}</div>}

        <form onSubmit={handleSubmit}>
          {/* New Password */}
          <div className="form-group">
            <label className="form-label">New Password</label>
            <div className="input-wrapper">
              <input
                className="form-control-custom"
                type={showPw ? "text" : "password"}
                placeholder="Min. 8 characters"
                value={form.password}
                onChange={(e) => { setForm({ ...form, password: e.target.value }); setError(""); }}
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
                    <div key={i} className={`strength-seg ${i <= strength.score ? `active ${strength.level}` : ""}`} />
                  ))}
                </div>
                <div className="strength-label">Strength: {strength.label}</div>
              </>
            )}
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              className="form-control-custom"
              type="password"
              placeholder="Re-enter password"
              value={form.confirm}
              onChange={(e) => { setForm({ ...form, confirm: e.target.value }); setError(""); }}
              required
              style={{
                borderColor: form.confirm && form.confirm !== form.password ? "var(--danger)" : undefined
              }}
            />
            {form.confirm && form.confirm !== form.password && (
              <div style={{ fontSize: 12, color: "var(--danger)", marginTop: 4 }}>Passwords don't match</div>
            )}
          </div>

          <button
            className="btn-primary-custom"
            type="submit"
            disabled={loading || !form.password || form.password !== form.confirm}
          >
            {loading ? <><span className="spinner" />Updating…</> : "Update Password →"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;