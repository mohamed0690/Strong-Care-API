const userRouter = Router();

userRouter
  .route("/")
  .post(
    uploadMixFile([{ name: "profileImg", maxCount: 1 }], "users"),
    validation(createUserSchema),
    createUser
  )
  .get(
    // authentication,
    //  authorization(Role.ADMIN),
    getAllUsers
  );
userRouter.route("/addAdmin").post(
  // authentication,
  // authorization(Role.ADMIN),
  uploadMixFile([{ name: "profileImg", maxCount: 1 }], "users"),
  validation(createAdminUserSchema),
  createUser
);

userRouter
  .route("/:id")
  .get(
    // authentication,
    // authorization(Role.ADMIN, Role.COMPENSATION_DEPART, Role.REQUESTS_DEPART),
    validation(getUserSchema),
    getUser
  )
  .delete(
    // authentication,
    // authorization(Role.ADMIN),
    validation(deleteUserSchema),
    deleteUser
  )
  .put(
    // authentication,
    // uploadSingleFile("profileImg", "users"),

    uploadMixFile([{ name: "profileImg", maxCount: 1 }], "users"),
    validation(updateUserSchema),
    updateUser
  )
  .patch(
    // authentication,
    validation(changeUserPasswordSchema),
    changeUserPassword
  );

userRouter.route("/changePhone/:id").patch(
  // authentication,
  validation(changeUserPhoneSchema),
  changeUserPhone
);

export default userRouter;
