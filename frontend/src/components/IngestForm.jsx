import React, { useState } from "react";
import axios from "axios";

const IngestForm = () => {
  const [type, setType] = useState("pdf"); // default type
  const [filePath, setFilePath] = useState(""); // for PDF
  const [url, setUrl] = useState(""); // for YouTube
  const [loading, setLoading] = useState(false);

  const handleTypeChange = (e) => {
    const selectedType = e.target.value;
    setType(selectedType);
    setFilePath("");
    setUrl("");
  };

  const handleSubmit = async () => {
    if (type === "pdf" && !filePath.trim())
      return alert("Please enter the PDF file path.");
    if (type === "youtube" && !url.trim())
      return alert("Please enter a YouTube URL.");

    const payload = {
      type,
      collection: null, // backend will use default
    };

    if (type === "pdf") payload.filePath = filePath.trim();
    if (type === "youtube") payload.url = url.trim();

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/ingest", payload);
      alert(
        `Ingested successfully!\nType-specific collection: ${res.data.ingestedCollection}\nGlobal collection: ${res.data.globalCollection}`
      );

      // Reset inputs
      setFilePath("");
      setUrl("");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Ingest Content
      </h2>

      {/* Type Selector */}
      <div className="mb-4">
        <label className="mr-2 font-medium">Content Type:</label>
        <select
          value={type}
          onChange={handleTypeChange}
          className="border rounded px-3 py-2 w-full"
        >
          <option value="pdf">PDF</option>
          <option value="youtube">YouTube</option>
        </select>
      </div>

      {/* PDF File Path Input */}
      {type === "pdf" && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter file path (e.g., files/resume.pdf)"
            value={filePath}
            onChange={(e) => setFilePath(e.target.value)}
            className="border rounded w-full px-3 py-2"
          />
        </div>
      )}

      {/* YouTube URL Input */}
      {type === "youtube" && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter YouTube URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="border rounded w-full px-3 py-2"
          />
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`w-full ${
          loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
        } text-white px-4 py-2 rounded transition`}
      >
        {loading ? "Processing..." : "Ingest"}
      </button>
    </div>
  );
};

export default IngestForm;
