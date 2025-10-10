import React, { useState } from "react";
import ChatHistory from "./ChatHistory";
import ChatInput from "./ChatInput";

export default function QuerySection() {
  const [query, setQuery] = useState("");
  const [sessionId, setSessionId] = useState(`session-${Date.now()}`);
  const [queryCollection, setQueryCollection] = useState("GlobalCollection");
  const [chatHistory, setChatHistory] = useState([]);
  const [queryLoading, setQueryLoading] = useState(false);
  const API_BASE = import.meta.env.VITE_BACKEND_URL;

  const handleQuery = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setQueryLoading(true);
    const userMsg = { role: "user", content: query };
    setChatHistory((p) => [...p, userMsg]);

    try {
      const res = await fetch(`${API_BASE}/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, sessionId, collection: queryCollection }),
      });

      const data = await res.json();
      if (res.ok) {
        setChatHistory((p) => [
          ...p,
          {
            role: "assistant",
            content: data.answer,
            pdfPath: data.pdfPath,
            nextAgent: data.nextAgent,
          },
        ]);
      } else {
        setChatHistory((p) => [
          ...p,
          { role: "assistant", content: `Error: ${data.error}`, isError: true },
        ]);
      }
    } catch (error) {
      setChatHistory((p) => [
        ...p,
        {
          role: "assistant",
          content: `Error: ${error.message}`,
          isError: true,
        },
      ]);
    } finally {
      setQuery("");
      setQueryLoading(false);
    }
  };

  return (
    <div
      className="bg-slate-800 rounded-xl shadow-2xl p-6 flex flex-col"
      style={{ height: "70vh" }}
    >
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-white mb-4">
          Query Knowledge Base
        </h2>

        <div className="flex gap-4 mb-4">
          <input
            type="text"
            value={sessionId}
            onChange={(e) => setSessionId(e.target.value)}
            className="flex-1 px-3 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-purple-500 text-sm"
            placeholder="Session ID"
          />
          <input
            type="text"
            value={queryCollection}
            onChange={(e) => setQueryCollection(e.target.value)}
            className="flex-1 px-3 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-purple-500 text-sm"
            placeholder="Collection"
          />
        </div>
      </div>

      <ChatHistory chatHistory={chatHistory} />
      <ChatInput
        query={query}
        setQuery={setQuery}
        handleQuery={handleQuery}
        queryLoading={queryLoading}
      />
    </div>
  );
}
