import Joi from "joi";
import { InsuranceDuration } from "../../../enums/insuranceDuration.js";

export const createInsuranceRequestSchema = Joi.object({
  clientName: Joi.string()
    .required()
    .min(3)
    .description("Client name is required."),
  deviceBrand: Joi.string()
    .min(3)
    .required()
    .description("Device brand is required."),
  deviceColor: Joi.string()
    .min(3)
    .required()
    .description("Device color is required."),
  serialNo: Joi.string()
    .regex(/^[A-Za-z0-9]{8,15}$/)
    .required()
    .description("Valid serial number is required."),
  clientPhone: Joi.string()
    .required()
    .description("Client phone number is required."),
  insuranceDuration: Joi.string()
    .valid(...Object.values(InsuranceDuration))
    .required()
    .description("Insurance duration is required."),

  company: Joi.string()
    .hex()
    .length(24)
    .required()
    .description("Company is required."),
  deviceType: Joi.string()
    .required()
    .min(3)
    .description("Device type is required."),
  clientEmail: Joi.string().email().description("Client email"),
});

export const getInsuranceRequestSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

export const updateInsuranceRequestSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  clientName: Joi.string()
    .required()
    .min(3)
    .description("Client name is required."),
  deviceBrand: Joi.string()
    .min(3)
    .required()
    .description("Device brand is required."),
  deviceColor: Joi.string()
    .min(3)
    .required()
    .description("Device color is required."),
  serialNo: Joi.string()
    .regex(/^[A-Za-z0-9]{8,15}$/)
    .required()
    .description("Valid serial number is required."),
  clientPhone: Joi.string()
    .required()
    .description("Client phone number is required."),
  insuranceDuration: Joi.string()
    .valid(...Object.values(InsuranceDuration))
    .required()
    .description("Insurance duration is required."),

  company: Joi.string()
    .hex()
    .length(24)
    .required()
    .description("Company is required."),
  deviceType: Joi.string()
    .required()
    .min(3)
    .description("Device type is required."),
  clientEmail: Joi.string().email().description("Client email"),
});

export const deleteInsuranceRequestSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
