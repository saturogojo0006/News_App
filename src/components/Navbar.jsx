import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const Navbar = ({ setCategory, setSearchQuery, isDarkMode, setIsDarkMode, category }) => {
  const [query, setQuery] = useState("");
  const validCategories = ["technology", "science", "business", "entertainment", "saved"];

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(query);
    if (query) {
      setCategory(""); // Clear category for search
    } else {
      setCategory("technology"); // Default to technology if search is cleared
    }
  };

  // Temporary debug log
  console.log("Navbar props:", { category, isDarkMode });

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 to-black/90 backdrop-blur-lg border-b border-gray-700/50"
          : "bg-gradient-to-br from-gray-50 to-white/90 backdrop-blur-lg border-b border-gray-200/50"
      } transition-all duration-500 shadow-lg`}
    >
      <div className=" sm:px-6 lg:px-8 py-1 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex gap-2 sm:gap-3">
          {validCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`relative px-4 py-2 rounded-full text-sm font-medium capitalize ${
                isDarkMode
                  ? "text-cyan-300 hover:text-cyan-100"
                  : "text-blue-500 hover:text-blue-700"
              } transition-all duration-300 hover:scale-105 ${
                category === cat ? (isDarkMode ? "bg-cyan-900/50" : "bg-blue-200/50") : ""
              }`}
            >
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search news..."
              className={`px-4 py-2 rounded-full text-sm ${
                isDarkMode
                  ? "bg-gray-800/70 text-gray-200 placeholder-gray-400 border-gray-600"
                  : "bg-white/70 text-gray-900 placeholder-gray-500 border-gray-200"
              } border focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300`}
            />
            <button
              type="submit"
              className={`p-2 rounded-full ${
                isDarkMode
                  ? "bg-gray-800/70 text-cyan-300 hover:bg-gray-700/70"
                  : "bg-white/70 text-blue-500 hover:bg-white/90"
              } transform hover:scale-110 transition-all duration-300`}
            >
              <FaSearch />
            </button>
          </form>
          <button
            onClick={setIsDarkMode}
            className={`p-2 rounded-full ${
              isDarkMode
                ? "bg-gray-800/70 text-cyan-300 hover:bg-gray-700/70"
                : "bg-white/70 text-blue-500 hover:bg-white/90"
            } transform hover:scale-110 transition-all duration-300`}
          >
            {isDarkMode ? <MdLightMode /> : <MdDarkMode />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;