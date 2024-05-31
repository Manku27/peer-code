import express from "express";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

import schemaRoutes from "./src/api/api.js";
import markdownRoutes from "./src/api/markdown-routes.js";

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

// Serve static files from the public directory
app.use(express.static(join(__dirname, "public")));

app.use(express.static(join(__dirname, process.env.SOURCE)));

// Endpoint for mongodb apis
app.use(schemaRoutes);
app.use(markdownRoutes);

app.listen(port, () => {
  console.log(`Server is running on Port:${port}`);
});
