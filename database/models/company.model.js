import mongoose from "mongoose";
import { State } from "../../enums/State.js";

function validateIdentificationNo(value) {
  return value.length === 10;
}

const companySchema = mongoose.Schema(
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
    country: {
      type: String,
      required: [true, "country is required."],
    },
    noCommercialRegister: {
      type: String,
      unique: true,
      required: [true, "commercial register is required."],
    },
    legalName: { type: String, required: [true, "legal name is required."] },
    legalLocation: {
      type: String,
      required: [true, "legal location is required."],
    },
    commercialRegisterImg: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },
    identityImg: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },
    state: {
      type: String,
      enum: Object.values(State),
      default: State.PENDING,
      required: true,
    },
    commission: { type: Number, required: [true, "commission is required."] },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "user is required."],
    },
  },
  { timestamps: true }
);

companySchema.pre(["findById", "find", "findOne"], function (next) {
  this.populate("user");
  next();
});

export const Company = mongoose.model("Company", companySchema);
