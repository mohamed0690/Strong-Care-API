import { Router } from "express";
import { validation } from "../../../middleware/validation.js";
import {
  createInsuranceRequest,
  deleteInsuranceRequest,
  getAllInsuranceRequests,
  getInsuranceRequest,
  updateInsuranceRequest,
} from "./insurance.request.controller.js";
import {
  createInsuranceRequestSchema,
  deleteInsuranceRequestSchema,
  getInsuranceRequestSchema,
  updateInsuranceRequestSchema,
} from "./insurance.request.validation.js";
import { authentication } from "../../../middleware/authentication.js";
import { authorization } from "../../../middleware/authorization.js";
import { Role } from "../../../enums/role.js";

const insuranceRequestRouter = Router();

insuranceRequestRouter
  .route("/")
  .post(authentication, authorization(Role.COMPANY || Role.INDIVIDUAL), validation(createInsuranceRequestSchema), createInsuranceRequest)
  .get(authentication, authorization(Role.ADMIN || Role.REQUESTS_DEPART), getAllInsuranceRequests);

insuranceRequestRouter
  .route("/:id")
  .get(authentication, authorization(Role.COMPANY || Role.INDIVIDUAL || Role.ADMIN || Role.REQUESTS_DEPART), validation(getInsuranceRequestSchema), getInsuranceRequest)
  .delete(authentication, authorization(Role.ADMIN), validation(deleteInsuranceRequestSchema), deleteInsuranceRequest)
  .put(authentication, authorization(Role.COMPANY || Role.INDIVIDUAL), validation(updateInsuranceRequestSchema), updateInsuranceRequest);

export default insuranceRequestRouter;
