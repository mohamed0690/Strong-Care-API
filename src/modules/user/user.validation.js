import Joi from "joi";
import { Role } from "../../../enums/role.js";

export const createUserSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .min(2)
    .required()
    .error(
      new Error(
        "First name is too short (minimum length is 2 characters) or required."
      )
    ),
  lastName: Joi.string()
    .trim()
    .min(2)
    .required()
    .error(
      new Error(
        "Last name is too short (minimum length is 2 characters) or required."
      )
    ),
  email: Joi.string()
    .required()
    .email()
    .error(new Error("Invalid email format or email is required.")),
  phone: Joi.string().required().error(new Error("Phone number is required.")),
  password: Joi.string()
    .required()
    .min(8)
    .error(
      new Error(
        "Password is too short (minimum length is 8 characters) or required."
      )
    ),
  role: Joi.string()
    .valid(Role.COMPANY || Role.INDIVIDUAL)
    .required()
    .error(
      new Error("Role is required and must be one of: Company Or Individual")
    ),
  latitude: Joi.string()
    .required()
    .custom((value, helpers) => {
      const latitude = parseFloat(value);
      if (isNaN(latitude) || latitude < -90 || latitude > 90) {
        return helpers.error(
          new Error("Latitude must be a valid number between -90 and 90.")
        );
      }
      return latitude;
    })
    .error(
      new Error(
        "Latitude is required and must be a valid number between -90 and 90."
      )
    ),

  longitude: Joi.string()
    .required()
    .custom((value, helpers) => {
      const longitude = parseFloat(value);
      if (isNaN(longitude) || longitude < -180 || longitude > 180) {
        return helpers.error(
          new Error("Longitude must be a valid number between -180 and 180.")
        );
      }
      return longitude;
    })
    .error(
      new Error(
        "Longitude is required and must be a valid number between -180 and 180."
      )
    ),
});
export const createAdminUserSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .min(2)
    .required()
    .error(
      new Error(
        "First name is too short (minimum length is 2 characters) or required."
      )
    ),
  lastName: Joi.string()
    .trim()
    .min(2)
    .required()
    .error(
      new Error(
        "Last name is too short (minimum length is 2 characters) or required."
      )
    ),
  email: Joi.string()
    .required()
    .email()
    .error(new Error("Invalid email format or email is required.")),
  phone: Joi.string().required().error(new Error("Phone number is required.")),
  password: Joi.string()
    .required()
    .min(8)
    .error(
      new Error(
        "Password is too short (minimum length is 8 characters) or required."
      )
    ),
  role: Joi.string()
    .valid(...Object.values(Role))
    .required()
    .error(
      new Error(
        "Role is required and must be one of: " + Object.values(Role).join(", ")
      )
    ),

  latitude: Joi.string()
    .required()
    .custom((value, helpers) => {
      const latitude = parseFloat(value);
      if (isNaN(latitude) || latitude < -90 || latitude > 90) {
        return helpers.error(
          new Error("Latitude must be a valid number between -90 and 90.")
        );
      }
      return latitude;
    })
    .error(
      new Error(
        "Latitude is required and must be a valid number between -90 and 90."
      )
    ),

  longitude: Joi.string()
    .required()
    .custom((value, helpers) => {
      const longitude = parseFloat(value);
      if (isNaN(longitude) || longitude < -180 || longitude > 180) {
        return helpers.error(
          new Error("Longitude must be a valid number between -180 and 180.")
        );
      }
      return longitude;
    })
    .error(
      new Error(
        "Longitude is required and must be a valid number between -180 and 180."
      )
    ),
});
export const getUserSchema = Joi.object({
  id: Joi.string()
    .hex()
    .length(24)
    .required()
    .error(new Error("userId is required.")),
});

export const updateUserSchema = Joi.object({
  id: Joi.string()
    .hex()
    .length(24)
    .required()
    .error(new Error("userId is required.")),

  firstName: Joi.string()
    .trim()
    .min(2)
    .required()
    .error(
      new Error(
        "First name is too short (minimum length is 2 characters) or required."
      )
    ),
  lastName: Joi.string()
    .trim()
    .min(2)
    .required()
    .error(
      new Error(
        "Last name is too short (minimum length is 2 characters) or required."
      )
    ),
  latitude: Joi.string()
    .required()
    .custom((value, helpers) => {
      const latitude = parseFloat(value);
      if (isNaN(latitude) || latitude < -90 || latitude > 90) {
        return helpers.error(
          new Error("Latitude must be a valid number between -90 and 90.")
        );
      }
      return latitude;
    })
    .error(
      new Error(
        "Latitude is required and must be a valid number between -90 and 90."
      )
    ),

  longitude: Joi.string()
    .required()
    .custom((value, helpers) => {
      const longitude = parseFloat(value);
      if (isNaN(longitude) || longitude < -180 || longitude > 180) {
        return helpers.error(
          new Error("Longitude must be a valid number between -180 and 180.")
        );
      }
      return longitude;
    })
    .error(
      new Error(
        "Longitude is required and must be a valid number between -180 and 180."
      )
    ),
});
export const deleteUserSchema = Joi.object({
  id: Joi.string()
    .hex()
    .length(24)
    .required()
    .error(new Error("userId is required.")),
});
export const changeUserPasswordSchema = Joi.object({
  id: Joi.string()
    .hex()
    .length(24)
    .required()
    .error(new Error("userId is required.")),
  password: Joi.string()
    .required()
    .min(8)
    .error(
      new Error(
        "Password is too short (minimum length is 8 characters) or required."
      )
    ),
});
export const changeUserPhoneSchema = Joi.object({
  id: Joi.string()
    .hex()
    .length(24)
    .required()
    .error(new Error("userId is required.")),
  phone: Joi.string().required().error(new Error("Phone number is required.")),
});
