import { User } from "../../../database/models/user.model.js";
import { catchAsyncError } from "../../../middleware/catchAsyncError.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { confirmedEmailSuccessfullyTemplate } from "../../../templates/confirmedEmailSuccessfully.html.js";
import { sendEmail } from '../../../utils/sendEmail.js';
dotenv.config();

export const confirmEmail = catchAsyncError(async (req, res) => {
  const { token } = req.params;
  let decoded = await jwt.verify(token, process.env.TOKEN_KEY);
  let email = decoded.recipientEmail;
  await User.findOneAndUpdate({ email }, { verifiedEmail: true });

  res.status(200).send(confirmedEmailSuccessfullyTemplate);
});


export const sendFullEmail = catchAsyncError(async (req, res) => {
  const { to, subject, message } = req.body;
  sendEmail({ recipientEmail: to, emailSubject: subject, emailContent: message });
});

