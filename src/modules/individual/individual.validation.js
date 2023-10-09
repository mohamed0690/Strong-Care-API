import Joi from "joi";
export const createIndividualSchema = Joi.object({
  identityImg: { url: Joi.string(), publicId: Joi.string() },
  forwardDeviceImg: { url: Joi.string(), publicId: Joi.string() },
  backwardDeviceImg: { url: Joi.string(), publicId: Joi.string() },
  batteryPercentageDeviceImg: { url: Joi.string(), publicId: Joi.string() },
  deviceScreenImg: { url: Joi.string(), publicId: Joi.string() },
  shopInvoiceImg: { url: Joi.string(), publicId: Joi.string() },
  user: Joi.string().hex().length(24).required(),
});

export const getIndividualSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
export const updateIndividualSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  identityImg: { url: Joi.string(), publicId: Joi.string() },
  forwardDeviceImg: { url: Joi.string(), publicId: Joi.string() },
  backwardDeviceImg: { url: Joi.string(), publicId: Joi.string() },
  batteryPercentageDeviceImg: { url: Joi.string(), publicId: Joi.string() },
  deviceScreenImg: { url: Joi.string(), publicId: Joi.string() },
  shopInvoiceImg: { url: Joi.string(), publicId: Joi.string() },
});
export const deleteIndividualSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
