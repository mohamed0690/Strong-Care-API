import mongoose from "mongoose";
const departmentSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
  },
  { timestamps: true }
);
departmentSchema.pre(["findById", "find", "findOne"], function (next) {
  this.populate("users");
  next();
});

export const Department = mongoose.model("Department", departmentSchema);
