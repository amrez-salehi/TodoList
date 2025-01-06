import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const TaskItem = ({ task, toggleCompletion, deleteTask, setEditingTask }) => {
  return (
    <li
      className={`flex items-center justify-between bg-gray-700 p-4 rounded-lg ${
        task.completed ? "opacity-50 line-through" : ""
      }`}
    >
      <div className="flex-grow">
        <span style={{ color: task.color }}>{task.text}</span>
        <div className="text-sm text-gray-400">{task.date}</div>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleCompletion(task.id)}
          className="mr-2"
        />
        <button
          onClick={() => setEditingTask(task)}
          className="text-blue-500 hover:text-blue-600"
        >
          <FaEdit />
        </button>
        <button
          onClick={() => deleteTask(task.id)}
          className="text-red-500 hover:text-red-600"
        >
          <FaTrash />
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
