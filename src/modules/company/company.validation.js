import Joi from "joi";
import { State } from "../../../enums/State.js";
export const createCompanySchema = Joi.object({
  country: Joi.string()
    .required()
    .description("Country is required."),
  noCommercialRegister: Joi.string()
    .required()
    .description("Commercial register is required."),
  legalName: Joi.string().required().description("Legal name is required."),
  legalLocation: Joi.string()
    .required()
    .description("Legal location is required."),

  commercialRegisterImg: Joi.object({
    url: Joi.string().required().description("Commercial Register Image URL"),
    publicId: Joi.string()
      .required()
      .description("Commercial Register Image Public ID"),
  }).description("Commercial Register Image"),
  identityImg: Joi.object({
    url: Joi.string().required().description("Identity Image URL"),
    publicId: Joi.string().required().description("Identity Image Public ID"),
  }).description("Identity Image"),

  commission: Joi.number().required().description("Commission is required."),
  user: Joi.string(),
});
export const getCompanySchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
export const updateCompanySchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  country: Joi.string()
    .required()
    .description("Country is required."),
  id: Joi.string().hex().length(24).required(),
  country: Joi.string()
    .required()
    .description("Country is required."),
  noCommercialRegister: Joi.string()
    .required()
    .description("Commercial register is required."),
  legalName: Joi.string().required().description("Legal name is required."),
  legalLocation: Joi.string()
    .required()
    .description("Legal location is required."),

  commercialRegisterImg: Joi.object({
    url: Joi.string().required().description("Commercial Register Image URL"),
    publicId: Joi.string()
      .required()
      .description("Commercial Register Image Public ID"),
  }).description("Commercial Register Image"),
  identityImg: Joi.object({
    url: Joi.string().required().description("Identity Image URL"),
    publicId: Joi.string().required().description("Identity Image Public ID"),
  }).description("Identity Image"),
  commission: Joi.number().required().description("Commission is required."),
});

export const deleteCompanySchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

export const changeStateOfCompanySchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  state: Joi.string()
    .valid(...Object.values(State))
    .default(State.PENDING)
    .required()
    .description(
      "State is required and should be one of the valid State values."
    ),
});
