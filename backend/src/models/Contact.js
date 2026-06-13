import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    subject: {
      type: String,
      required: true,
      enum: ["treatment", "booking", "press", "other"],
    },
    message: { type: String, required: true, trim: true },
    status: { type: String, enum: ["new", "read", "replied"], default: "new" },
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
