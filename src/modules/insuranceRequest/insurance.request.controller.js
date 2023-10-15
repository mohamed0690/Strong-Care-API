import { Company } from "../../../database/models/company.model.js";
import { InsuranceRequest } from "../../../database/models/insurance.request.model.js";
import { catchAsyncError } from "../../../middleware/catchAsyncError.js";
import {
  createRecord,
  deleteRecord,
  getRecord,
  updateRecord,
} from "../../../utils/crudFactory.js";
import { generateUniqueIdentificationNo } from "../../../utils/generateIdNo.js";
import { getAllWithApiFeatures } from "../../../utils/getAllWithApiFeatures.js";
const modelName = "InsuranceRequest";
export const createInsuranceRequest = catchAsyncError(async (req, res) => {
  const { serialNo, company } = req.body;

  const existingInsurance = await InsuranceRequest.findOne({
    serialNo,
  });
  if (existingInsurance) {
    return res.json({ message: "Insurance already exists" });
  }

  const existCompany = await Company.findOne({ _id: company });

  if (!existCompany) {
    return res.json({ message: "Company does not exist" });
  }

  req.body.insuranceNo = await generateUniqueIdentificationNo(
    InsuranceRequest,
    "identificationNo"
  );
  createRecord(modelName, InsuranceRequest, req, res);
});

export const getAllInsuranceRequests = getAllWithApiFeatures(
  InsuranceRequest,
  true,
  "company"
);

export const updateInsuranceRequest =  catchAsyncError(async (req, res) => {
  const { id } = req.params;
  const insuranceRequest = await InsuranceRequest.findById(id);

  if (!insuranceRequest) {
    return res.json({ message: "InsuranceRequest not found" });
  }

  updateRecord(modelName, InsuranceRequest, req, res);
});

export const deleteInsuranceRequest = catchAsyncError(
  async (req, res, next) => {
    const { id } = req.params;
    const insuranceRequestExist = await InsuranceRequest.findById(id);

    if (!insuranceRequestExist) {
      return res.json({ message: "InsuranceRequest not found" });
    }

    deleteRecord(modelName, InsuranceRequest, req, res);
  }
);
export const getInsuranceRequest = async (req, res) => {
  getRecord(modelName, InsuranceRequest, req, res);
};
