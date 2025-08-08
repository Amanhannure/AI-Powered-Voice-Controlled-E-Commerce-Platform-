// src/pages/LoginRegister.jsx

import React, { useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseApp } from "../services/firebaseConfig";
import axios from "axios";
import './LoginRegister.css';

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setMessage("");
    setFormData({ name: "", email: "", password: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleGoogleLogin = async () => {
  try {
    const auth = getAuth(firebaseApp);
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const idToken = await result.user.getIdToken();

    const { data } = await axios.post("http://localhost:8000/api/user/google-login", { idToken });

    if (data.success) {
      setMessage("Google login successful!");
      localStorage.setItem("authToken", data.token);
      // TODO: redirect or update UI
    } else {
      setMessage(data.message || "Google login failed.");
    }
  } catch (err) {
    setMessage("Google login error. Try again.");
  }
};




  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      if (isLogin) {
        const { data } = await axios.post("http://localhost:8000/api/user/login", {
          email: formData.email,
          password: formData.password
        });
        if (data.success) {
          setMessage("Login successful!");
          localStorage.setItem("authToken", data.token);
          // TODO: redirect or update UI after login
        } else {
          setMessage(data.message || "Login failed, please try again.");
        }
      } else {
        const { data } = await axios.post("http://localhost:8000/api/user/register", {
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
        if (data.success) {
          setMessage("Registration successful! Please login.");
          setIsLogin(true);
          setFormData({ name: "", email: "", password: "" });
        } else {
          setMessage(data.message || "Registration failed, please try again.");
        }
      }
    } catch (error) {
      setMessage("Server error. Please try again later.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "5px" }}>
      <h2 style={{ textAlign: "center" }}>{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="name">Name</label><br />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required={!isLogin}
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
        )}
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="email">Email</label><br />
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="password">Password</label><br />
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px" }}>
          {isLogin ? "Login" : "Register"}
        </button>
        <button
          type="button"
          className="auth-button"
          onClick={handleGoogleLogin}
          style={{ marginTop: 12, background: "#db4437" }}
        >
          Sign in with Google
        </button>

      </form>
      <p style={{ marginTop: "15px", textAlign: "center" }}>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <span
          onClick={toggleMode}
          style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleMode(); }}
        >
          {isLogin ? "Register here" : "Login here"}
        </span>
      </p>
      {message && (
        <p style={{ textAlign: "center", color: message.toLowerCase().includes("success") ? "green" : "red" }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default LoginRegister;

