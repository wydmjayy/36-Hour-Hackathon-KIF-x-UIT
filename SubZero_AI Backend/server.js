const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

// ✅ Enable CORS
app.use(cors());

// ✅ Root route
app.get("/", (req, res) => {
  res.send("Subscription Surgeon API is running 🚀");
});

// ✅ Analyze route
app.get("/analyze", (req, res) => {
  console.log("API HIT");

  try {
    // 🔥 FIXED PATHS (IMPORTANT)
    const outputPath = path.join(__dirname, "output", "output.json");
    const dataPath = path.join(__dirname, "data", "data.json");

    const output = JSON.parse(fs.readFileSync(outputPath, "utf-8"));
    const rawData = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

    console.log("RAW DATA COUNT:", rawData.subscriptions.length);

    // 🔥 Convert data for frontend
    const subscriptions = rawData.subscriptions.map((sub, index) => ({
      id: index + 1,
      name: sub.merchant,
      price: sub.amount,
      lastUsed: `${sub.recency_days} days ago`,
      status: sub.recency_days > 20 ? "Zombie" : "Active",
      category: sub.category,
      icon: "💳",
      zombieScore: sub.recency_days,
      renewalDate: "N/A",
      history: [],
      usageStats: { weekly: [], monthlyAvg: 0 }
    }));

    console.log("SUBSCRIPTIONS CREATED:", subscriptions.length);

    res.json({
      total_spending: output.total_spending,
      zombie_count: subscriptions.filter(s => s.status === "Zombie").length,
      savings: 0,
      suggestions: output.suggestions,
      subscriptions: subscriptions
    });

  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({ error: "Failed to load data" });
  }
});

// ✅ Start server
app.listen(3001, () => {
  console.log("Server running on http://localhost:3001/analyze");
});