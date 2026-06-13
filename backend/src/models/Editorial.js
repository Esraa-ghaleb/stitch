import mongoose from "mongoose";

const editorialSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    titleKey: { type: String, required: true },
    titleEn: { type: String, required: true },
    titleAr: { type: String, default: "" },
    descEn: { type: String, required: true },
    descAr: { type: String, default: "" },
    readTime: { type: String, default: "5 Min Read" },
    imageUrl: { type: String, required: true },
    featured: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Editorial", editorialSchema);
