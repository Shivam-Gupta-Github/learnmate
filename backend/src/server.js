import express from "express";
import bodyParser from "body-parser";
import ingestRoute from "./routes/ingest.js";
import queryRoute from "./routes/query.js";
import { PORT } from "./utils/config.js";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/learnmate")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/ingest", ingestRoute);
app.use("/api/query", queryRoute);

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
