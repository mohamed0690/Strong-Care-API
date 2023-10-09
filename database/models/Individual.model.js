import mongoose from "mongoose";
const individualSchema = mongoose.Schema(
  {
    identificationNo: { type: String },

    identityImg: {
      url: { type: String },
      publicId: { type: String },
    },
    forwardDeviceImg: {
      url: { type: String },
      publicId: { type: String },
    },
    backwardDeviceImg: {
      url: { type: String },
      publicId: { type: String },
    },
    batteryPercentageDeviceImg: {
      url: { type: String },
      publicId: { type: String },
    },
    deviceScreenImg: {
      url: { type: String },
      publicId: { type: String },
    },
    shopInvoiceImg: {
      url: { type: String },
      publicId: { type: String },
    },
    modelYear: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
individualSchema.pre(["findById", "find", "findOne"], function (next) {
  this.populate("user");
  next();
});
export const Individual = mongoose.model("Individual", individualSchema);
