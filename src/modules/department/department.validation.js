import Joi from "joi";
import { Department } from "../../../enums/department.js";

export const createDepartmentSchema = Joi.object({
  user: Joi.string().hex().length(24).required(),
  name: Joi.string().pattern(
    new RegExp(`^${Department.INSURANCE_REQUEST}||${Department.COMPENSATION}$`)
  ),
});
export const getDepartmentSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
export const updateDepartmentSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  name: Joi.string().pattern(
    new RegExp(`^${Department.INSURANCE_REQUEST}||${Department.COMPENSATION}$`)
  ),
});
export const deleteDepartmentSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
