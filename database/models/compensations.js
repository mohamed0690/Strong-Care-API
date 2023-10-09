import mongoose from "mongoose";

const compensationsSchema = mongoose.Schema(
  {
    compensationIdentification: { type: String, required: true },
    descMalfunction: { type: String, required: true },
    malfunctionImgs: [
      { _id: false, url: { type: String }, publicId: { type: String } },
    ],
    InsuranceRequestNo: { type: String, required: true },
    InsuranceRequest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InsuranceRequest",
    },
  },
  { timestamps: true }
);

compensationsSchema.pre(["findOne", "find"], function (next) {
  this.populate("InsuranceRequest");
  next();
});

export const Compensations = mongoose.model(
  "Compensations",
  compensationsSchema
);
