import { z } from "zod";
import { StateGraph } from "@langchain/langgraph";
import SummarizerAgent from "./summarizerAgent.js";
import NotesMakerAgent from "./notesMakerAgent.js";
import QueryAgent from "./queryAgent.js";
import { writeFileSync } from "node:fs";

// ---------------- SCHEMA ----------------
const StateSchema = z.object({
  inputText: z.string(),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant", "system"]),
        content: z.string(),
      })
    )
    .default([]),
  output: z.string().optional(),
  pdfPath: z.string().optional(),
  next: z.string().optional(),
  collectionName: z.string().optional(),
});

// ---------------- GRAPH ----------------
const workflow = new StateGraph(StateSchema)

  // ROUTER — decides which agent to call
  .addNode("Router", async (state) => {
    const text = state.inputText.toLowerCase();

    // keywords-based routing
    if (text.includes("pdf") || text.includes("notes"))
      return { next: "NotesMakerAgent" };
    if (text.includes("summary") || text.includes("summarize"))
      return { next: "SummarizerAgent" };
    // fallback — default is QueryAgent
    return { next: "QueryAgent" };
  })

  // QUERY AGENT — answers conceptual queries
  .addNode("QueryAgent", async (state) => {
    const collectionName = state.collectionName || "GlobalCollection";
    const response = await QueryAgent(state);
    const content =
      typeof response === "string" ? response : response?.content || "";

    const updatedHistory = [
      ...state.history,
      { role: "user", content: state.inputText },
      { role: "assistant", content },
    ];

    return { output: content, history: updatedHistory };
  })

  // SUMMARIZER AGENT — summarizes previous content
  .addNode("SummarizerAgent", async (state) => {
    const aiResponses = state.history
      .filter((m) => m.role === "assistant")
      .map((m) => m.content)
      .join("\n");
    if (!aiResponses) return { output: "No content to summarize." };

    const response = await SummarizerAgent({ inputText: aiResponses });
    const content =
      typeof response === "string" ? response : response?.summary || "";

    const updatedHistory = [
      ...state.history,
      { role: "user", content: state.inputText },
      { role: "assistant", content: content },
    ];
    return { output: content, history: updatedHistory };
  })

  // NOTES MAKER — creates notes + PDF
  .addNode("NotesMakerAgent", async (state) => {
    const allAIContent = state.history
      .filter((m) => m.role === "assistant")
      .map((m) => m.content)
      .join("\n\n");
    if (!allAIContent) return { output: "No notes available yet." };

    const { message, pdfPath } = await NotesMakerAgent({
      content: allAIContent,
    });

    const updatedHistory = [
      ...state.history,
      { role: "user", content: state.inputText },
      { role: "assistant", content: message },
    ];
    return { output: message, pdfPath, history: updatedHistory };
  })

  // Graph edges
  .addEdge("__start__", "Router")
  .addConditionalEdges("Router", (state) => {
    const text = state.inputText.toLowerCase();
    if (text.includes("pdf") || text.includes("notes"))
      return "NotesMakerAgent";
    if (text.includes("summary") || text.includes("summarize"))
      return "SummarizerAgent";
    return "QueryAgent";
  });

// ---------------- EXECUTION ----------------
const app = workflow.compile();

export async function runWorkflow(
  inputText,
  prevState = null,
  collectionName = "GlobalCollection"
) {
  const initialState = prevState || { inputText, history: [], collectionName };
  const finalState = await app.invoke({
    ...initialState,
    inputText,
    collectionName,
  });
  return finalState;
}

// ---------------- VISUALIZE (optional) ----------------
const drawableGraph = await app.getGraphAsync();
const image = await drawableGraph.drawMermaidPng();
writeFileSync(
  "./studyFlowGraph.png",
  new Uint8Array(await image.arrayBuffer())
);
