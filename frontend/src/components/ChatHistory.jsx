import { MessageSquare } from "lucide-react";

export default function ChatHistory({ chatHistory }) {
  if (chatHistory.length === 0)
    return (
      <div className="flex-1 text-center text-slate-400 py-8 bg-slate-900 rounded-lg">
        <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
        <p>Start a conversation by asking a question</p>
      </div>
    );

  return (
    <div className="flex-1 overflow-y-auto mb-4 space-y-4 bg-slate-900 rounded-lg p-4">
      {chatHistory.map((msg, i) => (
        <div
          key={i}
          className={`flex ${
            msg.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-3xl px-4 py-3 rounded-lg ${
              msg.role === "user"
                ? "bg-purple-600 text-white"
                : msg.isError
                ? "bg-red-900/50 text-red-200 border border-red-500"
                : "bg-slate-700 text-slate-100"
            }`}
          >
            <div className="whitespace-pre-wrap">{msg.content}</div>
            {msg.pdfPath && (
              <div className="mt-2 text-xs text-purple-200">
                PDF: {msg.pdfPath}
              </div>
            )}
            {msg.nextAgent && (
              <div className="mt-1 text-xs text-purple-300">
                Agent: {msg.nextAgent}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
