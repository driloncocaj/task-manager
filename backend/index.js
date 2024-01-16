// backend/index.js

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./db"); // mysql2/promise connection
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");

const app = express();

// Middleware
app.use(cors()); // allow requests from Vite dev server
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes); // signup/login
app.use("/api/tasks", taskRoutes); // protected task routes

// Health check / DB test
app.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 + 1 AS result");
    res.send(`OK. DB says: ${rows[0].result}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database connection failed");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
