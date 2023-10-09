import { Router } from "express";
import { resetPassword, signIn } from "./auth.controller.js";
import { resetPasswordSchema, signInSchema } from "./auth.validation.js";
import { validation } from "../../../middleware/validation.js";

const authRouter = Router();

authRouter.route("/signin").post(validation(signInSchema), signIn);
authRouter
  .route("/resetpassword")
  .patch(validation(resetPasswordSchema), resetPassword);

export default authRouter;
