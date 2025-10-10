import React, { useState } from "react";
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import IngestSection from "./components/IngestSection";
import QuerySection from "./components/QuerySection";

export default function App() {
  const [activeTab, setActiveTab] = useState("ingest");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Header />
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === "ingest" ? <IngestSection /> : <QuerySection />}
      </div>
    </div>
  );
}
