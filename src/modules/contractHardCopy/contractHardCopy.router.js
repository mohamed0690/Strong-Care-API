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
import { authorization } from "../../../middleware/authorization.js";
import { Role } from "../../../enums/role.js";
import { authentication } from "../../../middleware/authentication.js";

const contractHardCopyRouter = Router();

contractHardCopyRouter
  .route("/")
  .post(
    authentication,
    uploadMixFile(
      [{ name: "contractHardCopyFile", maxCount: 1 }],
      "contractHardCopyFiles"
    ),
    validation(createContractHardCopySchema),
    createContractHardCopy
  )
  .get(authentication,
    authorization(Role.ADMIN), getAllContractHardCopy);

contractHardCopyRouter
  .route("/:id")
  .get(authentication,
    validation(getContractHardCopySchema), getContractHardCopy)
  .delete(authentication,
    authorization(Role.ADMIN), validation(deleteContractHardCopySchema), deleteContractHardCopy)
  .put(
    authentication,
    authorization(Role.COMPANY || Role.INDIVIDUAL),
    uploadMixFile(
      [{ name: "contractHardCopyFile", maxCount: 1 }],
      "contractHardCopyFiles"
    ),
    validation(updateContractHardCopySchema),
    updateContractHardCopy
  );
export default contractHardCopyRouter;
