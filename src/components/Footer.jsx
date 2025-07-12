import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaArrowUp } from "react-icons/fa";

const Footer = ({ category, page, totalPages, setPage, isDarkMode }) => {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className={`mt-[2rem] pt-[1rem] w-full h-[5vh] flex flex-col `}
    >
      <div className="flex justify-center items-center ">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={` rounded-full ${
            isDarkMode ? "bg-gray-900/60 text-cyan-200" : "bg-white/60 text-blue-500"
          } disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all duration-300`}
        >
          <span>Previous</span>
        </button>
        <div
          className={`relative w-16 h-16 flex items-center justify-center  ${
            isDarkMode ? "text-cyan-200" : "text-blue-500"
          } font-medium`}
        >
          <svg className="absolute w-full h-full" viewBox="0 0 36 36">
            <circle
              className={`${isDarkMode ? "stroke-cyan-400" : "stroke-blue-500"}`}
              fill="none"
              strokeWidth="4"
              cx="18"
              cy="18"
              r="16"
              strokeDasharray="100"
              strokeDashoffset={100 - (page / totalPages) * 100}
            />
          </svg>
          <span>{page}/{totalPages}</span>
        </div>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className={`relative px-6 py-3 rounded-full  ${
            isDarkMode ? "bg-gray-900/60 text-cyan-200" : "bg-white/60 text-blue-500"
          } disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all duration-300`}
        >
          <span>Next</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center  sm:px-6 lg:px-8">
        <div
          className={`text-sm ${
            isDarkMode ? "text-gray-200" : "text-gray-700"
          }  sm:mb-0`}
        >
          © {new Date().getFullYear()} All Rights Reserved. NewsNow by Anand K Thakur
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-3">
            <a
              href="https://x.com"
              target="_blank"
                          className={`${
                isDarkMode ? "text-cyan-200 hover:text-cyan-100" : "text-blue-500 hover:text-blue-700"
              } transition-transform duration-300 hover:scale-110`}
            >
              <FaXTwitter />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
                           className={`${
                isDarkMode ? "text-cyan-200 hover:text-cyan-100" : "text-blue-500 hover:text-blue-700"
              } transition-transform duration-300 hover:scale-110`}
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com"
              target="_blank"
             
              className={`${
                isDarkMode ? "text-cyan-200 hover:text-cyan-100" : "text-blue-500 hover:text-blue-700"
              } transition-transform duration-300 hover:scale-110`}
            >
              <FaGithub />
            </a>
          </div>
          <button
            onClick={handleBackToTop}
            className={`relative px-4 py-2 rounded-full font-orbitron ${
              isDarkMode ? "bg-gray-900/60 text-cyan-200" : "bg-white/60 text-blue-500"
            } hover:scale-105 transition-all duration-300`}
          >
            <div className="flex gap-1 items-center">Back to Top <FaArrowUp /></div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;