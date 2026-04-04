import React from "react";
import { Link } from "react-router-dom";
import { RiShieldKeyholeLine } from "react-icons/ri";

const AppNavbar = () => (
  <nav className="app-nav">
    <Link to="/" className="nav-brand">
      <RiShieldKeyholeLine size={22} color="var(--accent)" />
      SecureAuth
      <span className="dot" />
    </Link>
    <div className="nav-links">
      <Link to="/"         className="nav-btn nav-btn-ghost">Login</Link>
      <Link to="/register" className="nav-btn nav-btn-solid">Register</Link>
    </div>
  </nav>
);

export default AppNavbar;