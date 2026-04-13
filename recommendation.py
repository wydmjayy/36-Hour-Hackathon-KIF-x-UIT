def generate_recommendations(subscriptions):
    recommendations = []
    total_savings = 0

    for sub in subscriptions:
        name = sub["name"]
        amount = sub["amount"]
        last_used = sub["last_used_days"]

        score = last_used * amount  # 🔥 Priority Score

        if last_used > 30:
            action = "Cancel"
            savings = amount
        elif last_used > 15:
            action = "Downgrade"
            savings = amount // 2
        else:
            continue

        recommendations.append({
            "service": name,
            "action": action,
            "reason": f"Not used for {last_used} days",
            "savings": savings,
            "priority_score": score
        })

        total_savings += savings

    # 🔥 Sort by priority
    recommendations.sort(key=lambda x: x["priority_score"], reverse=True)

    return recommendations, total_savings

    def explain_recommendation(rec):
        return f"""
{rec['service']} is recommended to {rec['action']} because it has not been used recently.
With a cost of ₹{rec['savings']}, this contributes significantly to unnecessary expenses.
The priority score of {rec['priority_score']} indicates high potential savings impact.
"""