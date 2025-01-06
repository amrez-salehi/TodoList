import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, filteredTasks, toggleCompletion, deleteTask, setEditingTask }) => {
  return (
    <ul className="space-y-4">
      {filteredTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          toggleCompletion={toggleCompletion}
          deleteTask={deleteTask}
          setEditingTask={setEditingTask}
        />
      ))}
    </ul>
  );
};

export default TaskList;
