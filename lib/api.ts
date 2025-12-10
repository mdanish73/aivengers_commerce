/** @format */

// lib/api.ts
export default async function getRecommendations(query: string, top_k = 5) {
  const res = await fetch("/api/recommend", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, top_k }),
  });

  if (!res.ok) throw new Error("Failed to fetch recommendations");

  return res.json();
}
