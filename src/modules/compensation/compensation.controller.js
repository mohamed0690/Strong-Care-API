import { Compensations } from "../../../database/models/compensations.js";
import { InsuranceRequest } from "../../../database/models/insurance.request.model.js";
import { HttpStatus } from "../../../enums/httpStatus.js";
import { catchAsyncError } from "../../../middleware/catchAsyncError.js";
import { AppError } from "../../../utils/appError.js";
import { deletePreviousImages } from "../../../utils/cloudinaryAPI.js";
import {
  createRecord,
  deleteRecord,
  getRecord,
  updateRecord,
} from "../../../utils/crudFactory.js";
import { generateUniqueIdentificationNo } from "../../../utils/generateIdNo.js";
import { getAllWithApiFeatures } from "../../../utils/getAllWithApiFeatures.js";
import { updateImagesUrls } from "../../../utils/updateImageUrl.js";
const modelName = "Compensation";
export const createCompensation = catchAsyncError(async (req, res, next) => {
  let { InsuranceRequestNo } = req.body;
  const insuranceRequest = await InsuranceRequest.findOne({
    insuranceNo: InsuranceRequestNo,
  });
  if (!insuranceRequest) {
    return res
      .status(HttpStatus.NotFound)
      .send({ message: "Insurance request does not exist" });
  }

  req.body.InsuranceRequest = insuranceRequest._id;
  if (!req.files.malfunctionImgs || req.files.malfunctionImgs.length === 0) {
    return next(new AppError("Images do not exist", HttpStatus.NotFound));
  }
  req.body.malfunctionImgs = req.files.malfunctionImgs.map(
    (img) => img.filename
  );
  req.body.malfunctionImgs = req.files.malfunctionImgs.map(
    (img) => img.filename
  );

  const imageFields = ["malfunctionImgs"];
  await updateImagesUrls(req, imageFields, "compensations");

  req.body.compensationIdentification = await generateUniqueIdentificationNo(
    Compensations,
    "compensationIdentification"
  );
  createRecord(modelName, Compensations, req, res, next);
});

export const getAllCompensations = getAllWithApiFeatures(
  Compensations,
  true,
  "InsuranceRequest"
);

export const getCompensation = catchAsyncError(async (req, res, next) => {
  getRecord(modelName, Compensations, req, res);
});

export const deleteCompensation = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const compensation = await Compensations.findById(id);

  if (!compensation) {
    return res.json({ message: "Compensation not found" });
  }
  const publicIdsToDelete = compensation.malfunctionImgs.map(
    (img) => img.publicId
  );
  await deletePreviousImages(publicIdsToDelete);
  deleteRecord(modelName, Compensations, req, res);
});

export const updateCompensation = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const compensation = await Compensations.findById(id);

  if (!compensation) {
    return res.json({ message: "Compensation not found" });
  }
  const imageFields = ["malfunctionImgs"];
  await updateImagesUrls(req, imageFields, "compensations");

  const publicIdsToDelete = compensation.malfunctionImgs.map(
    (img) => img.publicId
  );
  await deletePreviousImages(publicIdsToDelete);

  updateRecord(modelName, Compensations, req, res);
});
