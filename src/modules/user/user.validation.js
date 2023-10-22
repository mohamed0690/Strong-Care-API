import Joi from "joi";
import { Role } from "../../../enums/role.js";

export const createUserSchema = Joi.object({
  firstName: Joi.string().trim().min(2).required(),
  lastName: Joi.string().trim().min(2).required(),
  email: Joi.string().required().email(),
  phone: Joi.string().required(),
  password: Joi.string().required().min(8),
  verified: Joi.boolean().default(false),
  verifiedEmail: Joi.boolean().default(false),
  verifiedPhone: Joi.boolean().default(false),
  profileImg: Joi.object({
    url: Joi.string()
      .uri({ scheme: ["http", "https"] })
      .required()
      .description("URL of the profile image"),
    publicId: Joi.string()
      .required()
      .description("Public ID associated with the profile image"),
  }),
  role: Joi.string().valid(Role.COMPANY, Role.INDIVIDUAL).required(),
  latitude: Joi.string()
    .required()
    .custom((value, helpers) => {
      const latitude = parseFloat(value);
      if (isNaN(latitude) || latitude < -90 || latitude > 90) {
        return helpers.error(
          "Latitude must be a valid number between -90 and 90."
        );
      }
      return latitude;
    }),
  longitude: Joi.string()
    .required()
    .custom((value, helpers) => {
      const longitude = parseFloat(value);
      if (isNaN(longitude) || longitude < -180 || longitude > 180) {
        return helpers.error(
          "Longitude must be a valid number between -180 and 180."
        );
      }
      return longitude;
    }),
});

export const createAdminUserSchema = Joi.object({
  firstName: Joi.string().trim().min(2).required(),
  lastName: Joi.string().trim().min(2).required(),
  email: Joi.string().required().email(),
  phone: Joi.string().required(),
  password: Joi.string().required().min(8),
  verified: Joi.boolean().default(false),
  verifiedEmail: Joi.boolean().default(false),
  verifiedPhone: Joi.boolean().default(false),
  role: Joi.string()
    .valid(...Object.values(Role))
    .required(),

  profileImg: Joi.object({
    url: Joi.string()
      .uri({ scheme: ["http", "https"] })
      .required()
      .description("URL of the profile image"),
    publicId: Joi.string()
      .required()
      .description("Public ID associated with the profile image"),
  }),
  latitude: Joi.string()
    .required()
    .custom((value, helpers) => {
      const latitude = parseFloat(value);
      if (isNaN(latitude) || latitude < -90 || latitude > 90) {
        return helpers.error(
          "Latitude must be a valid number between -90 and 90."
        );
      }
      return latitude;
    }),
  longitude: Joi.string()
    .required()
    .custom((value, helpers) => {
      const longitude = parseFloat(value);
      if (isNaN(longitude) || longitude < -180 || longitude > 180) {
        return helpers.error(
          "Longitude must be a valid number between -180 and 180."
        );
      }
      return longitude;
    }),
});

export const getUserSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

export const updateUserSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  firstName: Joi.string().trim().min(2),
  lastName: Joi.string().trim().min(2),
  role: Joi.string().valid(Role.ADMIN, Role.COMPENSATION_DEPART, Role.REQUESTS_DEPART),

  latitude: Joi.string()
    .custom((value, helpers) => {
      const latitude = parseFloat(value);
      if (isNaN(latitude) || latitude < -90 || latitude > 90) {
        return helpers.error(
          "Latitude must be a valid number between -90 and 90."
        );
      }
      return latitude;
    }),
  longitude: Joi.string()
    .custom((value, helpers) => {
      const longitude = parseFloat(value);
      if (isNaN(longitude) || longitude < -180 || longitude > 180) {
        return helpers.error(
          "Longitude must be a valid number between -180 and 180."
        );
      }
      return longitude;
    }),
  profileImg: Joi.object({
    url: Joi.string()
      .uri({ scheme: ["http", "https"] })
      .required()
      .description("URL of the profile image"),
    publicId: Joi.string()
      .required()
      .description("Public ID associated with the profile image"),
  }),
});

export const deleteUserSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

export const changeUserPasswordSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  password: Joi.string().required().min(8),
});

export const changeUserPhoneSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  phone: Joi.string().required(),
});
