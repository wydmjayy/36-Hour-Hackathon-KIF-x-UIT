const fs = require("fs");
const csv = require("csv-parser");

const inputFile = "./data/individual_bank_statement.csv";
const outputFile = "./output/data.json";

const results = [];

fs.createReadStream(inputFile)
  .pipe(csv())
  .on("data", (row) => {
    try {
      // Clean & normalize data
      const transaction = {
        date: formatDate(row.date),
        merchant: row.merchant?.trim(),
        amount: Number(row.amount),
        category: row.category?.trim() || "Others",
      };

      // Ignore invalid rows
      if (transaction.date && transaction.merchant && transaction.amount) {
        results.push(transaction);
      }

    } catch (err) {
      console.log("Row error:", err);
    }
  })
  .on("end", () => {
    fs.writeFileSync(outputFile, JSON.stringify(results, null, 2));
    console.log("✅ CSV converted to JSON successfully!");
  });


// 🔥 Date formatter (handles mixed formats)
function formatDate(dateStr) {
  if (!dateStr) return null;

  const date = new Date(dateStr);

  if (isNaN(date)) return null;

  return date.toISOString().split("T")[0]; // YYYY-MM-DD
}