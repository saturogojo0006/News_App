import React, { useState } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const Navbar = ({ setCategory, setSearchQuery, isDarkMode, setIsDarkMode, category }) => {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const validCategories = ["technology", "science", "sports", "business", "entertainment", "saved"];

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(query);
    if (query) {
      setCategory("");
    } else {
      setCategory("technology");
    }
    setMenuOpen(false); // close menu on search (optional)
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b shadow-lg transition-all duration-500 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 to-black/90 backdrop-blur-lg border-gray-700/50"
          : "bg-gradient-to-br from-gray-50 to-white/90 backdrop-blur-lg border-gray-200/50"
      }`}
    >
      <div className="px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center">
        {/* Left section: Brand + Hamburger */}
        <div className="flex items-center gap-4">
          <button onClick={toggleMenu} className="sm:hidden p-2 rounded-md focus:outline-none">
            {menuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
          <span className="font-semibold text-lg text-blue-600 dark:text-cyan-300">NewsNow</span>
        </div>

        {/* Center section: Categories (desktop) */}
        <div className="hidden sm:flex gap-2">
          {validCategories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all duration-300 hover:scale-105 ${
                isDarkMode
                  ? "text-cyan-300 hover:text-cyan-100"
                  : "text-blue-500 hover:text-blue-700"
              } ${
                category === cat
                  ? isDarkMode
                    ? "bg-cyan-900/50"
                    : "bg-blue-200/50"
                  : ""
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Right section: Search + Theme */}
        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="hidden sm:flex items-center gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search news..."
              className={`px-4 py-2 rounded-full text-sm border focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300 ${
                isDarkMode
                  ? "bg-gray-800/70 text-gray-200 placeholder-gray-400 border-gray-600"
                  : "bg-white/70 text-gray-900 placeholder-gray-500 border-gray-200"
              }`}
            />
            <button
              type="submit"
              className={`p-2 rounded-full transform hover:scale-110 transition-all duration-300 ${
                isDarkMode
                  ? "bg-gray-800/70 text-cyan-300 hover:bg-gray-700/70"
                  : "bg-white/70 text-blue-500 hover:bg-white/90"
              }`}
            >
              <FaSearch />
            </button>
          </form>

          <button
            onClick={setIsDarkMode}
            className={`p-2 rounded-full transform hover:scale-110 transition-all duration-300 ${
              isDarkMode
                ? "bg-gray-800/70 text-cyan-300 hover:bg-gray-700/70"
                : "bg-white/70 text-blue-500 hover:bg-white/90"
            }`}
          >
            {isDarkMode ? <MdLightMode /> : <MdDarkMode />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden px-4 pb-4 flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {validCategories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCategory(cat);
                  setMenuOpen(false);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all duration-300 ${
                  isDarkMode
                    ? "text-cyan-300 hover:text-cyan-100"
                    : "text-blue-500 hover:text-blue-700"
                } ${
                  category === cat
                    ? isDarkMode
                      ? "bg-cyan-900/50"
                      : "bg-blue-200/50"
                    : ""
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <form onSubmit={handleSearch} className="flex items-center gap-2 mt-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search news..."
              className={`flex-1 px-4 py-2 rounded-full text-sm border focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300 ${
                isDarkMode
                  ? "bg-gray-800/70 text-gray-200 placeholder-gray-400 border-gray-600"
                  : "bg-white/70 text-gray-900 placeholder-gray-500 border-gray-200"
              }`}
            />
            <button
              type="submit"
              className={`p-2 rounded-full transform hover:scale-110 transition-all duration-300 ${
                isDarkMode
                  ? "bg-gray-800/70 text-cyan-300 hover:bg-gray-700/70"
                  : "bg-white/70 text-blue-500 hover:bg-white/90"
              }`}
            >
              <FaSearch />
            </button>
          </form>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
