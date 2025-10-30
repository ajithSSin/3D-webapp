import express from "express";
import multer from "multer";
import { MongoClient, GridFSBucket } from "mongodb";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();
const router = express.Router();

// Multer temp storage (before pushing into GridFS)
const upload = multer({ dest: "uploads/" });

// Connect to MongoDB client (for GridFS)
const client = new MongoClient(process.env.MONGO_URI);
await client.connect();
const db = client.db();
const bucket = new GridFSBucket(db, { bucketName: "models" });

/**
 * @route POST /api/upload
 * @desc Upload a .glb file to MongoDB GridFS
 */
router.post("/upload", upload.single("model"), async (req, res) => {
    // console.log("in route");
    
  try {
    const { filename, path } = req.file;
    const uploadStream = bucket.openUploadStream(filename, {
      contentType: "model/gltf-binary",
    });

    fs.createReadStream(path)
      .pipe(uploadStream)
      .on("error", (error) => {
        console.error(error);
        res.status(500).json({ message: "Error uploading file" });
      })
      .on("finish", () => {
        fs.unlinkSync(path); // delete temp file
        res.status(200).json({
          message: "File uploaded to MongoDB GridFS",
          fileId: uploadStream.id,
        });
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @route GET /list
 * @desc Get list of all uploaded 3D models from MongoDB
 */
router.get("/list", async (req, res) => {
  try {
    const files = await db.collection("models.files").find().toArray();

    if (!files || files.length === 0) {
      return res.status(404).json({ message: "No files found" });
    }

    res.status(200).json(files);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to list files" });
  }
});

/**
 * @route GET /api/download/:filename
 * @desc Download a .glb file from MongoDB GridFS
 */
router.get("/download/:filename", async (req, res) => {

  try {
    const downloadStream = bucket.openDownloadStreamByName(req.params.filename);
    res.set("Content-Type", "model/gltf-binary");
    downloadStream.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: "File not found" });
  }
});

export default router;