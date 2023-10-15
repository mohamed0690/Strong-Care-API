import Joi from "joi";
import { Department } from "../../../enums/department.js";

export const createDepartmentSchema = Joi.object({
  user: Joi.string().hex().length(24).required().description("User ID"),
  name: Joi.string()
    .valid(...Object.values(Department))
    .required(),
});
export const getDepartmentSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
export const updateDepartmentSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  name: Joi.string()
    .valid(...Object.values(Department))
    .required(),
});
export const deleteDepartmentSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
