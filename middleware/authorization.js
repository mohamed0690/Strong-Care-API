import { HttpStatus } from "../enums/httpStatus.js";
import { AppError } from "../utils/appError.js";
import { catchAsyncError } from "./catchAsyncError.js";

export const authorization = (...roles) => {
  return catchAsyncError(async (req, res, next) => {
    if (!req.user || !req.user.role) {
      return next(
        new AppError(
          `You are not authorized. User role is missing.`,
          HttpStatus.Unauthorized
        )
      );
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          `You are not authorized. You are ${req.user.role}.`,
          HttpStatus.Unauthorized
        )
      );
    }

    next();
  });
};
