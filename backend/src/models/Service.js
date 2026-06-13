import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    category: {
      type: String,
      required: true,
      enum: ["face", "hair", "body", "accessories", "specialty"],
    },
    titleKey: { type: String, required: true },
    descKey: { type: String, required: true },
    titleEn: { type: String, required: true },
    titleAr: { type: String, default: "" },
    descEn: { type: String, required: true },
    descAr: { type: String, default: "" },
    duration: { type: Number, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, default: 5 },
    reviewsCount: { type: Number, default: 0 },
    badgeKey: { type: String, default: "" },
    imageUrl: { type: String, required: true },
    bannerUrl: { type: String, default: "" },
    processDescEn: { type: String, default: "" },
    processDescAr: { type: String, default: "" },
    ingredientsEn: { type: String, default: "" },
    ingredientsAr: { type: String, default: "" },
    aftercareEn: { type: String, default: "" },
    aftercareAr: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);
