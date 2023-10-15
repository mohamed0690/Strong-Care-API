import mongoose from "mongoose";
function validateIdentificationNo(value) {
  return value.length === 10;
}
const compensationsSchema = mongoose.Schema(
  {
    compensationIdentification: {
      type: String,
      required: [true, "Compensation identification is required."],
      validate: {
        validator: validateIdentificationNo,
        message: "Compensation identification must be 10 characters.",
      },
    },
    descMalfunction: {
      type: String,
      required: [true, "Malfunction description is required."],
    },
    malfunctionImgs: [
      {
        _id: false,
        url: { type: String, required: true },
        publicId: { type: String, required: true },
      },
    ],
    InsuranceRequestNo: {
      type: String,
      required: [true, "Insurance request number is required."],
    },
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
