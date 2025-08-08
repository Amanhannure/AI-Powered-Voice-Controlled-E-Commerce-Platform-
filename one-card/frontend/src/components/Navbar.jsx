// src/components/Navbar.jsx

import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to the login/home page after logout
  };

  // Common style for nav links
  const linkStyle = {
    color: "white",
    margin: "0 1rem",
    textDecoration: "none",
  };

  // Style for the logout button to make it look like a link
  const logoutButtonStyle = {
    ...linkStyle,
    background: "none",
    border: "none",
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: "inherit",
  };

  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem 2rem",
      background: "#2b6cb0",
      color: "white",
    }}>
      <div>
        <Link to="/" style={{ ...linkStyle, fontWeight: "bold", margin: 0 }}>
          OneCard Shop
        </Link>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <Link to="/" style={linkStyle}>
          Home
        </Link>
        {token ? (
          // --- Links for Logged-In Users ---
          <>
            <Link to="/dashboard" style={linkStyle}>
              Dashboard
            </Link>
            <button onClick={handleLogout} style={logoutButtonStyle}>
              Logout
            </button>
          </>
        ) : (
          // --- Link for Logged-Out Users ---
          <Link to="/" style={linkStyle}>
            Login/Register
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
