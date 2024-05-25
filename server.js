const express = require("express");
const path = require("path");
const app = express();
const port = 8006;
const fileRoutes = require("./src/fileRouter");

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Endpoint to fetch JavaScript files
app.use(fileRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
