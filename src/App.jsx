import React, { useState, useEffect } from "react";
import { FaPlus, FaSearch, FaEdit, FaCheck, FaTrash, FaSort } from "react-icons/fa";
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
  const [sortOption, setSortOption] = useState("date");

  // Load tasks from LocalStorage on mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  // Save tasks to LocalStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add Task
  const addTask = () => {
    if (!newTask.trim()) return;
    const task = {
      id: Date.now(),
      text: newTask,
      date: newTaskDate.toISOString().split("T")[0],
      color: newTaskColor,
      completed: false,
    };
    setTasks([...tasks, task]);
    setNewTask("");
    setNewTaskDate(new Date());
    setNewTaskColor("#ffffff");
  };

  // Toggle Task Completion
  const toggleCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Delete All Tasks
  const deleteAllTasks = () => {
    setTasks([]);
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
              date: editingTaskDate
                ? editingTaskDate.toISOString().split("T")[0]
                : task.date,
            }
          : task
      )
    );
    setEditingTaskId(null);
    setEditingTaskText("");
    setEditingTaskColor("#ffffff");
    setEditingTaskDate(new Date());
  };

  // Filter and Sort Tasks
  const filteredTasks = tasks
    .filter((task) => {
      const matchesSearch = task.text
        .toLowerCase()
        .includes(searchText.toLowerCase());
      const matchesColor = !filterColor || task.color === filterColor;
      const matchesDate =
        !filterDate || task.date === filterDate.toISOString().split("T")[0];
      return matchesSearch && matchesColor && matchesDate;
    })
    .sort((a, b) => {
      if (sortOption === "date") {
        return new Date(a.date) - new Date(b.date);
      } else if (sortOption === "priority") {
        return priorityColors.indexOf(a.color) - priorityColors.indexOf(b.color);
      }
      return 0;
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

        {/* Sort Options */}
        <div>
          <label htmlFor="sort" className="block text-sm mb-2 text-gray-400">
            Sort Tasks
          </label>
          <select
            id="sort"
            className="w-full bg-gray-700 p-2 rounded-lg text-white outline-none"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="date">By Date</option>
            <option value="priority">By Priority</option>
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
              </div>
            </li>
          ))}
        </ul>

        {/* Task Summary */}
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
      </main>
    </div>
  );
};

export default App;
