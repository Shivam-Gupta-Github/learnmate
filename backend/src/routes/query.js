import express from "express";
import Session from "../models/Session.js";
import { runWorkflow } from "../agents/orchestrator.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { query, collection, sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ error: "sessionId is required" });
    }

    const collectionName = collection || "GlobalCollection";

    // Fetch previous state from MongoDB
    const prevSession = await Session.findOne({ sessionId });
    const prevState = prevSession?.state || { history: [] };

    // Ensure inputText is a valid string
    const inputText = typeof query === "string" ? query : JSON.stringify(query);

    // Run workflow
    const finalState = await runWorkflow(inputText, prevState, collectionName);

    // Save updated state
    await Session.updateOne(
      { sessionId },
      { state: finalState },
      { upsert: true }
    );

    res.json({
      answer: finalState.output,
      pdfPath: finalState.pdfPath || null,
      nextAgent: finalState.next || "QueryAgent",
    });
  } catch (err) {
    console.error("Error in multi-agent API:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
