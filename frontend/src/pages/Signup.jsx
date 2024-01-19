// src/pages/Signup.jsx - Final Form

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api";

export default function Signup({ onLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await signup(username, email, password);

      if (data.message && data.message !== "User created successfully") {
        setError(data.message || "Signup failed");
        return;
      }

      // ✅ Immediately log the user in by storing the token
      onLogin(data.token);
      navigate("/"); // redirect to Home
    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
        <button type="submit">Sign Up</button>
      </form>
      <p
        style={{
          textAlign: "center",
          marginTop: "1rem",
          color: "var(--text-secondary)",
        }}
      >
        Already have an account?{" "}
        <a
          href="/login"
          style={{
            color: "var(--primary-color)",
            textDecoration: "none",
            fontWeight: "500",
          }}
        >
          Login
        </a>
      </p>
    </div>
  );
}
