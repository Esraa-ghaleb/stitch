import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    reference: { type: String, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    service: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerPhone: { type: String, default: "" },
    date: { type: String, required: true },
    time: { type: String, required: true },
    notes: { type: String, default: "" },
    healthNotes: { type: String, default: "" },
    quantity: { type: Number, default: 1 },
    discountCode: { type: String, default: "" },
    discountAmount: { type: Number, default: 0 },
    subtotal: { type: Number, required: true },
    depositAmount: { type: Number, required: true },
    total: { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: ["card", "applepay", "googlepay"],
      default: "card",
    },
    status: {
      type: String,
      enum: ["draft", "pending_deposit", "confirmed", "cancelled"],
      default: "draft",
    },
    specialist: { type: String, default: "Stitch Team" },
  },
  { timestamps: true }
);

bookingSchema.pre("save", async function (next) {
  if (this.reference) return next();
  const count = await mongoose.model("Booking").countDocuments();
  this.reference = `ST-${String(847291 + count).padStart(6, "0")}`;
  next();
});

export default mongoose.model("Booking", bookingSchema);
