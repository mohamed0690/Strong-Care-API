import { uploadAndUpdateImages } from "./cloudinaryAPI.js";

export const updateImageUrls = async (req, imageFields, folderName) => {
  const uploadResults = await uploadAndUpdateImages(
    req,
    imageFields,
    folderName
  );

  for (const result of uploadResults) {
    req.body[result.field] = {
      url: result.secure_url,
      publicId: result.public_id,
    };
  }
};
export const updateImagesUrls = async (req, imageFields, folderName) => {
  let tempArr = [];
  const uploadResults = await uploadAndUpdateImages(
    req,
    imageFields,
    folderName
  );

  for (const result of uploadResults) {
    tempArr.push({
      url: result.secure_url,
      publicId: result.public_id,
    });
  }

  req.body[uploadResults[0].field] = tempArr;
};
