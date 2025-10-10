import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  state: { type: Object, default: {} }, // LangGraph state
});

export default mongoose.model("Session", sessionSchema);
