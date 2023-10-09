import mongoose from "mongoose";
const ConFirmPhoneSchema = mongoose.Schema(
  {
    confirmKey: { type: String, required: true },
    expireAt: { type: Date, default: Date.now, index: { expires: 900000 } },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
export const ConFirmPhone = mongoose.model("ConFirmPhone", ConFirmPhoneSchema);
