import { ChatOllama } from "@langchain/ollama";
import { OllamaEmbeddings } from "@langchain/ollama";
import { Chroma } from "@langchain/community/vectorstores/chroma";

const model = new ChatOllama({
  model: "llama3.1:8b",
  temperature: 0,
});

const embeddings = new OllamaEmbeddings({ model: "llama3.1:8b" });

export async function askQuestion(query, collectionName) {
  const chroma = await Chroma.fromExistingCollection(embeddings, {
    collectionName,
  });

  const retriever = chroma.asRetriever({ k: 5 });
  const docs = await retriever.invoke(query);

  if (!docs.length) return "No relevant documents found for this query.";

  const context = docs.map((d) => d.pageContent).join("\n\n");

  const messages = [
    {
      role: "system",
      content: `You are a knowledgeable assistant that gives detailed, well-structured answers. 
      If the provided context is relevant, use it to answer the question clearly and comprehensively.
      If the context is insufficient or unrelated, explicitly say that your answer is based on general knowledge, not the provided documents.`,
    },
    {
      role: "user",
      content: `Context:\n${context}\n\nQuestion: ${query}\n\nNow provide a clear and informative answer.`,
    },
  ];

  const response = await model.invoke(messages);
  return response;
}
