import Joi from "joi";

export const createCompensationSchema = Joi.object({
  descMalfunction: Joi.string().required(),
  malfunctionImgs: Joi.array(),
  InsuranceRequestNo: Joi.string().required(),
});
export const getCompensationSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
export const updateCompensationSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  descMalfunction: Joi.string(),
  malfunctionImgs: Joi.array(),
});
export const deleteCompensationSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
