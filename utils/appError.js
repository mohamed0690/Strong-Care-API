import { HttpStatus } from "../enums/httpStatus.js";

export class AppError extends Error {
  constructor(message, statusCode = HttpStatus.InternalServerError) {
    super(message);
    this.statusCode = statusCode;
    this.status = String(statusCode).startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    Error.captureStackTrace(this, AppError);
  }
}
