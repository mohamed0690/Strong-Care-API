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
import { uploadMixFile } from "../../../middleware/fileUpload.js";
import { Role } from "../../../enums/role.js";
import { authorization } from "../../../middleware/authorization.js";
import { authentication } from "../../../middleware/authentication.js";

const companyRouter = Router();

companyRouter
  .route("/")
  .post(
    authentication, authorization(Role.ADMIN || Role.COMPANY),
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
  .get(authentication, authorization(Role.ADMIN || Role.REQUESTS_DEPART || Role.COMPENSATION_DEPART), getAllCompanies);

companyRouter
  .route("/:id")
  .get(authentication, authorization(Role.COMPANY, Role.ADMIN, Role.COMPENSATION_DEPART, Role.REQUESTS_DEPART), validation(getCompanySchema), getCompany)
  .delete(authentication, authorization(Role.ADMIN), validation(deleteCompanySchema), deleteCompany)
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
  .patch(authentication, authorization(Role.ADMIN), validation(changeStateOfCompanySchema), changeStateOfCompany);
export default companyRouter;
