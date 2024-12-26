const Trend = require("../models/Trend.js");
const scrape = require("../scrape.js");

const getTrend = async (req, res) => {
  try {
    const { trends, ip } = await scrape();

    if (!trends || !ip) {
      return res.status(400).json({ error: "Invalid data scraped." });
    }

    const newTrend = new Trend({ trends, ip });
    await newTrend.save();

    res.status(201).json(newTrend); 
  } catch (error) {
    console.error("Error in getTrend:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const getAllTrends = async (req, res) => {
  try {
    const trends = await Trend.find({});
    res.status(200).json(trends);
  } catch (error) {
    console.error("Error in getAllTrends:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTrend,
  getAllTrends,
};
