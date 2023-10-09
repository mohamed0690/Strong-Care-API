import { Router } from "express";
import { confirmEmail } from "./confirm.email.controller.js";
import { confirmEmailSchema } from "./confirm.email.validation.js";
import { validation } from "../../../middleware/validation.js";

const confirmEmailRouter = Router();

confirmEmailRouter
  .route("/:token")
  .get(validation(confirmEmailSchema), confirmEmail);

export default confirmEmailRouter;
