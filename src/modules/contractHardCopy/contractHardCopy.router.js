import { Router } from "express";
import { validation } from "../../../middleware/validation.js";

import { uploadMixFile } from "../../../middleware/fileUpload.js";
import {
  createContractHardCopySchema,
  deleteContractHardCopySchema,
  getContractHardCopySchema,
  updateContractHardCopySchema,
} from "./contractHardCopy.validation.js";
import {
  createContractHardCopy,
  deleteContractHardCopy,
  getAllContractHardCopy,
  getContractHardCopy,
  updateContractHardCopy,
} from "./contractHardCopy.controller.js";

const contractHardCopyRouter = Router();

contractHardCopyRouter
  .route("/")
  .post(
    uploadMixFile(
      [{ name: "contractHardCopyFile", maxCount: 1 }],
      "contractHardCopyFiles"
    ),
    validation(createContractHardCopySchema),
    createContractHardCopy
  )
  .get(getAllContractHardCopy);

contractHardCopyRouter
  .route("/:id")
  .get(validation(getContractHardCopySchema), getContractHardCopy)
  .delete(validation(deleteContractHardCopySchema), deleteContractHardCopy)
  .put(
    uploadMixFile(
      [{ name: "contractHardCopyFile", maxCount: 1 }],
      "contractHardCopyFiles"
    ),
    validation(updateContractHardCopySchema),
    updateContractHardCopy
  );
export default contractHardCopyRouter;
