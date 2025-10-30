import mongoose from "mongoose";

//Schema to stores both metadata and binary content.

const ModelFileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  contentType: { type: String },
  data: { type: Buffer, required: true },
  uploadDate: { type: Date, default: Date.now },
});

export default mongoose.model("ModelFile", ModelFileSchema);