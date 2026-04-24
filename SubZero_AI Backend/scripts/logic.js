console.log("🔥 NEW LOGIC FILE RUNNING");
const fs = require("fs");

// Load JSON data
function loadData() {
  try {
    const raw = fs.readFileSync("./output/data.json", "utf-8");
    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) return [];
    return parsed;

  } catch (err) {
    console.error("❌ Error loading data:", err.message);
    return [];
  }
}

// Detect subscriptions (SAFE)
function detectSubscriptions(data = []) {
  if (!Array.isArray(data)) return [];

  const map = {};

  for (let txn of data) {
    if (!txn || !txn.merchant || !txn.amount || !txn.date) continue;

    const key = txn.merchant.trim() + "_" + Number(txn.amount);

    if (!map[key]) {
      map[key] = [];
    }

    map[key].push(new Date(txn.date));
  }

  const subscriptions = [];

  for (let key in map) {
    const dates = map[key].sort((a, b) => a - b);

    if (dates.length >= 3) {
      let isMonthly = true;

      for (let i = 1; i < dates.length; i++) {
        const diff =
          (dates[i] - dates[i - 1]) / (1000 * 60 * 60 * 24);

        if (diff < 25 || diff > 35) {
          isMonthly = false;
          break;
        }
      }

      if (isMonthly) {
        const [merchant, amount] = key.split("_");

        subscriptions.push({
          merchant,
          amount: Number(amount),
          occurrences: dates.length,
        });
      }
    }
  }

  return subscriptions;
}

// MAIN FUNCTION
function runModel() {
  const data = loadData();

  if (!Array.isArray(data) || data.length === 0) {
    console.log("⚠️ No valid data found");
    return [];
  }

  const result = detectSubscriptions(data);

  // Optional file write
  try {
    fs.writeFileSync(
      "./output/output.json",
      JSON.stringify(result, null, 2)
    );
  } catch (err) {
    console.error("Write error:", err.message);
  }

  return result;  //  IMPORTANT
}



module.exports = { runModel };