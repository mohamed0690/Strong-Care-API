import mongoose from "mongoose";
const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required."],
    },
    insuranceRequest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InsuranceRequest",
      required: [true, "Insurance request is required."],
    },
    orderDate: { type: Date, default: Date.now },

    isPaid: {
      type: Boolean,
      required: [true, "Payment status is required."],
      default: false,
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
