import React, { useRef, useEffect, useState, useCallback } from "react";
import { IoShareSocialOutline } from "react-icons/io5";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import { FaRegCommentAlt } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

const NewsCard = ({ article, isDarkMode, savedArticles, onSaveArticle, getCategoryBorder, category }) => {
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const cardRef = useRef(null);
  const modalRef = useRef(null);

  const categoryStyles = {
    technology: {
      border: isDarkMode ? "border-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.5)]" : "border-sapphire-600",
    },
    science: {
      border: isDarkMode ? "border-lime-300 shadow-[0_0_10px_rgba(132,204,22,0.5)]" : "border-emerald-600",
    },
    business: {
      border: isDarkMode ? "border-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.5)]" : "border-topaz-600",
    },
    entertainment: {
      border: isDarkMode ? "border-magenta-400 shadow-[0_0_10px_rgba(217,70,239,0.5)]" : "border-rose-600",
    },
    saved: {
      border: isDarkMode ? "border-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.5)]" : "border-sapphire-600",
    },
  };

  const calculateReadTime = useCallback(() => {
    const words = article.content ? article.content.length : 100;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  }, [article.content]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showShareOptions && !cardRef.current?.contains(e.target)) {
        setShowShareOptions(false);
      }
      if (showPreview && !modalRef.current?.contains(e.target)) {
        setShowPreview(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showShareOptions, showPreview]);

  const handleShare = useCallback(async (type) => {
    if (type === "x") {
      window.open(
        `https://x.com/intent/tweet?url=${encodeURIComponent(article.url)}&text=${encodeURIComponent(article.title)}`,
        "_blank"
      );
    } else if (type === "linkedin") {
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(article.url)}`,
        "_blank"
      );
    } else if (type === "email") {
      window.location.href = `mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(
        `Check out this article: ${article.url}`
      )}`;
    } else if (type === "copy") {
      await navigator.clipboard.writeText(article.url);
      alert("Link copied to clipboard!");
    }
    setShowShareOptions(false);
  }, [article.url, article.title]);

  const handleComment = useCallback(() => {
    alert("Comment feature coming soon! (Mock action)");
  }, []);

  return (
   <div
  ref={cardRef}
  className={`rounded-2xl border p-4
    ${
      isDarkMode
        ? "bg-gradient-to-br from-gray-900 to-blue-900/80 backdrop-blur-lg border-gray-800/50"
        : "bg-gradient-to-br from-gray-50 to-emerald-50/80 backdrop-blur-lg border-gray-100/50"
    }
    ${categoryStyles[category.toLowerCase()]?.border || categoryStyles.technology.border}
    w-[90vw] sm:w-[70vw] md:w-[50vw] lg:w-[42vw]
  `}
>
      <div className="flex flex-col">
        <div className="h-48 sm:h-60 overflow-hidden rounded-t-2xl relative group">
          {article.urlToImage ? (
            <div className="relative w-full h-full">
              <img
                src={article.urlToImage}
                alt={article.title || "News article"}
                loading="lazy"
                className="object-cover w-full h-full transition-all duration-500 group-hover:brightness-125 group-hover:scale-104"
              />
            </div>
          ) : (
            <div
              className={`w-full h-full flex items-center justify-center ${
                isDarkMode
                  ? "bg-gradient-to-br from-cyan-900/60 to-blue-900/60"
                  : "bg-gradient-to-br from-sapphire-100/60 to-emerald-100/60"
              } text-gray-400 text-sm font-medium`}
            >
              No Image Available
            </div>
          )}
          <div
            className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold capitalize ${
              isDarkMode ? "bg-gradient-to-r from-[#5e8e91] to-[#8eb4e2] text-blue-100" : "bg-gradient-to-r from-[#7e8cf6] to-[#394de4] text-white"
            }`}
          >
            {category}
          </div>
          <div
            className={`absolute top-3 left-28 px-3 py-1 rounded-full text-xs font-semibold ${
              isDarkMode ? "bg-gradient-to-r from-blue-600 to-purple-600 text-blue-100" : "bg-gradient-to-r from-[#7e8cf6] to-[#394de4] text-white"
            }`}
          >
            {article.source?.name || "Unknown"}
          </div>
          <h2
            className={`absolute bottom-4 left-4 right-4 ${
              isDarkMode ? "text-white " : "text-white"
            } z-45 text-lg sm:text-xl font-bold drop-shadow-lg line-clamp-2`}
          >
            {article.title || "No title available"}
          </h2>
          <div className="absolute top-3 right-3 flex gap-2 z-20">
            <button
              onClick={() => setShowShareOptions(!showShareOptions)}
              className={`p-2 rounded-2xl ${
                isDarkMode
                  ? "bg-gray-800/80 text-cyan-300"
                  : "bg-white/80 text-sapphire-600"
              } transform hover:scale-110 transition-all duration-300`}
            >
              <IoShareSocialOutline />
            </button>
            <button
              onClick={() => onSaveArticle(article)}
              className={`p-2 rounded-2xl ${
                isDarkMode
                  ? "bg-gray-800/80 text-cyan-300"
                  : "bg-white/80 "
              } transform hover:scale-110 transition-all duration-300 ${
                savedArticles.some((saved) => saved.url === article.url) ? "bg-cyan-500/50" : ""
              }`}
            >
              {savedArticles.some((saved) => saved.url === article.url) ? (
                <FaBookmark />
              ) : (
                <CiBookmark />
              )}
            </button>
          </div>
          {showShareOptions && (
            <div
              className={`absolute top-11 right-15 ${
                isDarkMode ? "bg-gray-900/95" : "bg-white/95"
              } backdrop-blur-lg rounded-lg`}
            >
              {[
                { type: "x", label: "Share on X" },
                { type: "linkedin", label: "Share on LinkedIn" },
                { type: "email", label: "Share via Email" },
                { type: "copy", label: "Copy Link" },
              ].map((option, idx) => (
                <div
                  key={idx}
                  onClick={() => handleShare(option.type)}
                  className={` text-left  text-sm font-medium ${
                    isDarkMode
                      ? "text-cyan-200 hover:bg-cyan-900/50"
                      : "text-gray-800 hover:bg-cyan-200"
                  }`}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
        <div >
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>{calculateReadTime()}</span>
            <span>{article.author || "Unknown author"}</span>
          </div>
          <div className="flex gap-2 mt-1 mb-0.5">
            <button
              onClick={() => setShowPreview(true)}
              className={`flex-1  rounded-full font-semibold text-white ${
                isDarkMode
                  ? "bg-gradient-to-r from-[#1d3557] to-[#457b9d] hover:from-[#184e77] hover:to-[#1e6091] hover:shadow-lg"
                  : "bg-gradient-to-r from-[#00b4d8] to-[#0077b6] hover:to-indigo-500 hover:shadow-lg"
              } transform hover:scale-105 transition-all duration-300`}
            >
              Preview
            </button>
            <button
              onClick={handleComment}
              className={`p-2 rounded-2xl ${
                isDarkMode
                  ? "bg-gray-800/80 text-cyan-300 hover:bg-gray-700/90"
                  : "bg-white/80 text-sapphire-600 hover:bg-white/90 hover:shadow-lg"
              } transform hover:scale-110 transition-all duration-300`}
            >
              <FaRegCommentAlt />
            </button>
          </div>
        </div>
      </div>

      {showPreview && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center ${
            isDarkMode ? "bg-black/80" : "bg-gray-100/80"
          } backdrop-blur-md`}
        >
          <div
            ref={modalRef}
            className={`relative max-w-lg w-full mx-4 p-6 rounded-2xl ${
              isDarkMode ? "bg-gradient-to-br from-gray-900 to-blue-900/80" : "bg-gradient-to-br from-gray-50 to-emerald-50/80"
            } backdrop-blur-lg shadow-lg border ${categoryStyles[category.toLowerCase()]?.border || categoryStyles.technology.border}`}
          >
            <h3
              id="modal-title"
              className={`text-lg font-semibold ${
                isDarkMode ? "text-cyan-300" : "text-gray-900"
              } line-clamp-2`}
            >
              {article.title || "No title available"}
            </h3>
            <p
              className={`mt-3 text-sm font-normal ${
                isDarkMode ? "text-gray-200" : "text-gray-800"
              }`}
            >
              {article.content || article.description || "No summary available."}
            </p>
            <div className="flex justify-between items-center mt-4 text-sm">
              <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
                {article.author || "Unknown author"} • {calculateReadTime()}
              </span>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex gap-1 items-center font-semibold ${
                  isDarkMode ? "text-cyan-300" : "text-blue-600"
                } underline`}
              >
                Read Full Article <FaArrowRight />
              </a>
            </div>
            <button
              onClick={() => setShowPreview(false)}
              className={`absolute top-0.5 right-1 p-2 rounded-full ${
                isDarkMode
                  ? "bg-gray-800/80 text-cyan-300"
                  : "bg-white/80 text-blue-400"
              } transform hover:scale-110 transition-all duration-300`}
            >
              <MdCancel className="text-2xl" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsCard;