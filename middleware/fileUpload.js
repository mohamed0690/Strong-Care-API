import multer from "multer";
import { AppError } from "../utils/appError.js";
import { HttpStatus } from "../enums/httpStatus.js";

import fs from "fs";
import path from "path";
export const deleteFilesInDirectory = (directoryPath) => {
  fs.readdir(directoryPath, (err, files) => {
    for (const file of files) {
      const filePath = path.join(`./${directoryPath}`, file);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
  });
};

const configureMulter = (folderName) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `./uploads/${folderName}`);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype.startsWith("image") ||
      file.mimetype === "application/pdf"
    ) {
      cb(null, true);
    } else {
      cb(
        new AppError(
          "Only image and PDF files are allowed",
          HttpStatus.BadRequest
        ),
        false
      );
    }
  };

  return multer({ storage, fileFilter });
};

export const uploadSingleFile = (fieldName, folderName) =>
  configureMulter(`./${folderName}`).single(fieldName);

export const uploadMixFile = (arrayOfFields, folderName) =>
  configureMulter(`./${folderName}`).fields(arrayOfFields);
