import { Router } from "express";
import { validation } from "../../../middleware/validation.js";
import {
  changeUserPassword,
  changeUserPhone,
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "./user.controller.js";
import {
  changeUserPasswordSchema,
  changeUserPhoneSchema,
  createAdminUserSchema,
  createUserSchema,
  deleteUserSchema,
  getUserSchema,
  updateUserSchema,
} from "./user.validation.js";
import { authentication } from "../../../middleware/authentication.js";
import { authorization } from "../../../middleware/authorization.js";
import { Role } from "../../../enums/role.js";
import { uploadMixFile } from "../../../middleware/fileUpload.js";

const userRouter = Router();

userRouter
  .route("/")
  .post(
    authentication,
    authorization(Role.ADMIN),
    uploadMixFile([{ name: "profileImg", maxCount: 1 }], "users"),
    validation(createUserSchema),
    createUser
  )
  .get(authentication, authorization(Role.ADMIN), getAllUsers);
userRouter
  .route("/addAdmin")
  .post(
    authentication,
    authorization(Role.ADMIN),
    uploadMixFile([{ name: "profileImg", maxCount: 1 }], "users"),
    validation(createAdminUserSchema),
    createUser
  );

userRouter
  .route("/:id")
  .get(authentication, validation(getUserSchema), getUser)
  .delete(
    authentication,
    authorization(Role.ADMIN),
    validation(deleteUserSchema),
    deleteUser
  )
  .put(
    authentication,
    uploadMixFile([{ name: "profileImg", maxCount: 1 }], "users"),
    validation(updateUserSchema),
    updateUser
  )
  .patch(
    authentication,
    validation(changeUserPasswordSchema),
    changeUserPassword
  );

userRouter
  .route("/changePhone/:id")
  .patch(authentication, validation(changeUserPhoneSchema), changeUserPhone);

export default userRouter;
