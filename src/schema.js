const mongoose = require("mongoose");

const replySchema = new mongoose.Schema(
  {
    author: String,
    content: String,
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "js-files" }
);

const commentSchema = new mongoose.Schema(
  {
    author: String,
    content: String,
    createdAt: { type: Date, default: Date.now },
    replies: [replySchema],
  },
  { collection: "js-files" }
);

const functionSchema = new mongoose.Schema(
  {
    questionNumber: { type: Number, index: true },
    questionName: { type: String, index: true },
    value: String, // Store formatted JavaScript code as a string
    comments: [commentSchema],
  },
  { collection: "js-files" }
);

const FunctionModel = mongoose.model("js-files", functionSchema);

module.exports = FunctionModel;
