import Joi from "joi";

export const createContractHardCopySchema = Joi.object({
  company: Joi.string().hex().length(24).required(),
  contractHardCopyFile: { url: Joi.string(), publicId: Joi.string() },
});
export const getContractHardCopySchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
export const updateContractHardCopySchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  company: Joi.string().hex().length(24).required(),
  contractHardCopyFile: { url: Joi.string(), publicId: Joi.string() },
});
export const deleteContractHardCopySchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
