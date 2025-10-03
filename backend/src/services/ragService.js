import { ChatOllama } from "@langchain/ollama";
import { OllamaEmbeddings } from "@langchain/ollama";
import { Chroma } from "@langchain/community/vectorstores/chroma";

const model = new ChatOllama({
  model: "llama3.1:8b",
  temperature: 0,
});

const embeddings = new OllamaEmbeddings({ model: "deepseek-r1:1.5b" });

export async function askQuestion(query, collectionName) {
  const chroma = await Chroma.fromExistingCollection(embeddings, {
    collectionName,
  });

  const retriever = chroma.asRetriever({ k: 5 });
  const docs = await retriever.invoke(query);

  if (!docs.length) return "No relevant documents found for this query.";

  const context = docs.map((d) => d.pageContent).join("\n\n");

  const messages = [
    { role: "system", content: "You are a helpful assistant." },
    {
      role: "user",
      content: `Answer the following question using context only:\n${context}\n\nQ: ${query}`,
    },
  ];

  const response = await model.invoke(messages);
  return response;
}
