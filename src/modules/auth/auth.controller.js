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
import { updateImageUrls } from "../../../utils/updateImageUrl.js";
import { emailTemplate } from "../../../utils/confirmEmailTemplete.html.js";

export const signIn = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(
      new AppError("Incorrect email or password", HttpStatus.Unauthorized)
    );
  }

  const token = generateToken({ id: user._id, role: user.role });
  res.json({ message: "success", token });
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
const sendVerificationEmail = (email) => {
  const emailSubject = "Verify Email Strong Care";
  const emailContent = emailTemplate(
    generateTokenExpiredAfterTenMins({ recipientEmail: email }),
    email
  );
  sendEmail({ recipientEmail: email, emailSubject, emailContent });
};

export const signUp = catchAsyncError(async (req, res, next) => {
  const { email, latitude, longitude } = req.body;
  if (latitude && longitude)
    req.body.location = {
      latitude,
      longitude,
    };

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(HttpStatus.Conflict)
      .json({ message: "user already exists" });
  }

  if (req.body) {
    const imageFields = ["profileImg"];
    await updateImageUrls(req, imageFields, "users");
    const user = await User(req.body).save();
    const token = generateToken({ id: user._id, role: user.role });
    res.json({ message: "success", token });
    sendVerificationEmail(email);
  }
});
