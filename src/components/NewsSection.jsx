import React, { useState, useEffect, useRef } from "react";
import NewsCard from "./NewsCard";
import HeroSection from "./HeroSection";
import Footer from "./Footer";
import axios from 'axios';
const NewsSection = ({
  category = "technology",
  searchQuery = "",
  isDarkMode = true,
  savedArticles = [],
  onSaveArticle,
  initialHeadlines = [],
  initialTotalResults = 0,
}) => {
  const [headlines, setHeadlines] = useState(initialHeadlines);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(initialTotalResults / 8) || 1
  );
  const [isTickerPaused, setIsTickerPaused] = useState(false);
  const [selectedTickerArticle, setSelectedTickerArticle] = useState(null);
  const tickerRef = useRef(null);

  const categoryColors = {
    technology: isDarkMode ? "border-cyan-400" : "border-indigo-600",
    science: isDarkMode ? "border-emerald-400" : "border-emerald-600",
    business: isDarkMode ? "border-amber-400" : "border-amber-600",
    entertainment: isDarkMode ? "border-rose-400" : "border-rose-600",
    saved: isDarkMode ? "border-cyan-400" : "border-indigo-600",
  };

  const fetchNews = async (category = "technology", query = "", pageNum = 1) => {
  setLoading(true);
  setError(null);

  try {
    const response = await axios.get('/api/news', {
      params: {
        category,
        searchQuery: query,
        page: pageNum
      }
    });

    const data = response.data;

    const articles = category === "saved" ? savedArticles : data.articles || [];
    setHeadlines(articles);
    setTotalPages(Math.ceil(data.totalResults / 8) || 1);
  } catch (error) {
    const isLimitError = error.response?.data?.error === "API limit reached";

    setError(
      isLimitError
        ? "API limit reached. Please try again later."
        : "Unable to Refresh News. Please try again."
    );

    console.error("Error fetching data:", error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    setPage(1);
    if (category === "saved") {
      setHeadlines(savedArticles);
      setTotalPages(1);
    } else {
      fetchNews(category, searchQuery, 1);
    }
  }, [category, searchQuery, savedArticles]);

  useEffect(() => {
    if (category !== "saved" && page !== 1) {
      fetchNews(category, searchQuery, page);
    }
  }, [page]);

  useEffect(() => {
    const ticker = tickerRef.current;
    if (ticker && headlines.length > 0 && !isTickerPaused) {
      const animateTicker = () => {
        ticker.style.transition = "transform 25s linear ";
        ticker.style.transform = `translateX(-${ticker.scrollWidth}px)`;
        setTimeout(() => {
          ticker.style.transition = "none";
          ticker.style.transform = "translateX(100%)";
          setTimeout(animateTicker, 800);
        }, 25000);
      };
      animateTicker();
    }
  }, [headlines, isTickerPaused]);

  const getCategoryBorder = () =>
    categoryColors[category.toLowerCase()] || categoryColors.technology;

  return (
    <section
      className={` px-6 sm:px-12 pt-32 pb-24 transition-all duration-500 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
          : "bg-gradient-to-br from-gray-50 via-blue-50 to-emerald-50"
      } overflow-hidden`}
      id="main-content"
    >
      <HeroSection
        category={category}
        searchQuery={searchQuery}
        isDarkMode={isDarkMode}
        loading={loading}
        fetchNews={fetchNews}
      />

      {!loading && headlines.length > 0 && (
        <div
          className={`  rounded-2xl `}
        >
          <div className="flex items-center justify-between gap-5">
            <div ref={tickerRef} className="flex space-x-16 whitespace-nowrap">
              {headlines.slice(0, 5).map((article, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedTickerArticle(article)}
                  className={`inline-block text-base font-poppins font-semibold tracking-wide ${
                    isDarkMode
                      ? "text-cyan-300 hover:text-cyan-100"
                      : "text-indigo-700 hover:text-indigo-500"
                  } transform hover:scale-105 transition-all duration-300`}
                >
                  {article.title}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="w-full max-w-7xl mx-auto">
          <div
            className={`text-center ${
              isDarkMode
                ? "text-rose-300 bg-rose-900/20 backdrop-blur-lg border border-rose-700/50"
                : "text-rose-600 bg-rose-100/50 backdrop-blur-lg border border-rose-200/50"
            } mb-12 py-8 px-10 rounded-2xl shadow-lg transition-all duration-500`}
          >
            <p className="text-lg font-poppins font-medium tracking-wide">
              {error}
            </p>
            <button
              onClick={() => fetchNews(category, searchQuery, page)}
              className={`mt-6 px-8 py-3 rounded-full font-poppins font-semibold tracking-wide ${
                isDarkMode
                  ? "bg-gray-800/70 text-cyan-300 hover:bg-gray-700/70"
                  : "bg-white/70 text-indigo-600 hover:bg-white/90"
              } transform hover:scale-105 transition-all duration-300 shadow-md`}
            >
              <span className="relative z-10">Retry</span>
            </button>
          </div>
        </div>
      )}

      {!loading && headlines.length > 0 && (
        <div className="">
          <div className="flex flex-wrap sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 justify-center items-center">
            {headlines.map((article, index) => (
              <NewsCard
                key={index}
                article={article}
                isDarkMode={isDarkMode}
                savedArticles={savedArticles}
                onSaveArticle={onSaveArticle}
                getCategoryBorder={getCategoryBorder}
                category={category}
              />
            ))}
          </div>
          {category !== "saved" && (
            <Footer
              category={category}
              page={page}
              totalPages={totalPages}
              setPage={setPage}
              isDarkMode={isDarkMode}
            />
          )}
        </div>
      )}
    </section>
  );
};

export default NewsSection;