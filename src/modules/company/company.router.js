import { Router } from "express";
import { validation } from "../../../middleware/validation.js";
import {
  changeStateOfCompanySchema,
  createCompanySchema,
  deleteCompanySchema,
  getCompanySchema,
  updateCompanySchema,
} from "./company.validation.js";
import {
  changeStateOfCompany,
  createCompany,
  deleteCompany,
  getAllCompanies,
  getCompany,
  updateCompany,
} from "./company.controller.js";
import {
  uploadMixFile,
  uploadSingleFile,
} from "../../../middleware/fileUpload.js";

const companyRouter = Router();

companyRouter
  .route("/")
  .post(
    uploadMixFile(
      [
        { name: "commercialRegisterImg", maxCount: 1 },
        { name: "identityImg", maxCount: 1 },
      ],
      "companies"
    ),
    validation(createCompanySchema),
    createCompany
  )
  .get(getAllCompanies);

companyRouter
  .route("/:id")
  .get(validation(getCompanySchema), getCompany)
  .delete(validation(deleteCompanySchema), deleteCompany)
  .put(
    uploadMixFile(
      [
        { name: "commercialRegisterImg", maxCount: 1 },
        { name: "identityImg", maxCount: 1 },
      ],
      "companies"
    ),
    validation(updateCompanySchema),
    updateCompany
  )
  .patch(validation(changeStateOfCompanySchema), changeStateOfCompany);
export default companyRouter;
