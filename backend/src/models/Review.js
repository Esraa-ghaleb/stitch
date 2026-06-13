import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    service: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    authorName: { type: String, required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
