import { askQuestion } from "../services/ragService.js";

export default async function QueryAgent(state) {
  return askQuestion(state.inputText, "GlobalCollection");
}
