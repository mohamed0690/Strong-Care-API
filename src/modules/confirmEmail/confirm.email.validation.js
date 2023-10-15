import Joi from "joi";

export const confirmEmailSchema = Joi.object({
  token: Joi.string().token().required(),
});
