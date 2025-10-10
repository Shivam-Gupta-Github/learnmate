import React, { useState } from "react";
import { FileText, Youtube } from "lucide-react";
import IngestForm from "./IngestForm";
import IngestResult from "./IngestResult";

export default function IngestSection() {
  const [ingestType, setIngestType] = useState("pdf");
  const [ingestResult, setIngestResult] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="bg-slate-800 rounded-xl shadow-2xl p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Ingest Documents</h2>

      {/* Type Selection */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setIngestType("pdf")}
          className={`flex-1 py-4 px-6 rounded-lg font-semibold transition-all ${
            ingestType === "pdf"
              ? "bg-purple-600 text-white shadow-lg"
              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`}
        >
          <FileText className="inline mr-2 w-5 h-5" />
          PDF Document
        </button>
        <button
          onClick={() => setIngestType("youtube")}
          className={`flex-1 py-4 px-6 rounded-lg font-semibold transition-all ${
            ingestType === "youtube"
              ? "bg-purple-600 text-white shadow-lg"
              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`}
        >
          <Youtube className="inline mr-2 w-5 h-5" />
          YouTube Video
        </button>
      </div>

      <IngestForm
        ingestType={ingestType}
        setIngestResult={setIngestResult}
        setLoading={setLoading}
        loading={loading}
      />

      {ingestResult && <IngestResult result={ingestResult} />}
    </div>
  );
}
