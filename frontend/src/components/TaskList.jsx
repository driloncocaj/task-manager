// frontend/components/TaskList.jsx
import React from "react";

export default function TaskList({ tasks, onDelete }) {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p>No tasks yet. Add one above!</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id} className="task-card">
            <h3>{task.title}</h3>
            {task.description && <p>{task.description}</p>}
            {task.dueDate && <p>Due: {task.dueDate}</p>}
            <button onClick={() => onDelete(task.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}
