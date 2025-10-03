import dotenv from "dotenv";
dotenv.config();

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
export const PORT = process.env.PORT || 5000;
export const CHROMA_DB_DIR = process.env.CHROMA_DB_DIR || "./chroma_db";
