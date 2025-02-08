const axios = require("axios");
require("dotenv").config();

// Fetch headlines for a specific newspaper
const NEWS_API_KEY = process.env.NEWS_API_KEY;

const getNewspapers = async (req, res) => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/sources?apiKey=${NEWS_API_KEY}`
    );
    const newspaperNames = response.data.sources.map((newspaper) => ({
      id:newspaper.id,
      title: newspaper.name,
      description: newspaper.description,
    }));
    res.json(newspaperNames); // Sends the list of sources
  } catch (error) {
    console.error("Error fetching newspapers:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching newspapers", error: error.message });
  }
};

const getHeadlines = async (req, res) => {
  try {
    const { newspaperId } = req.params;
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?sources=${newspaperId}&apiKey=${NEWS_API_KEY}`
    );

    if (response.data && response.data.articles) {
      const articlesContent = response.data.articles.map((article) => ({
        title: article.title,
        content: article.content,
      }));
      res.json(articlesContent);
    } else {
      return res
        .status(404)
        .json({ message: "No articles of this newspaper has been find out" });
    }
  } catch (error) {
    console.error("Error fetching headlines:", error);
    res.status(500).json({ message: "Error fetching headlines" });
  }
};

module.exports = {
  getHeadlines,
  getNewspapers,
};
