const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ArticleSchema = new Schema(
  {
    title: { type: String, min: 5, max: 400, required: "true" },
    subtitle: { type: String, min: 5 },
    description: { type: String, min: 5, max: 5000, required: "true" },
    owner: { type: ObjectId, ref: "User" },
    category: {
      type: String,
      enum: ["sport", "games", "history "],
      required: "true",
    },
  },
  { timestamps: true }
);

ArticleSchema.index({ title: "text" });

module.exports = mongoose.model("Article", ArticleSchema);
