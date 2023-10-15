import { Company } from "../../../database/models/company.model.js";
import { ContractHardCopy } from "../../../database/models/contract.hardcopy.model.js";
import { catchAsyncError } from "../../../middleware/catchAsyncError.js";
import { deletePreviousImages } from "../../../utils/cloudinaryAPI.js";
import {
  createRecord,
  deleteRecord,
  getRecord,
  updateRecord,
} from "../../../utils/crudFactory.js";
import { getAllWithApiFeatures } from "../../../utils/getAllWithApiFeatures.js";
import { updateImageUrls } from "../../../utils/updateImageUrl.js";

const modelName = "contract";

export const createContractHardCopy = catchAsyncError(async (req, res) => {
  const { company } = req.body;
  const existingCompany = await Company.findOne({ _id: company });
  if (!existingCompany) return res.json({ message: "Company is not exists" });
  const imageFields = ["contractHardCopyFile"];
  await updateImageUrls(req, imageFields, "contractHardCopyFiles");
  createRecord(modelName, ContractHardCopy, req, res);
});

export const getAllContractHardCopy = getAllWithApiFeatures(
  ContractHardCopy,
  true,
  "company"
);

export const updateContractHardCopy = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  const contract = await ContractHardCopy.findById(id);

  if (!contract) {
    return res.json({ message: "Contract not found" });
  }

  const imageFields = ["contractHardCopyFile"];
  await updateImageUrls(req, imageFields, "contractHardCopyFiles");

  const publicIdsToDelete = [contract.contractHardCopyFile.publicId];
  await deletePreviousImages(publicIdsToDelete);

  updateRecord(modelName, ContractHardCopy, req, res);
});

export const deleteContractHardCopy = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  const contract = await ContractHardCopy.findById(id);

  if (!contract) {
    return res.json({ message: "Contract not found" });
  }
  const publicIdsToDelete = [contract.contractHardCopyFile.publicId];
  await deletePreviousImages(publicIdsToDelete);
  deleteRecord(modelName, ContractHardCopy, req, res);
});

export const getContractHardCopy = catchAsyncError(async (req, res) => {
  getRecord(modelName, ContractHardCopy, req, res);
});
