import express from "express";
import { ingestYoutube, ingestPdf } from "../services/embedService.js";

const router = express.Router();
const GLOBAL_COLLECTION = "GlobalCollection";

// POST /api/ingest
router.post("/", async (req, res) => {
  try {
    const { type, url, filePath, collection } = req.body;

    // Type-specific collection (default)
    let collectionName = collection;
    if (!collectionName) {
      collectionName =
        type === "youtube" ? "YoutubeCollection" : "PdfCollection";
    }

    let result;
    if (type === "youtube") {
      // ingest into type-specific collection
      result = await ingestYoutube(url, collectionName);
      // ingest into global collection
      await ingestYoutube(url, GLOBAL_COLLECTION);
    } else if (type === "pdf") {
      result = await ingestPdf(filePath, collectionName);
      // ingest into global collection
      await ingestPdf(filePath, GLOBAL_COLLECTION);
    }

    res.json({
      status: "ok",
      ingestedCollection: collectionName,
      globalCollection: GLOBAL_COLLECTION,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
