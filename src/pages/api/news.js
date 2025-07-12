export default async function handler(req, res) {
  const { category = "technology", searchQuery = "", page = 1 } = req.query;
  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    console.error("NEWS_API_KEY is undefined");
    return res.status(500).json({ error: "API key is missing" });
  }

  try {
    let url = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}&pageSize=8&page=${page}`;
    if (searchQuery) {
      url += `&q=${encodeURIComponent(searchQuery)}`;
    } else if (category !== "saved") {
      url += `&category=${category}`;
    }

    console.log("Fetching from:", url);
    const response = await fetch(url, { headers: { "User-Agent": "NewsNow-App/1.0" } });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    res.status(200).json({
      articles: data.articles || [],
      totalResults: data.totalResults || 0,
    });
  } catch (error) {
    console.error("Error fetching news:", error.message);
    res.status(500).json({
      error:
        error.message === "API limit reached"
          ? "API limit reached. Please try again later."
          : "Unable to fetch news. Please try again.",
    });
  }
}