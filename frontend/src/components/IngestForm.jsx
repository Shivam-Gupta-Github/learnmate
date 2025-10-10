import React, { useState } from "react";
import { Upload, Loader2 } from "lucide-react";

export default function IngestForm({
  ingestType,
  setIngestResult,
  loading,
  setLoading,
}) {
  const [pdfPath, setPdfPath] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [collection, setCollection] = useState("");
  const API_BASE = import.meta.env.VITE_BACKEND_URL;

  const handleIngest = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIngestResult(null);

    try {
      const payload = { type: ingestType, collection: collection || undefined };
      if (ingestType === "youtube") payload.url = youtubeUrl;
      else payload.filePath = pdfPath;

      const response = await fetch(`${API_BASE}/ingest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setIngestResult({ success: true, data });
        setPdfPath("");
        setYoutubeUrl("");
        setCollection("");
      } else setIngestResult({ success: false, error: data.error });
    } catch (error) {
      setIngestResult({ success: false, error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleIngest} className="space-y-4">
      {ingestType === "pdf" ? (
        <input
          type="text"
          value={pdfPath}
          onChange={(e) => setPdfPath(e.target.value)}
          placeholder="/path/to/document.pdf"
          className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none"
          required
        />
      ) : (
        <input
          type="url"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=..."
          className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none"
          required
        />
      )}

      <input
        type="text"
        value={collection}
        onChange={(e) => setCollection(e.target.value)}
        placeholder="Collection (optional)"
        className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-6 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-600 text-white font-semibold rounded-lg transition-all shadow-lg"
      >
        {loading ? (
          <>
            <Loader2 className="inline mr-2 w-5 h-5 animate-spin" />{" "}
            Ingesting...
          </>
        ) : (
          <>
            <Upload className="inline mr-2 w-5 h-5" /> Ingest Data
          </>
        )}
      </button>
    </form>
  );
}
