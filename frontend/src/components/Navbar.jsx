import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ onHomeClick }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isLoggedIn = localStorage.getItem("token");

  return (
    <nav className="navbar">
      <h1 className="navbar-title" onClick={onHomeClick}>
        Task Master
      </h1>
      {isLoggedIn && (
        <button
          onClick={handleLogout}
          style={{
            position: "absolute",
            right: "2rem",
            background: "linear-gradient(135deg, var(--danger-color), #dc2626)",
            color: "white",
            border: "none",
            padding: "0.75rem 1.5rem",
            borderRadius: "25px",
            fontWeight: "500",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "var(--shadow)",
          }}
        >
          Logout
        </button>
      )}
    </nav>
  );
}
