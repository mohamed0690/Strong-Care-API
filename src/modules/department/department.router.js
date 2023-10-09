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

const departmentRouter = Router();

departmentRouter
  .route("/")
  .post(validation(createDepartmentSchema), createDepartment)
  .get(getAllDepartments);

departmentRouter
  .route("/:id")
  .get(validation(getDepartmentSchema), getDepartment)
  .delete(validation(deleteDepartmentSchema), deleteDepartment)
  .put(validation(updateDepartmentSchema), updateDepartment);
export default departmentRouter;
