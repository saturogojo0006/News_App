export default async function handler(req, res) {
  const { category = "technology", searchQuery = "", page = 1 } = req.query;
  const apiKey = process.env.NEWS_API_KEY;

  try {
    let url = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}&pageSize=8&page=${page}`;
    if (searchQuery) {
      url += `&q=${encodeURIComponent(searchQuery)}`;
    } else if (category !== "saved") {
      url += `&category=${category}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.status === 429 ? "API limit reached" : "Network error");
    }

    const data = await response.json();
    res.status(200).json({
      articles: data.articles || [],
      totalResults: data.totalResults || 0,
    });
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({
      error:
        error.message === "API limit reached"
          ? "API limit reached. Please try again later."
          : "Unable to fetch news. Please try again.",
    });
  }
}