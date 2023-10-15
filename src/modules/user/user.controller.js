import { User } from "../../../database/models/user.model.js";
import { HttpStatus } from "../../../enums/httpStatus.js";
import { catchAsyncError } from "../../../middleware/catchAsyncError.js";
import { AppError } from "../../../utils/appError.js";
import {
  deletePreviousImages,
  uploadAndUpdateImage,
} from "../../../utils/cloudinaryAPI.js";
import { emailTemplate } from "../../../utils/confirmEmailTemplete.html.js";
import {
  createRecord,
  deleteRecord,
  getRecord,
  updateRecord,
} from "../../../utils/crudFactory.js";
import { generateTokenExpiredAfterTenMins } from "../../../utils/generateToken.js";
import { getAllWithApiFeatures } from "../../../utils/getAllWithApiFeatures.js";
import { sendEmail } from "../../../utils/sendEmail.js";
import { updateImageUrls } from "../../../utils/updateImageUrl.js";

const modelName = "User";

export const createUser = catchAsyncError(async (req, res, next) => {
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
      .json({ message: "User already exists" });
  }

  if (req.body) {
    const imageFields = ["profileImg"];
    await updateImageUrls(req, imageFields, "users");
    createRecord(modelName, User, req, res);
    sendVerificationEmail(email);
  }
});

export const getAllUsers = getAllWithApiFeatures(User);

export const updateUser = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) {
    return res.json({ message: "User not found" });
  }

  const imageFields = ["profileImg"];
  await updateImageUrls(req, imageFields, "users");

  const publicIdsToDelete = [user.profileImg.publicId];
  await deletePreviousImages(publicIdsToDelete);
  updateRecord(modelName, User, req, res);
});

export const deleteUser = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) {
    return res.json({ message: "User not found" });
  }
  const publicIdsToDelete = [user.profileImg.publicId];
  await deletePreviousImages(publicIdsToDelete);
  deleteRecord(modelName, User, req, res);
});

export const getUser = catchAsyncError(async (req, res, next) => {
  getRecord(modelName, User, req, res);
});

export const changeUserPassword = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) {
    return next(new AppError("User not found", HttpStatus.NotFound));
  }

  user.password = req.body.password;
  user.changePasswordAt = Date.now();
  await user.save();
  res.json({ message: "Password changed successfully", user });
});

export const changeUserPhone = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) {
    return res.json({ message: "User not found" });
  }

  user.phone = req.body.phone;
  user.verifiedPhone = false;
  await user.save();
  res.json({ message: "Phone number changed successfully", user });
};

const sendVerificationEmail = (email) => {
  const emailSubject = "Verify Email Strong Care";
  const emailContent = emailTemplate(
    generateTokenExpiredAfterTenMins({ recipientEmail: email }),
    email
  );
  sendEmail({ recipientEmail: email, emailSubject, emailContent });
};
