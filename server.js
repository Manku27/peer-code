const express = require("express");
const path = require("path");
const app = express();
const port = 8006;
const schemaRoutes = require("./src/api");
require("dotenv").config();
const mongoose = require("mongoose");

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

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Endpoint for mongodb apis
app.use(schemaRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
