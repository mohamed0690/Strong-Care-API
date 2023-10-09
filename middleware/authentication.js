import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { catchAsyncError } from "./catchAsyncError.js";
import { AppError } from "../utils/appError.js";
import { HttpStatus } from "../enums/httpStatus.js";
import { User } from "../database/models/user.model.js";

dotenv.config();

export const authentication = catchAsyncError(async (req, res, next) => {
  let { token } = req.headers;
  if (!token) new AppError("Token not provided", HttpStatus.Unauthorized);
  let decoded = await jwt.verify(token, process.env.TOKEN_KEY);
  let user = await User.findById(decoded.id);
  if (user.changePasswordAt) {
    let changePasswordDate = parseInt(user.changePasswordAt.getTime() / 1000);
    if (!user || decoded.iat < changePasswordDate)
      return next(new AppError("invalid token", HttpStatus.NotFound));
  }
  req.user = user;
  next();
});
