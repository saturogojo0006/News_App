import React from "react";

const HeroSection = ({
  category = "technology",
  searchQuery = "",
  isDarkMode = true,
  loading = false,
  fetchNews = () => {},
}) => {
  return (
    <div className=" text-center mb-2">
      <div >
        <h1
          className="text-5xl md:text-7xl font-orbitron font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#71e1f7] via-[#1985a9] to-[#020345]"
        >
          NewsNow
        </h1>
        <p
          className={`text-lg md:text-xl ${
            isDarkMode ? "text-gray-200" : "text-gray-700"
          } font-light text-center`}
        >
          In a world of noise, we bring you the voice that matters.
        </p>
      </div>
      <div className="flex justify-center items-center">
        <div
          onClick={() => fetchNews(category, searchQuery, 1)}
          className={` mt-1 px-1 bg-gradient-to-r ${
            isDarkMode ? "from-cyan-600 to-purple-600" : "from-blue-500 to-cyan-500"
          } text-white font-semibold rounded-full shadow-2xl transition-all duration-500 transform hover:scale-105 ${
            loading
              ? "opacity-60 cursor-not-allowed"
              : "hover:from-cyan-500 hover:to-purple-500"
          } w-fit flex justify-center items-center`}
        >
          <span>{loading ? "Fetching..." : "Fetch News"}</span>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;