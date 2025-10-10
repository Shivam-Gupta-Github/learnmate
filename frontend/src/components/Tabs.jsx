import { Upload, MessageSquare } from "lucide-react";

export default function Tabs({ activeTab, setActiveTab }) {
  return (
    <div className="flex gap-4 mb-6">
      <button
        onClick={() => setActiveTab("ingest")}
        className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
          activeTab === "ingest"
            ? "bg-purple-600 text-white shadow-lg"
            : "bg-slate-800 text-slate-300 hover:bg-slate-700"
        }`}
      >
        <Upload className="inline mr-2 w-5 h-5" />
        Ingest Data
      </button>
      <button
        onClick={() => setActiveTab("query")}
        className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
          activeTab === "query"
            ? "bg-purple-600 text-white shadow-lg"
            : "bg-slate-800 text-slate-300 hover:bg-slate-700"
        }`}
      >
        <MessageSquare className="inline mr-2 w-5 h-5" />
        Query Data
      </button>
    </div>
  );
}
