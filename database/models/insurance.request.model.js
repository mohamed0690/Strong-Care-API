import mongoose from "mongoose";
import { InsuranceDuration } from "../../enums/insuranceDuration.js";
const insuranceRequestSchema = mongoose.Schema(
  {
    insuranceNo: { type: String, required: true },
    clientName: { type: String, required: true },
    deviceBrand: { type: String, required: true },
    deviceColor: { type: String, required: true },
    serialNo: { type: String, required: true },
    clientPhone: { type: String, required: true },
    buyDate: { type: String },
    insuranceDuration: {
      type: String,
      enum: Object.values(InsuranceDuration),
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
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
