import express from "express";
import { marked } from "marked";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const router = express.Router();

router.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.get("/docs/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = join(__dirname, "..", "..", "markdown", `${filename}.md`);

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(404).send("File not found");
    }
    // Custom renderer for marked to add target="_blank" to links
    const renderer = new marked.Renderer();
    renderer.link = function (href, title, text) {
      return `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;
    };

    const htmlContent = marked(data, { renderer });
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${filename}</title>
        <link rel="icon" type="image/png" href="/Javascript-logo.png" />
        <link rel="stylesheet" href="/markdown.min.css">
      </head>
      <body>
        <div class="markdown-content">
        ${htmlContent}
        </div>
      </body>
      </html>
    `);
  });
});

export default router;
