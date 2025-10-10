import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { OllamaEmbeddings } from "@langchain/ollama";
import { Chroma } from "@langchain/community/vectorstores/chroma";
import { splitter } from "../utils/splitter.js";

const embeddings = new OllamaEmbeddings({
  model: "llama3.1:8b",
});

function cleanMetadata(metadata) {
  const cleaned = {};
  for (const [key, value] of Object.entries(metadata || {})) {
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean" ||
      value === null
    ) {
      cleaned[key] = value;
    } else if (typeof value === "object") {
      // Convert object/array/Date into JSON string
      cleaned[key] = JSON.stringify(value);
    }
  }
  return cleaned;
}

async function indexDocs(docs, collectionName) {
  const cleanedDocs = docs.map((d) => ({
    pageContent: d.pageContent,
    metadata: cleanMetadata(d.metadata),
  }));

  const chunks = await splitter.splitDocuments(cleanedDocs);

  const chroma = await Chroma.fromDocuments(chunks, embeddings, {
    collectionName,
  });

  return { inserted: chunks.length, collection: collectionName };
}

export async function ingestYoutube(url, collectionName) {
  const loader = YoutubeLoader.createFromUrl(url, {
    language: "en",
    addVideoInfo: true,
  });
  const docs = await loader.load();
  return indexDocs(docs, collectionName);
}

export async function ingestPdf(filePath, collectionName) {
  const loader = new PDFLoader(filePath);
  const docs = await loader.load();
  return indexDocs(docs, collectionName);
}
