import Joi from "joi";
import { InsuranceDuration } from "../../../enums/insuranceDuration.js";

export const createInsuranceRequestSchema = Joi.object({
  clientName: Joi.string().required(),
  deviceBrand: Joi.string().required(),
  deviceColor: Joi.string().required(),
  serialNo: Joi.string().required(),
  clientPhone: Joi.string().required(),
  insuranceDuration: Joi.string()
    .pattern(new RegExp(`^${InsuranceDuration.ONE}||${InsuranceDuration.TWO}$`))
    .required(),
  company: Joi.string().hex().length(24).required(),
  deviceType: Joi.string().required(),
  clientEmail: Joi.string().email(),
});

export const getInsuranceRequestSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

export const updateInsuranceRequestSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  clientName: Joi.string().required(),
  deviceBrand: Joi.string().required(),
  deviceColor: Joi.string().required(),
  serialNo: Joi.string().required(),
  clientPhone: Joi.string().required(),
  insuranceDuration: Joi.string()
    .pattern(new RegExp(`^${InsuranceDuration.ONE}||${InsuranceDuration.TWO}$`))
    .required(),
  deviceType: Joi.string().required(),
  clientEmail: Joi.string().email(),
  company: Joi.string().hex().length(24).required(),
});

export const deleteInsuranceRequestSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
