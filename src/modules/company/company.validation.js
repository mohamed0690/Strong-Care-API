import Joi from "joi";
import { State } from "../../../enums/State.js";
export const createCompanySchema = Joi.object({
  country: Joi.string().required().description("Country is required."),
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
  id: Joi.string().hex().required().length(24),
  country: Joi.string()
    .description("Country is required."),

  noCommercialRegister: Joi.string()
    .description("Commercial register is required."),
  legalName: Joi.string().description("Legal name is required."),
  legalLocation: Joi.string()
    .description("Legal location is required."),

  commercialRegisterImg: Joi.object({
    url: Joi.string().description("Commercial Register Image URL"),
    publicId: Joi.string()
      .description("Commercial Register Image Public ID"),
  }).description("Commercial Register Image"),
  identityImg: Joi.object({
    url: Joi.string().description("Identity Image URL"),
    publicId: Joi.string().description("Identity Image Public ID"),
  }).description("Identity Image"),
  commission: Joi.number().description("Commission is required."),
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