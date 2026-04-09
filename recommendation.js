// recommendation.js

function generateRecommendations(subscriptions) {
  let recommendations = [];
  let totalSavings = 0;

  subscriptions.forEach((sub) => {
    const name = sub.name;
    const amount = sub.amount;
    const lastUsed = sub.last_used_days;

    const score = lastUsed * amount; // 🔥 Priority Score

    let action = null;
    let savings = 0;

    if (lastUsed > 30) {
      action = "Cancel";
      savings = amount;
    } else if (lastUsed > 15) {
      action = "Downgrade";
      savings = Math.floor(amount / 2);
    } else {
      return; // skip
    }

    recommendations.push({
      service: name,
      action: action,
      reason: `Not used for ${lastUsed} days`,
      savings: savings,
      priority_score: score,
    });

    totalSavings += savings;
  });

  // 🔥 Sort by priority score (descending)
  recommendations.sort((a, b) => b.priority_score - a.priority_score);

  return { recommendations, totalSavings };
}


// 🔥 Explanation function
function explainRecommendation(rec) {
  return `
${rec.service} is recommended to ${rec.action} because it has not been used recently.
With a cost of ₹${rec.savings}, this contributes significantly to unnecessary expenses.
The priority score of ${rec.priority_score} indicates high potential savings impact.
`;
}


// ✅ EXPORT (IMPORTANT)
module.exports = {
  generateRecommendations,
  explainRecommendation,
};
