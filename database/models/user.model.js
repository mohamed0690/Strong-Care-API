import mongoose from "mongoose";
import { locationSchema } from "./sharedSchema/location.schema.js";
import { Role } from "../../enums/role.js";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      minLength: [
        2,
        "First name is too short (minimum length is 2 characters).",
      ],
      required: [true, "First name is required."],
    },
    lastName: {
      type: String,
      trim: true,
      minLength: [
        2,
        "Last name is too short (minimum length is 2 characters).",
      ],
      required: [true, "Last name is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: [true, "Email is already in use."],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required."],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      minLength: [8, "Password is too short (minimum length is 8 characters)."],
    },
    changePasswordAt: Date,
    role: {
      type: String,
      enum: Object.values(Role),
      required: [
        true,
        "Role is required and must be one of: " +
          Object.values(Role).join(", "),
      ],
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
      _id: false,
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

export const User = mongoose.model("User", userSchema);
