import { Loader2, Send } from "lucide-react";

export default function ChatInput({
  query,
  setQuery,
  handleQuery,
  queryLoading,
}) {
  return (
    <form onSubmit={handleQuery} className="flex gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask a question about your documents..."
        className="flex-1 px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-purple-500"
        disabled={queryLoading}
      />
      <button
        type="submit"
        disabled={queryLoading || !query.trim()}
        className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-600 text-white font-semibold rounded-lg transition-all shadow-lg"
      >
        {queryLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Send className="w-5 h-5" />
        )}
      </button>
    </form>
  );
}
