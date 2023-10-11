import mongoose from "mongoose";
import { locationSchema } from "./sharedSchema/location.schema.js";
import { Role } from "../../enums/role.js";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      minLength: [2, "firstName is too short"],
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      minLength: [2, "lastName is too short"],
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: [8, "Password is too short"],
    },
    changePasswordAt: Date,
    role: {
      type: String,
      enum: Object.values(Role),
    },
    profileImg: {
      url: {
        type: String,
        default:
          "https://res.cloudinary.com/dnnjczqjn/image/upload/v1694960991/u0ambdhcxbeyugyp28ag.png",
      },
      publicId: { type: String },
    },
    location: {
      type: locationSchema,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verifiedEmail: {
      type: Boolean,
      default: false,
    },
    verifiedPhone: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  next();
});
userSchema.pre("updateOne", function (next) {
  const updateQuery = this.getUpdate();
  if (
    updateQuery.$set &&
    (updateQuery.$set.verifiedEmail || updateQuery.$set.verifiedPhone)
  ) {
    this.update({
      $set: {
        verified:
          updateQuery.$set.verifiedEmail && updateQuery.$set.verifiedPhone,
      },
    });
  }

  next();
});

export const User = mongoose.model("User", userSchema);
