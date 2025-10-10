import { CheckCircle, AlertCircle } from "lucide-react";

export default function IngestResult({ result }) {
  return (
    <div
      className={`mt-6 p-4 rounded-lg ${
        result.success
          ? "bg-green-900/50 border border-green-500"
          : "bg-red-900/50 border border-red-500"
      }`}
    >
      {result.success ? (
        <>
          <CheckCircle className="inline mr-2 text-green-400" />
          <span className="text-green-200 font-medium">
            Successfully ingested!
          </span>
          <div className="mt-2 text-sm text-green-300">
            <div>Collection: {result.data.ingestedCollection}</div>
            <div>Global Collection: {result.data.globalCollection}</div>
          </div>
        </>
      ) : (
        <>
          <AlertCircle className="inline mr-2 text-red-400" />
          <span className="text-red-200 font-medium">
            Error: {result.error}
          </span>
        </>
      )}
    </div>
  );
}
