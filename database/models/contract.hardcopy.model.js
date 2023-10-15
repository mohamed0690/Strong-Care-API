import mongoose from "mongoose";

const contractHardCopySchema = mongoose.Schema(
  {
    contractHardCopyFile: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: [true, "Company is required."],
    },
  },
  { timestamps: true }
);
contractHardCopySchema.pre(["findById", "find", "findOne"], function (next) {
  this.populate("company");
  next();
});
export const ContractHardCopy = mongoose.model(
  "ContractHardCopy",
  contractHardCopySchema
);
