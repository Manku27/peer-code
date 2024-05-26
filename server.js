import express from "express";
import path from "path";
import schemaRoutes from "./src/api/api.js";
import mongoose from "mongoose";

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
const port = 8006;

const __dirname = import.meta.dirname;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

app.use(express.static(path.join(__dirname, process.env.SOURCE)));

// Endpoint for mongodb apis
app.use(schemaRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
