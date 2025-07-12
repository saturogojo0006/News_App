import axios from 'axios';

export default async function handler(req, res) {
  const { category = "technology", searchQuery = "", page = 1 } = req.query;
  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "API key is missing" });
  }

  try {
    const params = {
      apiKey,
      pageSize: 8,
      page,
    };

    if (searchQuery) {
      params.q = searchQuery;
    } else if (category !== "saved") {
      params.category = category;
    }

    console.log("Fetching from NewsAPI with params:", params);

    const response = await axios.get("https://newsapi.org/v2/top-headlines", {
      headers: { "User-Agent": "NewsNow-App/1.0",},
      params,});

    const { articles = [], totalResults = 0 } = response.data ;

    res.status(200).json({ articles, totalResults });
  } catch (error) {
    console.error("Error fetching news:", error.message);

    const isRateLimitError = error.response?.data?.message?.includes("rateLimited");

    res.status(500).json({
      error: isRateLimitError
        ? "API limit reached. Please try again later."
        : "Unable to fetch news. Please try again.",
    });
  }
}
