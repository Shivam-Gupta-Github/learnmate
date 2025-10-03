import React, { useState } from "react";
import axios from "axios";

const QueryForm = () => {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleQuery = async () => {
    if (!query) return alert("Please enter a query.");
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/query", {
        query,
      });

      const data = res.data.answer;

      // Extract meaningful text from LangChain/agent response
      let textAnswer = "";
      if (data?.kwargs?.content) {
        textAnswer = data.kwargs.content; // this is usually the main answer
      } else if (typeof data === "string") {
        textAnswer = data;
      } else {
        textAnswer = JSON.stringify(data, null, 2);
      }

      setAnswer(textAnswer);
    } catch (err) {
      console.error(err);
      alert("Error querying content");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow rounded p-6">
      <h2 className="text-xl font-semibold mb-4">Ask a Question</h2>
      <textarea
        placeholder="Type your question here..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border rounded w-full px-2 py-2 mb-4"
        rows={4}
      />
      <button
        onClick={handleQuery}
        disabled={loading}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        {loading ? "Thinking..." : "Ask"}
      </button>

      {answer && (
        <div className="mt-6 bg-gray-100 p-4 rounded whitespace-pre-wrap">
          <h3 className="font-semibold mb-2">Answer:</h3>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default QueryForm;
