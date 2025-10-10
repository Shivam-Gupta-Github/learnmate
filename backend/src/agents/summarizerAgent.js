import { ChatOllama } from "@langchain/ollama";
import { askQuestion } from "../services/ragService.js";

export default async function SummarizerAgent(state) {
  const model = new ChatOllama({
    model: "llama3.1:8b",
    temperature: 0,
  });
  const text = state.inputText;
  const prompt = `Summarize the following text in concise form:\n\n${text}`;
  const response = await model.invoke(prompt);
  return { summary: response.content };
}
