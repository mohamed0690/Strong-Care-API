import { HttpStatus } from "../../enums/httpStatus.js";
import { AppError } from "../../utils/appError.js";
import confirmEmailRouter from "./confirmEmail/confirm.email.router.js";
import userRouter from "./user/user.router.js";
import authRouter from "./auth/auth.router.js";
import companyRouter from "./company/company.router.js";
import departmentRouter from "./department/department.router.js";
import individualRouter from "./individual/individual.router.js";
import insuranceRequestRouter from "./insuranceRequest/insurance.request.router.js";
import compensationRouter from "./compensation/compensation.router.js";
import contractHardCopyRouter from "./contractHardCopy/contractHardCopy.router.js";

export function init(app) {
  app.use("/api/v1/confirmEmail", confirmEmailRouter);
  app.use("/api/v1/users/department", departmentRouter);
  app.use("/api/v1/users/individual", individualRouter);
  app.use("/api/v1/insuranceRequest", insuranceRequestRouter);
  app.use("/api/v1/compensation", compensationRouter);
  app.use("/api/v1/users/company/contract", contractHardCopyRouter);
  app.use("/api/v1/users/company", companyRouter);
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/users", userRouter);

  app.all("*", (req, res, next) => {
    next(
      new AppError(
        `can't find this route ${req.originalUrl}`,
        HttpStatus.NotFound
      )
    );
  });
}
