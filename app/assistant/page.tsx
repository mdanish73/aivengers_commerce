/** @format */

"use client";

import getRecommendations from "../../lib/api";
import Link from "next/link";
import { useState } from "react";

export default function AssistantPage() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResponse([]);
    try {
      const res = await getRecommendations(input, 4);
      if (res.recommendations) setResponse(res.recommendations);
      else setError("No recommendations found");
    } catch (err) {
      setError("Failed to fetch recommendations");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen  text-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mt-8 mb-4 text-white text-center">
          AI Shopping Assistant
        </h1>
        <p className="text-gray-400 mb-12 text-center">
          Ask me for product recommendations and I’ll find the best options for
          you!
        </p>

        {/* Chat Input */}
        <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-4">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-4 rounded-md border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="What are you looking for today?"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-md font-semibold transition bg-blue-600"
            disabled={loading}
          >
            {loading ? "Thinking..." : "Ask"}
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-700 text-red-100 rounded-md">
            {error}
          </div>
        )}

        {/* Recommendations Carousel */}
        {response.length > 0 && (
          <div className="w-full overflow-x-auto py-4">
            <ul className="flex gap-6">
              {response.map((item, idx) => (
                <li
                  key={idx}
                  className=" transition rounded-lg shadow-md min-w-[250px] max-w-[300px] flex-none flex flex-col overflow-hidden"
                >
                  <Link
                    href={`/product/${item.handle}`}
                    className="flex flex-col h-full"
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-48 w-full object-contain"
                      />
                    )}
                    <div className="p-4 flex flex-col flex-1">
                      <h2 className="text-lg font-semibold text-white mb-1">
                        {item.title}
                      </h2>
                      <p className="text-gray-400 mb-1">Price: ${item.price}</p>
                      <p className="text-gray-400 mb-2">Tags: {item.tags}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Placeholder / Instruction */}
        {response.length === 0 && !error && !loading && (
          <div className="mt-12 text-center text-gray-500">
            Enter a product query above to see recommendations appear here.
          </div>
        )}
      </div>
    </div>
  );
}
