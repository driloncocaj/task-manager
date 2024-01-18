// src/App.jsx - Final Form

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./index.css";

export default function App() {
  const [homeKey, setHomeKey] = useState(0);

  // Function to "reset" Home by changing the key
  const resetHome = () => {
    setHomeKey((prev) => prev + 1);
  };

  // Function to handle login/signup and save token
  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    resetHome(); // Reset Home component to fetch tasks
  };

  return (
    <Router>
      <Navbar onHomeClick={resetHome} />
      <Routes>
        <Route path="/" element={<Home key={homeKey} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
      </Routes>
    </Router>
  );
}
