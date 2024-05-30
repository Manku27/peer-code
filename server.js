import express from "express";
import schemaRoutes from "./src/api/api.js";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const app = express();
const port = process.env.PORT || 8006;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(__dirname);

// Serve static files from the public directory
app.use(express.static(join(__dirname, "public")));

// Endpoint for mongodb apis
app.use(schemaRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
