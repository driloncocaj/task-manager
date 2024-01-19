// src/pages/Login.jsx - Final Form

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await login(email, password);

      if (data.message && data.message !== "Login successful") {
        setError(data.message || "Login failed");
        return;
      }

      // ✅ Call onLogin to store token in App state
      onLogin(data.token);
      navigate("/"); // redirect to Home after login
    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p
        style={{
          textAlign: "center",
          marginTop: "1rem",
          color: "var(--text-secondary)",
        }}
      >
        Don't have an account?{" "}
        <a
          href="/signup"
          style={{
            color: "var(--primary-color)",
            textDecoration: "none",
            fontWeight: "500",
          }}
        >
          Sign up
        </a>
      </p>
    </div>
  );
}
