import React from "react";
import IngestForm from "./components/IngestForm";
import QueryForm from "./components/QueryForm";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">LearnMate</h1>
        <IngestForm />
        <QueryForm />
      </div>
    </div>
  );
}

export default App;
