import React, { useState } from "react";

export default function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return; // Do not allow empty titles

    try {
      await addTask({ title, description, dueDate });
      setTitle(""); // reset form
      setDescription(""); // reset form
      setDueDate(""); // reset form
      setError(""); // clear error
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      {error && <p className="text-red-500 mb-2">{error}</p>}{" "}
      {/* display error */}
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}
