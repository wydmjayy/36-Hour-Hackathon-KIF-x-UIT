const express = require("express");
const { runModel } = require("./scripts/logic");

console.log("🔥 SERVER FILE STARTED");

const app = express();
const PORT = 3000;

// Home route
app.get("/", (req, res) => {
  res.send("🚀 Subscription Analyzer API Running");
});

// Analyze route
app.get("/analyze", (req, res) => {
  console.log("📡 /analyze hit");

  try {
    const result = runModel();

    res.json({
      message: "Analysis complete",
      subscriptions: result || [],
    });

  } catch (err) {
    console.error("❌ ERROR:", err);
    res.status(500).json({
      error: err.message,
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

// 🔥 KEEP SERVER ALIVE (IMPORTANT FIX)
setInterval(() => {}, 1000);