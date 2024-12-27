import React, { useState } from "react";
import { FaPlus, FaSearch, FaEdit, FaCheck, FaTrash } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const priorityColors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ffffff"];

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newTaskDate, setNewTaskDate] = useState(new Date());
  const [newTaskColor, setNewTaskColor] = useState("#ffffff");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskText, setEditingTaskText] = useState("");
  const [editingTaskColor, setEditingTaskColor] = useState("#ffffff");
  const [editingTaskDate, setEditingTaskDate] = useState(new Date());

  const [searchText, setSearchText] = useState("");
  const [filterColor, setFilterColor] = useState("");
  const [filterDate, setFilterDate] = useState(null);

  // Add Task
  const addTask = () => {
    if (!newTask.trim()) return;
    const task = {
      id: Date.now(),
      text: newTask,
      date: newTaskDate.toISOString().split("T")[0],
      color: newTaskColor,
    };
    setTasks([...tasks, task]);
    setNewTask("");
    setNewTaskDate(new Date());
    setNewTaskColor("#ffffff");
  };

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Save Edited Task
  const saveTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              text: editingTaskText,
              color: editingTaskColor || task.color,
              date: editingTaskDate ? editingTaskDate.toISOString().split("T")[0] : task.date,
            }
          : task
      )
    );
    setEditingTaskId(null);
    setEditingTaskText("");
    setEditingTaskColor("#ffffff");
    setEditingTaskDate(new Date());
  };

  // Filter Tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.text
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesColor = !filterColor || task.color === filterColor;
    const matchesDate = !filterDate || task.date === filterDate.toISOString().split("T")[0];
    return matchesSearch && matchesColor && matchesDate;
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gray-800 p-6 rounded-lg shadow-lg space-y-6">
        <h2 className="text-2xl font-bold mb-4">Filters</h2>

        {/* Search */}
        <div>
          <label htmlFor="search" className="block text-sm mb-2 text-gray-400">
            Search Tasks
          </label>
          <div className="flex items-center bg-gray-700 p-2 rounded-lg">
            <FaSearch className="text-gray-400 mr-2" />
            <input
              id="search"
              type="text"
              placeholder="Search tasks..."
              className="flex-grow bg-transparent text-white outline-none"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>

        {/* Filter by Color */}
        <div>
          <label htmlFor="color" className="block text-sm mb-2 text-gray-400">
            Filter by Priority Color
          </label>
          <select
            id="color"
            className="w-full bg-gray-700 p-2 rounded-lg text-white outline-none"
            value={filterColor}
            onChange={(e) => setFilterColor(e.target.value)}
          >
            <option value="">All Colors</option>
            {priorityColors.map((color) => (
              <option key={color} value={color} style={{ backgroundColor: color }}>
                {" "}
              </option>
            ))}
          </select>
        </div>

        {/* Filter by Date */}
        <div>
          <label htmlFor="date" className="block text-sm mb-2 text-gray-400">
            Filter by Date
          </label>
          <DatePicker
            id="date"
            selected={filterDate}
            onChange={(date) => setFilterDate(date)}
            dateFormat="yyyy/MM/dd"
            className="w-full bg-gray-700 p-2 rounded-lg text-white outline-none"
            placeholderText="Select a date"
          />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow bg-gray-800 p-6 rounded-lg shadow-lg ml-6">
        {/* Add Task Section */}
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

        {/* Task List */}
        <ul className="space-y-4">
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between bg-gray-700 p-4 rounded-lg"
            >
              {editingTaskId === task.id ? (
                <>
                  <input
                    className="flex-grow bg-gray-600 p-2 rounded-lg text-white outline-none"
                    value={editingTaskText}
                    onChange={(e) => setEditingTaskText(e.target.value)}
                  />
                  <div className="flex space-x-2">
                    {priorityColors.map((color) => (
                      <div
                        key={color}
                        onClick={() => setEditingTaskColor(color)}
                        className="w-8 h-8 rounded-full"
                        style={{
                          backgroundColor: color,
                          cursor: "pointer",
                          border: editingTaskColor === color ? "2px solid #000" : "none",
                        }}
                      />
                    ))}
                  </div>
                  <DatePicker
                    selected={editingTaskDate}
                    onChange={(date) => setEditingTaskDate(date)}
                    dateFormat="yyyy/MM/dd"
                    className="bg-gray-700 text-white p-3 rounded-lg"
                  />
                  <button
                    onClick={() => saveTask(task.id)}
                    className="text-green-500 hover:text-green-600 text-sm p-1 rounded-lg"
                  >
                    <FaCheck />
                  </button>
                </>
              ) : (
                <>
                  <span className="flex-grow" style={{ color: task.color }}>
                    {task.text}
                  </span>
                  <button
                    onClick={() => {
                      setEditingTaskId(task.id);
                      setEditingTaskText(task.text);
                      setEditingTaskColor(task.color);
                      setEditingTaskDate(new Date(task.date));
                    }}
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
                </>
              )}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default App;
