import express from "express";
import { askQuestion } from "../services/ragService.js";

const router = express.Router();

const DEFAULT_COLLECTION = "GlobalCollection";

// POST /api/query
router.post("/", async (req, res) => {
  try {
    const { query, collection } = req.body;
    const collectionName = collection || DEFAULT_COLLECTION;

    const answer = await askQuestion(query, collectionName);
    res.json({ answer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
