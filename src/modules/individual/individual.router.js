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
  .get(getAllIndividuals);

individualRouter
  .route("/:id")
  .get(validation(getIndividualSchema), getIndividual)
  .delete(validation(deleteIndividualSchema), deleteIndividual)
  .put(
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
