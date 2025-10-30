import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import uploadRoutes from "./Routes/uploadRoutes.js";

dotenv.config();

const app = express();
app.use(cors({origin:"*"}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const conn = mongoose.connection;

conn.once("open", () => {
  console.log("MongoDB connected successfully");
});

// Routes
app.use("/", uploadRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));