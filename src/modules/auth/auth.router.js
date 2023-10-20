import { Router } from "express";
import { loginUserDate, resetPassword, signIn, signUp } from "./auth.controller.js";
import { loginUserDateSchema, resetPasswordSchema, signInSchema } from "./auth.validation.js";
import { validation } from "../../../middleware/validation.js";
import { uploadMixFile } from "../../../middleware/fileUpload.js";
import { createUserSchema } from "../user/user.validation.js";

const authRouter = Router();
authRouter.route("/loggeduserdata/:id").get(validation(loginUserDateSchema), loginUserDate
)
authRouter.route("/signin").post(validation(signInSchema), signIn);
authRouter.route("/signup")
  .post(
    uploadMixFile([{ name: "profileImg", maxCount: 1 }], "users"),
    validation(createUserSchema),
    signUp
  );


authRouter
  .route("/resetpassword")
  .patch(validation(resetPasswordSchema), resetPassword);


export default authRouter;
