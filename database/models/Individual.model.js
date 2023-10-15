import mongoose from "mongoose";

function validateIdentificationNo(value) {
  return value.length === 10;
}

const individualSchema = mongoose.Schema(
  {
    identificationNo: {
      type: String,
      unique: true,
      required: [true, "Identification number is required."],
      validate: {
        validator: validateIdentificationNo,
        message: "Identification number must be 10 characters.",
      },
    },
    identityImg: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },
    forwardDeviceImg: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },
    backwardDeviceImg: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },
    batteryPercentageDeviceImg: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },
    deviceScreenImg: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },
    shopInvoiceImg: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },
    modelYear: {
      type: String,
      required: [true, "Model year is required."],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required."],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Individual", individualSchema);

individualSchema.pre(["findById", "find", "findOne"], function (next) {
  this.populate("user");
  next();
});
export const Individual = mongoose.model("Individual", individualSchema);
