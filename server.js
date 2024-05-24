const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 8006;
const { searchFiles } = require("./src/queryToFileMapping");

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Endpoint to fetch JavaScript files
app.get("/fetch-file", (req, res) => {
  const query = req.query.q;

  const root = path.join(__dirname, "./js-files");

  const matchingFiles = searchFiles(root, query);

  if (matchingFiles.length > 0) {
    // Serve the first matching file found
    const filePath = path.join(root, matchingFiles[0]);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    res.json({ success: true, content: fileContent });
  } else {
    res.json({ success: false, message: "File not found" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
