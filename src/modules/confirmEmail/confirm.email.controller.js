import { User } from "../../../database/models/user.model.js";
import { catchAsyncError } from "../../../middleware/catchAsyncError.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const confirmEmail = catchAsyncError(async (req, res) => {
  const { token } = req.params;
  let decoded = await jwt.verify(token, process.env.TOKEN_KEY);
  let email = decoded.recipientEmail;
  await User.findOneAndUpdate({ email }, { verifiedEmail: true });
  res.status(200).json({ message: "Email confirmation success" });
});
