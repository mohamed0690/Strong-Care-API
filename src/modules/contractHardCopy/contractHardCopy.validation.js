import Joi from "joi";

export const createContractHardCopySchema = Joi.object({
  company: Joi.string().hex().length(24).required().description("Company ID"),
  contractHardCopyFile: Joi.object({
    url: Joi.string()
      .uri({ scheme: ["http", "https"] })
      .required()
      .description("URL of the contract HardCopy pdf File"),
    publicId: Joi.string()
      .required()
      .description("Public ID associated with the contract HardCopy pdf File"),
  }),
});
export const getContractHardCopySchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
export const updateContractHardCopySchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  company: Joi.string().hex().length(24).required(),
  contractHardCopyFile: Joi.object({
    url: Joi.string()
      .uri({ scheme: ["http", "https"] })
      .required()
      .description("URL of the contract HardCopy pdf File"),
    publicId: Joi.string()
      .required()
      .description("Public ID associated with the contract HardCopy pdf File"),
  }),
});
export const deleteContractHardCopySchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
