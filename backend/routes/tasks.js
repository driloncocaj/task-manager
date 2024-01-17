// backend/routes/tasks.js

const express = require("express");
const router = express.Router();
const db = require("../db"); // MySQL connection (mysql2/promise)
const requireAuth = require("../middleware/requireAuth");

// ====================== GET all tasks for logged-in user ======================
router.get("/", requireAuth, async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT 
         id, 
         title, 
         description, 
         due_date AS dueDate,  -- alias for frontend
         user_id 
       FROM tasks 
       WHERE user_id = ? 
       ORDER BY due_date IS NULL, due_date ASC, id DESC`,
      [req.user.id]
    );
    res.json(rows);
  } catch (err) {
    console.error("GET /tasks error:", err);
    res.status(500).json({ message: "Server error fetching tasks" });
  }
});

// ====================== POST create task ======================
router.post("/", requireAuth, async (req, res) => {
  const { title, description, dueDate } = req.body;
  if (!title) return res.status(400).json({ message: "Title is required" });

  try {
    const [result] = await db.execute(
      `INSERT INTO tasks (title, description, due_date, user_id) 
       VALUES (?, ?, ?, ?)`,
      [title, description || null, dueDate || null, req.user.id]
    );

    const newTask = {
      id: result.insertId,
      title,
      description: description || null,
      dueDate: dueDate || null, // matches alias used in GET
      user_id: req.user.id,
    };

    res.status(201).json(newTask);
  } catch (err) {
    console.error("POST /tasks error:", err);
    res.status(500).json({ message: "Server error creating task" });
  }
});

// ====================== DELETE task by id ======================
router.delete("/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.execute(
      "DELETE FROM tasks WHERE id = ? AND user_id = ?",
      [id, req.user.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("DELETE /tasks/:id error:", err);
    res.status(500).json({ message: "Server error deleting task" });
  }
});

module.exports = router;
