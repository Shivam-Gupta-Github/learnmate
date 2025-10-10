import { ChatOllama } from "@langchain/ollama";
import { exportToPDF } from "../utils/pdfExporter.js";

export default async function NotesMakerAgent(state) {
  const model = new ChatOllama({
    model: "llama3.1:8b",
    temperature: 0,
  });
  const content = state.content;
  const prompt = `
Convert this content into well-structured notes using bullet points, bold headings, and clear formatting:
${content}
`;
  const response = await model.invoke(prompt);
  const notes = response.content;
  const pdfPath = await exportToPDF(notes);
  const message = `Notes created and exported: ${pdfPath}`;
  return { message, pdfPath };
}
