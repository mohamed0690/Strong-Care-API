import Joi from "joi";
export const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});
export const resetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});
