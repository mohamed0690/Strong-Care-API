import { catchAsyncError } from "../../../middleware/catchAsyncError.js";
import { Individual } from "../../../database/models/Individual.model.js";
import { deletePreviousImages } from "../../../utils/cloudinaryAPI.js";
import {
  createRecord,
  deleteRecord,
  getRecord,
  updateRecord,
} from "../../../utils/crudFactory.js";
import { getAllWithApiFeatures } from "../../../utils/getAllWithApiFeatures.js";
import { User } from "../../../database/models/user.model.js";
import { Role } from "../../../enums/role.js";
const modelName = "Individual";
export const createIndividual = catchAsyncError(async (req, res) => {
  const { user } = req.body;

  const existUser = await User.findOneAndUpdate(
    { _id: user },
    { role: Role.INDIVIDUAL }
  );

  if (!existUser) {
    return res.json({ message: "User does not exist" });
  }
  const existingIndividual = await Individual.findOne({ user });
  if (existingIndividual)
    return res.json({ message: "Individual Client already exists" });

  const imageFields = [
    "identityImg",
    "forwardDeviceImg",
    "backwardDeviceImg",
    "batteryPercentageDeviceImg",
    "deviceScreenImg",
    "shopInvoiceImg",
  ];
  await updateImageUrls(req, imageFields, "individual");

  req.body.identificationNo = await generateUniqueIdentificationNo(
    Individual,
    "identificationNo"
  );

  createRecord(modelName, Individual, req, res);
});

export const getAllIndividuals = getAllWithApiFeatures(
  Individual,
  true,
  "user"
);

export const updateIndividual = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  const individual = await Individual.findById(id);

  if (!individual) {
    return res.json({ message: "Individual client not found" });
  }

  const imageFields = [
    "identityImg",
    "forwardDeviceImg",
    "backwardDeviceImg",
    "batteryPercentageDeviceImg",
    "deviceScreenImg",
    "shopInvoiceImg",
  ];
  await updateImageUrls(req, imageFields, "individual");

  const publicIdsToDelete = [
    individual.identityImg.publicId,
    individual.forwardDeviceImg.publicId,
    individual.backwardDeviceImg.publicId,
    individual.batteryPercentageDeviceImg.publicId,
    individual.deviceScreenImg.publicId,
    individual.shopInvoiceImg.publicId,
  ];
  await deletePreviousImages(publicIdsToDelete);

  updateRecord(modelName, Individual, req, res);
});

export const deleteIndividual = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  const individual = await Individual.findById(id);

  if (!individual) {
    return res.json({ message: "Individual Client not found" });
  }
  const publicIdsToDelete = [
    individual.identityImg.publicId,
    individual.forwardDeviceImg.publicId,
    individual.backwardDeviceImg.publicId,
    individual.batteryPercentageDeviceImg.publicId,
    individual.deviceScreenImg.publicId,
    individual.shopInvoiceImg.publicId,
  ];
  await deletePreviousImages(publicIdsToDelete);
  deleteRecord(modelName, Individual, req, res);
});

export const getIndividual = catchAsyncError(async (req, res) => {
  getRecord(modelName, Individual, req, res);
});
