import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import TaskFilters from "./components/TaskFilters";
import AddTaskForm from "./components/AddTaskForm";
import TaskSummary from "./components/TaskSummary";
import { FaPlus } from "react-icons/fa";

const priorityColors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ffffff"];

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newTaskDate, setNewTaskDate] = useState(new Date());
  const [newTaskColor, setNewTaskColor] = useState("#ffffff");
  const [searchText, setSearchText] = useState("");
  const [filterColor, setFilterColor] = useState("");
  const [filterDate, setFilterDate] = useState(null);
  const [sortOption, setSortOption] = useState("date");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

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

  const toggleCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const deleteAllTasks = () => {
    setTasks([]);
  };

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
      <TaskFilters
        searchText={searchText}
        setSearchText={setSearchText}
        filterColor={filterColor}
        setFilterColor={setFilterColor}
        filterDate={filterDate}
        setFilterDate={setFilterDate}
        sortOption={sortOption}
        setSortOption={setSortOption}
        priorityColors={priorityColors}
      />
      <main className="flex-grow bg-gray-800 p-6 rounded-lg shadow-lg ml-6">
        <AddTaskForm
          newTask={newTask}
          setNewTask={setNewTask}
          newTaskDate={newTaskDate}
          setNewTaskDate={setNewTaskDate}
          newTaskColor={newTaskColor}
          setNewTaskColor={setNewTaskColor}
          addTask={addTask}
          priorityColors={priorityColors}
        />
        <TaskList
          tasks={tasks}
          filteredTasks={filteredTasks}
          toggleCompletion={toggleCompletion}
          deleteTask={deleteTask}
          setEditingTask={() => {}}
        />
        <TaskSummary tasks={tasks} deleteAllTasks={deleteAllTasks} />
      </main>
    </div>
  );
};

export default App;
