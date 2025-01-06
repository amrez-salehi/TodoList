import React from "react";
import DatePicker from "react-datepicker";
import { FaPlus } from "react-icons/fa";

const AddTaskForm = ({
  newTask,
  setNewTask,
  newTaskDate,
  setNewTaskDate,
  newTaskColor,
  setNewTaskColor,
  addTask,
  priorityColors,
}) => {
  return (
    <div className="flex items-center space-x-4 mb-6">
      <input
        type="text"
        placeholder="Add a new task"
        className="flex-grow bg-gray-700 p-3 rounded-lg text-white outline-none"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && addTask()}
      />
      <DatePicker
        selected={newTaskDate}
        onChange={(date) => setNewTaskDate(date)}
        dateFormat="yyyy/MM/dd"
        className="bg-gray-700 text-white p-3 rounded-lg"
      />
      <div className="flex space-x-2">
        {priorityColors.map((color) => (
          <div
            key={color}
            onClick={() => setNewTaskColor(color)}
            className="w-8 h-8 rounded-full"
            style={{
              backgroundColor: color,
              cursor: "pointer",
              border: newTaskColor === color ? "2px solid #000" : "none",
            }}
          />
        ))}
      </div>
      <button
        onClick={addTask}
        className="bg-blue-500 hover:bg-blue-600 p-3 rounded-lg"
      >
        <FaPlus className="text-white" />
      </button>
    </div>
  );
};

export default AddTaskForm;
