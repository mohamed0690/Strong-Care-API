import Joi from "joi";

export const createOrderSchema = Joi.object({
  user: Joi.string().hex().length(24).required(),
  insuranceRequest: Joi.string().hex().length(24).required(),
  isPaid: Joi.boolean().required(),
});

export const getOrderSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
