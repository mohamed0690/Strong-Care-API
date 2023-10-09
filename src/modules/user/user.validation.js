import Joi from "joi";
import { Role } from "../../../enums/role.js";

export const createLocationSchema = Joi.object({
  street: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  postalCode: Joi.string().required(),
});

export const createUserSchema = Joi.object({
  firstName: Joi.string().min(2).max(15).required(),
  lastName: Joi.string().min(2).max(15).required(),
  email: Joi.string().email().required(),
  phone: Joi.string(),
  password: Joi.string().min(6).max(25).required(),
  required: true,
  role: Joi.string().pattern(
    new RegExp(`^${Role.COMPANY}||${Role.INDIVIDUAL}$`)
  ),

  profileImg: { url: Joi.string(), publicId: Joi.string() },
  location: createLocationSchema,
});
export const createAdminUserSchema = Joi.object({
  firstName: Joi.string().min(2).max(15).required(),
  lastName: Joi.string().min(2).max(15).required(),
  email: Joi.string().email().required(),
  phone: Joi.string(),
  password: Joi.string().min(6).max(25).required(),
  required: true,
  role: Joi.string().pattern(
    new RegExp(
      `^${Role.ADMIN}||${Role.INDIVIDUAL}||${Role.COMPANY}||${Role.COMPENSATION_DEPART}||${Role.REQUESTS_DEPART}$`
    )
  ),
  profileImg: { url: Joi.string(), publicId: Joi.string() },
  location: createLocationSchema,
});
export const getUserSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

export const updateUserSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  firstName: Joi.string().min(2).max(15).required(),
  lastName: Joi.string().min(2).max(15).required(),
  password: Joi.string().min(5).max(25),
  profileImg: { url: Joi.string(), publicId: Joi.string() },

  location: createLocationSchema,
});
export const deleteUserSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
export const changeUserPasswordSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  password: Joi.string().min(5).max(25),
});
export const changeUserPhoneSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  phone: Joi.string(),
});
