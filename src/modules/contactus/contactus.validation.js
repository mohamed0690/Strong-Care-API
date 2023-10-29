import Joi from "joi";

export const createContactUsSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .required()
    .description('Name must be a string, at least 2 characters long'),

  email: Joi.string()
    .email()
    .required()
    .description('Email must be a valid email address'),

  phone: Joi.string()
    .required()
    .description('Phone must be a string'),

  message: Joi.string()
    .min(15)
    .required()
    .description('Description should be at least 15 characters long'),
});



export const getContactUsSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

export const updateContactUsSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  name: Joi.string()
    .trim()
    .min(2)
    .required()
    .description('Name must be a string, at least 2 characters long'),

  email: Joi.string()
    .email()
    .required()
    .description('Email must be a valid email address'),

  phone: Joi.string()
    .required()
    .description('Phone must be a string'),

  message: Joi.string()
    .min(15)
    .required()
    .description('Description should be at least 15 characters long'),
});

export const deleteContactUsSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
