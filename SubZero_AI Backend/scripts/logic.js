 const fs = require('fs');

try {
    // ✅ STEP 1: Read JSON file (correct path)
    const rawData = fs.readFileSync('../output/data.json', 'utf-8');
    const data = JSON.parse(rawData);

    let totalCost = 0;
    let categoryMap = {};
    let suggestions = [];
    let waste = 0;

    // ✅ STEP 2: Process data
    data.subscriptions.forEach(sub => {
        const amount = Number(sub.amount) || 0;
        const recency = Number(sub.recency_days) || 0;
        const category = sub.category || "Unknown";
        const name = sub.subscription_name || "Unknown";

        totalCost += amount;

        // Category grouping
        if (!categoryMap[category]) {
            categoryMap[category] = [];
        }
        categoryMap[category].push(sub);

        // Unused detection
        if (recency > 30) {
            suggestions.push(
                `${name} unused for ${recency} days → consider cancelling`
            );
            waste += amount;
        }
    });

    // ✅ STEP 3: Duplicate category detection
    for (let category in categoryMap) {
        if (categoryMap[category].length > 1) {
            suggestions.push(
                `Multiple ${category} subscriptions → keep only one`
            );
        }
    }

    // ✅ STEP 4: Yearly waste
    const yearly_waste = waste * 12;

    // ✅ STEP 5: Final output
    const result = {
        total_spending: totalCost,
        potential_waste: waste,
        yearly_waste: yearly_waste,
        suggestions: suggestions
    };

    // ✅ STEP 6: Write output (correct path)
    fs.writeFileSync('../output/output.json', JSON.stringify(result, null, 2));

    console.log("✅ Analysis Complete! Check output/output.json");

} catch (error) {
    console.error("❌ Error:", error.message);
}