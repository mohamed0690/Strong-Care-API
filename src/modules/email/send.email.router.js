import { Router } from "express";
import { confirmEmail, sendFullEmail } from "./send.email.controller.js";
import { confirmEmailSchema, sendEmailSchema } from "./send.email.validation.js";
import { validation } from "../../../middleware/validation.js";
import { authentication } from "../../../middleware/authentication.js";
import { authorization } from "../../../middleware/authorization.js";
import { Role } from "../../../enums/role.js";

const emailRouter = Router();


emailRouter
  .route("/")
  .post(authentication, authorization(Role.ADMIN, Role.COMPENSATION_DEPART, Role.REQUESTS_DEPART), validation(sendEmailSchema), sendFullEmail);

emailRouter
  .route("/:token")
  .get(validation(confirmEmailSchema), confirmEmail);

export default emailRouter;
