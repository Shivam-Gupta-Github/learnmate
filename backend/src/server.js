import express from "express";
import bodyParser from "body-parser";
import ingestRoute from "./routes/ingest.js";
import queryRoute from "./routes/query.js";
import { PORT } from "./utils/config.js";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/api/ingest", ingestRoute);
app.use("/api/query", queryRoute);

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
