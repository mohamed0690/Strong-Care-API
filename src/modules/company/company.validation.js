import Joi from "joi";
import { State } from "../../../enums/State.js";
export const createCompanySchema = Joi.object({
  country: Joi.string().required(),
  noCommercialRegister: Joi.string().required(),
  legalName: Joi.string().required(),
  legalLocation: Joi.object({}),
  commercialRegisterImg: { url: Joi.string(), publicId: Joi.string() },
  identityImg: { url: Joi.string(), publicId: Joi.string() },
  commission: Joi.string().required(),
  user: Joi.string(),
});
export const getCompanySchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
export const updateCompanySchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  country: Joi.string().required(),
  id: Joi.string().hex().length(24).required(),
  country: Joi.string().required(),
  noCommercialRegister: Joi.string().required(),
  legalName: Joi.string().required(),
  legalLocation: Joi.object({}),
  commercialRegisterImg: { url: Joi.string(), publicId: Joi.string() },
  identityImg: { url: Joi.string(), publicId: Joi.string() },
  commission: Joi.string().required(),
});
export const deleteCompanySchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
export const changeStateOfCompanySchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  state: Joi.string().pattern(
    new RegExp(`^${State.APPROVED}||${State.REJECTED}$`)
  ),
});
