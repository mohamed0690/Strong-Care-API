import { Router } from "express";
import { validation } from "../../../middleware/validation.js";
import {
  createIndividualSchema,
  deleteIndividualSchema,
  getIndividualSchema,
  updateIndividualSchema,
} from "./individual.validation.js";
import {
  createIndividual,
  deleteIndividual,
  getAllIndividuals,
  getIndividual,
  updateIndividual,
} from "./individual.controller.js";
import { uploadMixFile } from "../../../middleware/fileUpload.js";
import { authentication } from "../../../middleware/authentication.js";
import { authorization } from "../../../middleware/authorization.js";
import { Role } from "../../../enums/role.js";

const individualRouter = Router();

individualRouter
  .route("/")
  .post(
    uploadMixFile(
      [
        { name: "identityImg", maxCount: 1 },
        { name: "forwardDeviceImg", maxCount: 1 },
        { name: "backwardDeviceImg", maxCount: 1 },
        { name: "batteryPercentageDeviceImg", maxCount: 1 },
        { name: "deviceScreenImg", maxCount: 1 },
        { name: "shopInvoiceImg", maxCount: 1 },
      ],
      "individual"
    ),
    validation(createIndividualSchema),
    createIndividual
  )
  .get(authentication, authorization(Role.ADMIN || Role.REQUESTS_DEPART || Role.COMPENSATION_DEPART), getAllIndividuals);

individualRouter
  .route("/:id")
  .get(authentication, validation(getIndividualSchema), getIndividual)
  .delete(authentication, authorization(Role.ADMIN), validation(deleteIndividualSchema), deleteIndividual)
  .put(
    authentication, authorization(Role.ADMIN || Role.COMPENSATION_DEPART),
    uploadMixFile(
      [
        { name: "identityImg", maxCount: 1 },
        { name: "forwardDeviceImg", maxCount: 1 },
        { name: "backwardDeviceImg", maxCount: 1 },
        { name: "batteryPercentageDeviceImg", maxCount: 1 },
        { name: "deviceScreenImg", maxCount: 1 },
        { name: "shopInvoiceImg", maxCount: 1 },
      ],
      "individual"
    ),
    validation(updateIndividualSchema),
    updateIndividual
  );

export default individualRouter;
