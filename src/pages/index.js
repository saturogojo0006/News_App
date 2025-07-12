import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NewsSection from "../components/NewsSection";

export default function Home({ initialHeadlines, initialTotalResults }) {
  const validCategories = ["technology", "science","sports", "business", "entertainment", "saved"];
  const [category, setCategory] = useState("technology");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [savedArticles, setSavedArticles] = useState(() => {
    return typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("savedArticles")) || []
      : [];
  });
  const [themeTransition, setThemeTransition] = useState(false);

  const handleSaveArticle = (article) => {
    setSavedArticles((prev) => {
      const isSaved = prev.some((saved) => saved.url === article.url);
      const updatedArticles = isSaved
        ? prev.filter((saved) => saved.url !== article.url)
        : [...prev, article];
      localStorage.setItem("savedArticles", JSON.stringify(updatedArticles));
      return updatedArticles;
    });
  };

  const toggleTheme = () => {
    setThemeTransition(true);
    setTimeout(() => {
      setIsDarkMode((prev) => !prev);
      setThemeTransition(false);
    }, 800);
  };

 

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("savedArticles", JSON.stringify(savedArticles));
    }
  }, [savedArticles]);

  return (
    <div
      className={` grid-bg transition-colors duration-700 ${
        isDarkMode ? "bg-black text-white" : "bg-gray-100 text-gray-900"
      } `}
    >
      <div
        className={` ${
          themeTransition ? "opacity-100" : "opacity-0"
        } `}
      />
      <Navbar
        setCategory={setCategory}
        setSearchQuery={setSearchQuery}
        isDarkMode={isDarkMode}
        setIsDarkMode={toggleTheme}
        category={category}
      />
      <NewsSection
        category={category}
        searchQuery={searchQuery}
        isDarkMode={isDarkMode}
        savedArticles={savedArticles}
        onSaveArticle={handleSaveArticle}
        initialHeadlines={initialHeadlines}
        initialTotalResults={initialTotalResults}
      />
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const validCategories = ["technology", "science", "business", "entertainment", "saved"];
  const category = validCategories.includes(query.category) ? query.category : "technology";
  const searchQuery = query.searchQuery || "";
  const page = 1;

  try {
    const response = await fetch(
      `/api/news?category=${encodeURIComponent(category)}&searchQuery=${encodeURIComponent(searchQuery)}&page=${page}`
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Network error");
    }

    return {
      props: {
        initialHeadlines: data.articles || [],
        initialTotalResults: data.totalResults || 0,
      },
    };
  } catch (error) {
    console.error("Error fetching data in getServerSideProps:", error);
    return {
      props: {
        initialHeadlines: [],
        initialTotalResults: 0,
      },
    };
  }
}