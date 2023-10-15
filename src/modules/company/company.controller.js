import { Company } from "../../../database/models/company.model.js";
import { User } from "../../../database/models/user.model.js";
import { Role } from "../../../enums/role.js";
import { catchAsyncError } from "../../../middleware/catchAsyncError.js";
import { deletePreviousImages } from "../../../utils/cloudinaryAPI.js";
import {
  createRecord,
  deleteRecord,
  getRecord,
  updateRecord,
} from "../../../utils/crudFactory.js";
import { generateUniqueIdentificationNo } from "../../../utils/generateIdNo.js";
import { getAllWithApiFeatures } from "../../../utils/getAllWithApiFeatures.js";
import { updateImageUrls } from "../../../utils/updateImageUrl.js";

const modelName = "Company";

export const createCompany = catchAsyncError(async (req, res) => {
  const { noCommercialRegister, user } = req.body;

  const existingCompany = await Company.findOne({ noCommercialRegister });
  if (existingCompany) {
    return res.json({ message: "Company already exists" });
  }

  const existUser = await User.findOneAndUpdate(
    { _id: user },
    { role: Role.COMPANY }
  );

  if (!existUser) {
    return res.json({ message: "User does not exist" });
  }

  const imageFields = ["commercialRegisterImg", "identityImg"];
  await updateImageUrls(req, imageFields, "companies");

  req.body.identificationNo = await generateUniqueIdentificationNo(
    Company,
    "identificationNo"
  );

  createRecord(modelName, Company, req, res);
});

export const getAllCompanies = getAllWithApiFeatures(Company, true, "user");

export const updateCompany = async (req, res) => {
  const { id } = req.params;
  const company = await Company.findById(id);

  if (!company) {
    return res.json({ message: "Company not found" });
  }

  const imageFields = ["commercialRegisterImg", "identityImg"];
  await updateImageUrls(req, imageFields, "companies");

  const publicIdsToDelete = [
    company.commercialRegisterImg.publicId,
    company.identityImg.publicId,
  ];
  await deletePreviousImages(publicIdsToDelete);

  updateRecord(modelName, Company, req, res);
};

export const deleteCompany = async (req, res) => {
  const { id } = req.params;
  const company = await Company.findById(id);

  if (!company) {
    return res.json({ message: "Company not found" });
  }
  const publicIdsToDelete = [
    company.commercialRegisterImg.publicId,
    company.identityImg.publicId,
  ];
  await deletePreviousImages(publicIdsToDelete);
  deleteRecord(modelName, Company, req, res);

  if (company.user) await User.findOneAndDelete({ _id: company.user });
};

export const getCompany = async (req, res) => {
  getRecord(modelName, Company, req, res);
};

export const changeStateOfCompany = async (req, res) => {
  const { id } = req.params;
  const company = await Company.findById(id);

  if (!company) {
    return res.json({ message: "Company not found" });
  }

  company.state = req.body.state;
  await company.save();
  res.json({ message: "state changed successfully", company });
};
