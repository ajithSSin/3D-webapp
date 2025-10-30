import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import ModelFile from "./models/ModelFile.js";

dotenv.config();
const app = express();
app.use(cors(
  {
    origin:"*"
  }
));
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("MongoDB connected"))
        .catch((err) => console.error(err));

// Multer setup for local uploads
const upload = multer({ dest: "uploads/" });

// Upload route
app.post("/upload", upload.single("model"), async (req, res) => {
  console.log("posted");
  

  try {
    if (!req.file) return res.status(400).send("No file uploaded");

    if (!req.file.originalname.endsWith(".glb")) {
      fs.unlinkSync(req.file.path);
      return res.status(400).send("Only .glb files are allowed");
    }

    const fileData = fs.readFileSync(req.file.path);

    const newModel = new ModelFile({
                          filename: req.file.originalname,
                          contentType: req.file.mimetype,
                          data: fileData,
                  });

    await newModel.save();

    // Optional: delete local file after saving
    fs.unlinkSync(req.file.path);

    res.status(200).json({ message: "File uploaded and saved to MongoDB!" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving file");
  }
});

// Retrieve all models
app.get("/models", async (req, res) => {
  const models = await ModelFile.find({}, "filename uploadDate");
  res.json(models);
});

// Download a model by ID
app.get("/models/:id", async (req, res) => {
  try {
    const model = await ModelFile.findById(req.params.id);
    if (!model) return res.status(404).send("Model not found");

    res.set("Content-Type", model.contentType);
    res.send(model.data);
  } catch (err) {
    res.status(500).send("Error fetching model");
  }
});

// import fs from "fs";

// fs.readdir(".", (err, files) => {
//   if (err) console.error(err);
//   else console.log("fs works fine! Files:", files);
// });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));