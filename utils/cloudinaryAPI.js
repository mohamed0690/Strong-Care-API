import dotenv from "dotenv";
import cloudinary from "cloudinary";
import path from "path";
import { fileURLToPath } from "url";
import { deleteFilesInDirectory } from "../middleware/fileUpload.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const cloudinaryUploadImage = async (fileToUpload, folderName) => {
  try {
    const fileToUploadPath = path.join(
      __dirname,
      `../uploads/${folderName}`,
      fileToUpload
    );
    return await cloudinary.uploader.upload(fileToUploadPath, {
      resource_type: "auto",
    });
  } catch (error) {
    console.log(error);
  }
};

export const cloudinaryDeleteImage = async (publicId) => {
  try {
    return await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.log(error);
  }
};

export const deletePreviousImages = async (publicIds) => {
  const deleteResults = [];

  for (const publicId of publicIds) {
    const result = await cloudinaryDeleteImage(publicId);
    if (result.result === "ok") {
      deleteResults.push(publicId);
    }
  }

  return deleteResults;
};

export const uploadAndUpdateImage = async (req, imageFieldName, folderName) => {
  const file = req.body[imageFieldName];
  if (file) {
    const data = await cloudinaryUploadImage(file, folderName);
    const dirPath = path.join(__dirname, `../uploads/${folderName}`);
    deleteFilesInDirectory(dirPath);
    return data;
  }
  return null;
};

export const uploadAndUpdateImages = async (
  req,
  imageFieldNames,
  folderName
) => {
  const results = [];
  for (const fieldName of imageFieldNames) {
    const file = req.files[fieldName];
    if (file && file.length > 0) {
      for (let f of file) {
        const data = await cloudinaryUploadImage(f.filename, folderName);
        if (data) {
          results.push({
            field: fieldName,
            secure_url: data.secure_url,
            public_id: data.public_id,
          });
        }
      }
    }
  }
  if (results) {
    const dirPath = path.join(__dirname, `../uploads/${folderName}`);
    deleteFilesInDirectory(dirPath);
  }
  return results;
};
