import { Router } from "express";
import { validation } from "../../../middleware/validation.js";
import {
  createCompensationSchema,
  deleteCompensationSchema,
  getCompensationSchema,
  updateCompensationSchema,
} from "./compensation.validation.js";
import {
  createCompensation,
  deleteCompensation,
  getAllCompensations,
  getCompensation,
  updateCompensation,
} from "./compensation.controller.js";
import { uploadMixFile } from "../../../middleware/fileUpload.js";
import { authentication } from '../../../middleware/authentication.js';
import { authorization } from '../../../middleware/authorization.js';
import { Role } from "../../../enums/role.js";

const compensationRouter = Router();

compensationRouter
  .route("/")
  .post(
    uploadMixFile([{ name: "malfunctionImgs", maxCount: 8 }], "compensations"),
    validation(createCompensationSchema),
    createCompensation
  )
  .get(authentication, authorization(Role.ADMIN || Role.COMPENSATION_DEPART), getAllCompensations);

compensationRouter
  .route("/:id")
  .get(authentication, authorization(Role.ADMIN || Role.COMPANY || Role.INDIVIDUAL || Role.COMPENSATION_DEPART), validation(getCompensationSchema), getCompensation)
  .delete(authentication, authorization(Role.ADMIN), validation(deleteCompensationSchema), deleteCompensation)
  .put(
    authentication, authorization(Role.ADMIN),
    uploadMixFile([{ name: "malfunctionImgs", maxCount: 8 }], "compensations"),
    validation(updateCompensationSchema),
    updateCompensation
  );

export default compensationRouter;
