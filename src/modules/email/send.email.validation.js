import Joi from "joi";

export const confirmEmailSchema = Joi.object({
  token: Joi.string().required(),
});
export const sendEmailSchema = Joi.object({
  to: Joi.string().email().required(),
  subject: Joi.string().required(),
  message: Joi.string().required(),
});
