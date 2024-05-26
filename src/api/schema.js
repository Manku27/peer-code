import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

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

export default FunctionModel;
