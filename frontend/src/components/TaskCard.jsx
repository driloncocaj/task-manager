import React, { useState } from "react";

export default function TaskCard({ task, index, deleteTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false); // <-- track edit mode
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDesc, setEditDesc] = useState(task.description);
  const [editDate, setEditDate] = useState(task.dueDate);

  const handleSave = () => {
    editTask(index, {
      title: editTitle,
      description: editDesc,
      dueDate: editDate,
    }); // <-- send updated task to Home
    setIsEditing(false);
  };

  return (
    <div className="task-card">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="task-edit-input" // <-- new class for styling
          />
          <input
            type="text"
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            className="task-edit-input" // <-- new class for styling
          />
          <input
            type="date"
            value={editDate}
            onChange={(e) => setEditDate(e.target.value)}
            className="task-edit-input" // <-- new class for styling
          />
          <button onClick={handleSave} className="task-save-btn">
            Save
          </button>{" "}
          {/* <-- save edited task */}
          <button
            onClick={() => setIsEditing(false)}
            className="task-cancel-btn"
          >
            Cancel
          </button>{" "}
          {/* cancel edit */}
        </>
      ) : (
        <>
          <h3 className="task-title">{task.title}</h3>
          <p className="task-desc">{task.description}</p>
          <p className="task-date">{task.dueDate}</p>
          <button onClick={() => deleteTask(index)} className="task-delete-btn">
            Delete
          </button>{" "}
          {/* delete task */}
          <button onClick={() => setIsEditing(true)} className="task-edit-btn">
            Edit
          </button>{" "}
          {/* enter edit mode */}
        </>
      )}
    </div>
  );
}
