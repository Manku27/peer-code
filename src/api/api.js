import express from "express";
import FunctionModel from "./schema.js";

const router = express.Router();

router.use(express.json());

// Endpoint to search for functions
router.get("/search", async (req, res) => {
  const { query } = req.query;

  try {
    const isNumber = !isNaN(query) && query.trim() !== "";

    let searchResult = [];

    if (isNumber) {
      searchResult = await FunctionModel.find({ questionNumber: parseInt(query) });
    } else {
      // Find an exact match, questionName : query is case senstivive
      searchResult = await FunctionModel.find({
        questionName: { $regex: `^${query}$`, $options: "i" },
      });

      // If no exact match is found, perform the regex search
      if (searchResult.length === 0) {
        searchResult = await FunctionModel.find({
          questionName: { $regex: query, $options: "i" },
        }).sort({ questionNumber: "asc" });
      }
    }
    if (searchResult.length > 0) {
      res.json({
        success: true,
        content: searchResult[0].value,
        questionNumber: searchResult[0].questionNumber,
        questionName: searchResult[0].questionName,
      });
    } else {
      res.json({ success: false, message: "No matching function found." });
    }
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "An error occurred during the search" });
  }
});

router.post("/save", async (req, res) => {
  try {
    const { questionNumber, questionName, value, comments } = req.body;

    const missingFields = [];
    if (!questionNumber) missingFields.push("questionNumber");
    if (!questionName) missingFields.push("questionName");
    if (!value) missingFields.push("value");

    if (missingFields.length > 0) {
      return res
        .status(400)
        .json({ success: false, error: `Missing required fields: ${missingFields.join(", ")}` });
    }

    const newFunction = new FunctionModel({
      questionNumber,
      questionName,
      value,
      comments,
    });

    await newFunction.save();
    res.json({ success: true, message: "Function saved successfully" });
  } catch (error) {
    console.error("Error saving function:", error);
    res.status(500).json({ success: false, error: "Error saving function" });
  }
});

router.get("/comments", async (req, res) => {
  const { questionNumber } = req.query;
  try {
    const functionDoc = await FunctionModel.findOne({ questionNumber });
    if (functionDoc) {
      res.json({ success: true, comments: functionDoc.comments });
    } else {
      res.json({ success: false, message: "No function found with the given question number" });
    }
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ success: false, error: "Error fetching comments" });
  }
});

router.post("/comments", async (req, res) => {
  const { questionNumber, comment } = req.body;
  try {
    if (!questionNumber || !comment) {
      return res
        .status(400)
        .json({ success: false, error: "Question number and comment are required" });
    }

    const functionDoc = await FunctionModel.findOne({ questionNumber });
    if (functionDoc) {
      functionDoc.comments.push({ text: comment });
      await functionDoc.save();
      res.json({ success: true, message: "Comment added successfully" });
    } else {
      res.status(404).json({ success: false, message: "Function not found" });
    }
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ success: false, error: "Error adding comment" });
  }
});

export default router;
