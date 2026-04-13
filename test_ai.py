from recommendation import generate_recommendations
from email_generator import generate_email

data = [
    {"name": "Netflix", "amount": 499, "last_used_days": 40},
    {"name": "Spotify", "amount": 119, "last_used_days": 5},
    {"name": "Amazon Prime", "amount": 1499, "last_used_days": 60}
]

# ✅ THIS LINE IS MISSING IN YOUR CODE
recs, savings = generate_recommendations(data)

print("Recommendations:\n")

for r in recs:
    print(f"{r['service']} → {r['action']}")
    print(f"Reason: {r['reason']}")
    print(f"Potential Savings: ₹{r['savings']}")
    print(f"Priority Score: {r['priority_score']}")
    print("-----")

print("\nTotal Savings:", savings)

print("\nSample Email:\n")
print(generate_email("Netflix"))