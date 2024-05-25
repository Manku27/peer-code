const express = require("express");
const fs = require("fs");
const path = require("path");
const { searchFiles } = require("./queryToFileMapping");

const router = express.Router();

// Endpoint to fetch JavaScript files
router.get("/fetch-file", (req, res) => {
  const query = req.query.q;

  const root = path.join(__dirname, "../js-files");

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

module.exports = router;
