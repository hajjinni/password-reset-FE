import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="page-wrapper">
    <div className="auth-card" style={{ textAlign: "center" }}>
      <p style={{ fontSize: "4rem", fontFamily: "'DM Serif Display', serif", color: "var(--accent)" }}>404</p>
      <h1 style={{ fontFamily: "'DM Serif Display', serif" }}>Page Not Found</h1>
      <p className="subtitle">The page you're looking for doesn't exist.</p>
      <Link to="/"><button className="btn-primary-custom" style={{ marginTop: 0 }}>Go Home</button></Link>
    </div>
  </div>
);

export default NotFound;