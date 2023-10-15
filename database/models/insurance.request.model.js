import mongoose from "mongoose";
import { InsuranceDuration } from "../../enums/insuranceDuration.js";
function validateIdentificationNo(value) {
  return value.length === 10;
}
const insuranceRequestSchema = mongoose.Schema(
  {
    insuranceNo: {
      type: String,
      unique: true,
      required: [true, "insurance number is required."],
      validate: {
        validator: validateIdentificationNo,
        message: "insurance number must be 10 characters.",
      },
    },
    clientName: { type: String, required: [true, "Client name is required."] },
    deviceType: { type: String, required: [true, "Device type is required."] },
    deviceBrand: {
      type: String,
      required: [true, "Device brand is required."],
    },
    deviceColor: {
      type: String,
      required: [true, "Device color is required."],
    },
    serialNo: {
      type: String,
      unique: true,
      required: [true, "Serial number is required."],
    },
    clientPhone: {
      type: String,
      required: [true, "Client phone number is required."],
    },
    clientEmail: { type: String },
    insuranceDuration: {
      type: String,
      enum: Object.values(InsuranceDuration),
      required: [true, "Insurance duration is required."],
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: [true, "Company is required."],
    },
  },
  { timestamps: true }
);

insuranceRequestSchema.pre(["findById", "find", "findOne"], function (next) {
  this.populate("company");
  next();
});
export const InsuranceRequest = mongoose.model(
  "InsuranceRequest",
  insuranceRequestSchema
);
