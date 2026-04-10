const fs = require('fs');

// Read CSV file
const csv = fs.readFileSync('../data/subscription_with_recency.csv', 'utf-8');

// Split into lines
const lines = csv.trim().split('\n');

// Extract headers
const headers = lines[0].split(',');

let result = [];

// Loop through rows
for (let i = 1; i < lines.length; i++) {
    let obj = {};
    let currentLine = lines[i].split(',');

    headers.forEach((header, index) => {
        obj[header.trim()] = currentLine[index];
    });

    // Convert numeric fields
    obj.amount = Number(obj.amount);
    obj.recency_days = Number(obj.recency_days);

    result.push(obj);
}

// Final JSON structure
const finalData = {
    subscriptions: result
};

// Write JSON file
fs.writeFileSync('../output/data.json', JSON.stringify(finalData, null, 2));

console.log("✅ CSV converted to JSON successfully!");