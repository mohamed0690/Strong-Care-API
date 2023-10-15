import mongoose from "mongoose";

const confirmPhoneSchema = mongoose.Schema(
  {
    confirmKey: {
      type: String,
      required: [true, "Confirmation key is required."],
    },
    expireAt: {
      type: Date,
      default: Date.now,
      index: { expires: 900 },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User  is required."],
    },
  },
  { timestamps: true }
);
export const ConFirmPhone = mongoose.model("ConFirmPhone", ConFirmPhoneSchema);
