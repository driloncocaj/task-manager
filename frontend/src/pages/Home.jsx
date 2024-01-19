// src/pages/Home.jsx - Final Form

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import { getTasks, createTask, deleteTask } from "../api";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch tasks for logged-in user
  const fetchTasks = async () => {
    const token = localStorage.getItem("token"); // get JWT token

    if (!token) {
      navigate("/login"); // redirect to login if no token
      return;
    }

    try {
      const data = await getTasks(token);
      if (
        data.message === "You must log in first" ||
        data.message === "Invalid token"
      ) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      setTasks(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load tasks");
    }
  };

  // Add a new task
  const addTask = async (task) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const newTask = await createTask(task, token);
      if (
        newTask.message === "You must log in first" ||
        newTask.message === "Invalid token"
      ) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      setTasks([...tasks, newTask]); // update state with new task
    } catch (err) {
      console.error(err);
      setError("Failed to add task");
    }
  };

  // Delete a task
  const handleDeleteTask = async (taskId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const result = await deleteTask(taskId, token);
      if (
        result.message === "You must log in first" ||
        result.message === "Invalid token"
      ) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (err) {
      console.error(err);
      setError("Failed to delete task");
    }
  };

  // fetch tasks once when Home mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="home-container">
      <h2>My Task Master</h2>
      {error && <p className="error">{error}</p>}
      <TaskForm addTask={addTask} />

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id}>
            <div>
              <strong>{task.title}</strong>
              {task.description && <span> – {task.description}</span>}
              <br />
              <span>Due: {task.dueDate || "No due date"}</span>
            </div>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
