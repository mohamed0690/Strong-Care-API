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

const insuranceRequestRouter = Router();

insuranceRequestRouter
  .route("/")
  .post(validation(createInsuranceRequestSchema), createInsuranceRequest)
  .get(getAllInsuranceRequests);

insuranceRequestRouter
  .route("/:id")
  .get(validation(getInsuranceRequestSchema), getInsuranceRequest)
  .delete(validation(deleteInsuranceRequestSchema), deleteInsuranceRequest)
  .put(validation(updateInsuranceRequestSchema), updateInsuranceRequest);

export default insuranceRequestRouter;
