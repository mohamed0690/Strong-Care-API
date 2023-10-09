import bcrypt from "bcryptjs";
import { catchAsyncError } from "../../../middleware/catchAsyncError.js";
import { User } from "../../../database/models/user.model.js";
import { AppError } from "../../../utils/appError.js";
import {
  generateToken,
  generateTokenExpiredAfterTenMins,
} from "../../../utils/generateToken.js";
import { HttpStatus } from "../../../enums/httpStatus.js";
import { sendEmail } from "../../../utils/sendEmail.js";
import { resetPasswordTemplate } from "../../../utils/restPasswordTemplete.html.js";

export const signIn = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(
      new AppError("Incorrect email or password", HttpStatus.Unauthorized)
    );
  }

  const token = generateToken({ id: user._id, role: user.role });
  res.json({ message: "Success", token });
});

export const resetPassword = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return res.status(HttpStatus.NotFound).send({ message: "user not exists" });

  const emailSubject = "Reset Password";
  const emailContent = resetPasswordTemplate(
    generateTokenExpiredAfterTenMins({ recipientEmail: email })
  );
  await sendEmail({ recipientEmail: email, emailSubject, emailContent });
  return res.status(200).send({ message: "success" });
});
