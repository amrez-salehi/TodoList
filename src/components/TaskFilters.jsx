import React from "react";
import DatePicker from "react-datepicker";
import { FaSearch } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";

const TaskFilters = ({
  searchText,
  setSearchText,
  filterColor,
  setFilterColor,
  filterDate,
  setFilterDate,
  sortOption,
  setSortOption,
}) => {
  const priorityColors = [
    { name: "Red", value: "#ff0000" },
    { name: "Green", value: "#00ff00" },
    { name: "Blue", value: "#0000ff" },
    { name: "Yellow", value: "#ffff00" },
    { name: "White", value: "#ffffff" },
  ];

  return (
    <aside className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-6
      w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl
      mx-auto md:mx-0">
      <h2 className="text-2xl font-bold mb-4 text-white">Filters</h2>

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
      <div >
        <label htmlFor="date" className="block text-sm mb-2 text-gray-400" >
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
            <option key={color.value} value={color.value} style={{ backgroundColor: color.value }}>
              {color.name}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
};

export default TaskFilters;
