import { Router } from "express";
import { validation } from "../../../middleware/validation.js";

import { authentication } from "../../../middleware/authentication.js";
import { authorization } from "../../../middleware/authorization.js";
import { Role } from "../../../enums/role.js";
import { createContactUsSchema, deleteContactUsSchema, getContactUsSchema, updateContactUsSchema } from "./contactus.validation.js";
import { createContactUS, deleteContactUS, getContactUS, getAllContactUSs, updateContactUS } from "./contactus.controller.js";

const contactUsRouter = Router();

contactUsRouter
  .route("/")
  .post(validation(createContactUsSchema), createContactUS)
  .get(
    authentication,
    authorization(Role.ADMIN, Role.COMPENSATION_DEPART, Role.REQUESTS_DEPART),
    getAllContactUSs
  );

contactUsRouter
  .route("/:id")
  .get(authentication, authorization(Role.ADMIN, Role.COMPENSATION_DEPART, Role.REQUESTS_DEPART),
    validation(getContactUsSchema), getContactUS)
  .delete(
    authentication,
    authorization(Role.ADMIN),
    validation(deleteContactUsSchema),
    deleteContactUS
  )
  .put(
    authentication,
    authorization(Role.ADMIN),
    validation(updateContactUsSchema), updateContactUS);

export default contactUsRouter;
