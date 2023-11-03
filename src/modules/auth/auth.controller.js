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
import { updateImageUrls } from "../../../utils/updateImageUrl.js";
import { emailTemplate } from "../../../templates/confirmEmailTemplete.html.js";
import { Company } from "../../../database/models/company.model.js";
import { Individual } from "../../../database/models/Individual.model.js";
import { resetPasswordTemplate } from "../../../templates/restPasswordTemplete.html.js";

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
    generateTokenExpiredAfterTenMins({ id: user._id })
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
export const loginUserDate = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  let existingUser = await Company.findOne({ user: id }) || await Individual.findOne({ user: id }) || await User.findOne({ _id: id });

  if (existingUser) {
    return res.status(200).json({ message: "success", data: existingUser });
  }
});


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
