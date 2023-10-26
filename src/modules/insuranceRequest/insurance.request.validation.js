import Joi from "joi";
import { InsuranceDuration } from "../../../enums/insuranceDuration.js";
import { State } from "../../../enums/State.js";

export const createInsuranceRequestSchema = Joi.object({
  clientName: Joi.string()
    .required()
    .min(3)
    .description("Client name is required."),
  deviceBrand: Joi.string()
    .min(3)
    .required()
    .description("Device brand is required."),
  deviceModel: Joi.string()
    .min(3)
    .required()
    .description("Device Model is required."),
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
  deviceModel: Joi.string()
    .min(3)
    .required()
    .description("Device Model is required."),
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


export const getInsuranceRequestByInsuranceNoSchema = Joi.object({
  insuranceNo: Joi.string().length(10).required(),
})

export const changeStateOfInsuranceRequestSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  state: Joi.string()
    .valid(...Object.values(State))
    .default(State.PENDING)
    .required()
    .description(
      "State is required and should be one of the valid State values."
    ),
  to: Joi.string().email().required(),
  subject: Joi.string().required(),
  message: Joi.string().required(),
  fileLink: Joi.string(),
}).when(Joi.object({
  state: Joi.string().valid('approved').required()
}), {
  then: Joi.object({
    fileLink: Joi.string().required()
  }),
  otherwise: Joi.object({
    fileLink: Joi.string()
  })
});
