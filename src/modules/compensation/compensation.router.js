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

const compensationRouter = Router();

compensationRouter
  .route("/")
  .post(
    uploadMixFile([{ name: "malfunctionImgs", maxCount: 8 }], "compensations"),
    validation(createCompensationSchema),
    createCompensation
  )
  .get(getAllCompensations);

compensationRouter
  .route("/:id")
  .get(validation(getCompensationSchema), getCompensation)
  .delete(validation(deleteCompensationSchema), deleteCompensation)
  .put(
    uploadMixFile([{ name: "malfunctionImgs", maxCount: 8 }], "compensations"),
    validation(updateCompensationSchema),
    updateCompensation
  );

export default compensationRouter;
