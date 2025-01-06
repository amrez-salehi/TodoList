import React from "react";

const TaskSummary = ({ tasks, deleteAllTasks }) => {
  return (
    <div className="mt-6 flex justify-between items-center">
      <span>
        {tasks.filter((task) => !task.completed).length} tasks remaining
      </span>
      <button
        onClick={deleteAllTasks}
        className="bg-red-500 hover:bg-red-600 p-3 rounded-lg"
      >
        Clear All
      </button>
    </div>
  );
};

export default TaskSummary;
