import Joi from "joi";

export const createCompensationSchema = Joi.object({
  descMalfunction: Joi.string()
    .min(30)
    .required()
    .description("description malfunction must be more than 30 characters."),
  malfunctionImgs: Joi.array()
    .items(
      Joi.object({
        url: Joi.string().required().description("Image URL"),
        publicId: Joi.string().required().description("Image Public ID"),
      })
    )
    .description("Array of malfunction images"),

  InsuranceRequestNo: Joi.string()
    .required()
    .min(10)
    .max(10)
    .description("Insurance request identification must be 10 characters."),
});
export const getCompensationSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
export const updateCompensationSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  descMalfunction: Joi.string()
    .min(30)
    .required()
    .description("description malfunction must be more than 30 characters."),
  malfunctionImgs: Joi.array()
    .items(
      Joi.object({
        url: Joi.string().required().description("Image URL"),
        publicId: Joi.string().required().description("Image Public ID"),
      })
    )
    .description("Array of malfunction images"),
});
export const deleteCompensationSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
