import mongoose from "mongoose";
import { locationSchema } from "./sharedSchema/location.schema.js";
import { State } from "../../enums/State.js";

const companySchema = mongoose.Schema(
  {
    identificationNo: { type: String },
    country: { type: String },
    noCommercialRegister: { type: String },
    legalName: { type: String },
    legalLocation: { type: locationSchema },
    commercialRegisterImg: {
      url: { type: String },
      publicId: { type: String },
    },
    identityImg: { url: { type: String }, publicId: { type: String } },
    state: {
      type: String,
      enum: Object.values(State),
      default: State.PENDING,
    },

    commission: { type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

companySchema.pre(["findById", "find", "findOne"], function (next) {
  this.populate("user");
  next();
});

export const Company = mongoose.model("Company", companySchema);
