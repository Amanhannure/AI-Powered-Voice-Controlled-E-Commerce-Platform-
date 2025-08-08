
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="main-navbar" style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    background: "#2b6cb0",
    color: "white"
  }}>
    <div>
      <Link to="/" style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}>
        OneCard Shop
      </Link>
    </div>
    <div>
      <Link to="/" style={{ color: "white", margin: "0 1rem", textDecoration: "none" }}>
        Home
      </Link>
      <Link to="/dashboard" style={{ color: "white", margin: "0 1rem", textDecoration: "none" }}>
        Dashboard
      </Link>
      <Link to="/" style={{ color: "white", margin: "0 1rem", textDecoration: "none" }}>
        Login/Register
      </Link>
    </div>
  </nav>
);

export default Navbar;
