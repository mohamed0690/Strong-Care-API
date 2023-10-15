import Joi from "joi";

export const createOrderSchema = Joi.object({
  user: Joi.string()
    .hex()
    .length(24)
    .required()
    .description("User is required."),
  insuranceRequest: Joi.string()
    .hex()
    .length(24)
    .required()
    .description("Insurance request is required."),
  isPaid: Joi.boolean()
    .required()
    .description("Payment status is required.")
    .default(false),
});

export const getOrderSchema = Joi.object({
  id: Joi.string().hex().length(24).required().description("User is required."),
});
