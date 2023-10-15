import { Router } from "express";
import { validation } from "../../../middleware/validation.js";
import {
  createDepartmentSchema,
  deleteDepartmentSchema,
  getDepartmentSchema,
  updateDepartmentSchema,
} from "./department.validation.js";
import {
  createDepartment,
  deleteDepartment,
  getAllDepartments,
  getDepartment,
  updateDepartment,
} from "./department.controller.js";
import { authentication } from "../../../middleware/authentication.js";
import { authorization } from "../../../middleware/authorization.js";
import { Role } from "../../../enums/role.js";

const departmentRouter = Router();

departmentRouter
  .route("/")
  .post(authentication, authorization(Role.ADMIN), validation(createDepartmentSchema), createDepartment)
  .get(authentication, authorization(Role.ADMIN), getAllDepartments);

departmentRouter
  .route("/:id")
  .get(authentication, authorization(Role.ADMIN), validation(getDepartmentSchema), getDepartment)
  .delete(authentication, authorization(Role.ADMIN), validation(deleteDepartmentSchema), deleteDepartment)
  .put(authentication, authorization(Role.ADMIN), validation(updateDepartmentSchema), updateDepartment);
export default departmentRouter;
