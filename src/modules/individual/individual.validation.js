import Joi from "joi";
export const createIndividualSchema = Joi.object({
  identityImg: Joi.object({
    url: Joi.string()
      .uri({ scheme: ["http", "https"] })
      .required()
      .description("URL of the profile image"),
    publicId: Joi.string()
      .required()
      .description("Public ID associated with the profile image"),
  }),
  forwardDeviceImg: Joi.object({
    url: Joi.string()
      .uri({ scheme: ["http", "https"] })
      .required()
      .description("URL of the profile image"),
    publicId: Joi.string()
      .required()
      .description("Public ID associated with the profile image"),
  }),
  backwardDeviceImg: Joi.object({
    url: Joi.string()
      .uri({ scheme: ["http", "https"] })
      .required()
      .description("URL of the profile image"),
    publicId: Joi.string()
      .required()
      .description("Public ID associated with the profile image"),
  }),
  batteryPercentageDeviceImg: Joi.object({
    url: Joi.string()
      .uri({ scheme: ["http", "https"] })
      .required()
      .description("URL of the profile image"),
    publicId: Joi.string()
      .required()
      .description("Public ID associated with the profile image"),
  }),
  deviceScreenImg: Joi.object({
    url: Joi.string()
      .uri({ scheme: ["http", "https"] })
      .required()
      .description("URL of the profile image"),
    publicId: Joi.string()
      .required()
      .description("Public ID associated with the profile image"),
  }),
  shopInvoiceImg: Joi.object({
    url: Joi.string()
      .uri({ scheme: ["http", "https"] })
      .required()
      .description("URL of the profile image"),
    publicId: Joi.string()
      .required()
      .description("Public ID associated with the profile image"),
  }),
  user: Joi.string().hex().length(24).required(),
});

export const getIndividualSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
export const updateIndividualSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  identityImg: Joi.object({
    url: Joi.string()
      .uri({ scheme: ["http", "https"] })
      .required()
      .description("URL of the identity image"),
    publicId: Joi.string()
      .required()
      .description("Public ID associated with the identity image"),
  }),
  forwardDeviceImg: Joi.object({
    url: Joi.string()
      .uri({ scheme: ["http", "https"] })
      .required()
      .description("URL of the forward Device image"),
    publicId: Joi.string()
      .required()
      .description("Public ID associated with the forward Device image"),
  }),
  backwardDeviceImg: Joi.object({
    url: Joi.string()
      .uri({ scheme: ["http", "https"] })
      .required()
      .description("URL of the backward Device image"),
    publicId: Joi.string()
      .required()
      .description("Public ID associated with the backward Device image"),
  }),
  batteryPercentageDeviceImg: Joi.object({
    url: Joi.string()
      .uri({ scheme: ["http", "https"] })
      .required()
      .description("URL of the battery Percentage Device image"),
    publicId: Joi.string()
      .required()
      .description(
        "Public ID associated with the battery Percentage Device image"
      ),
  }),
  deviceScreenImg: Joi.object({
    url: Joi.string()
      .uri({ scheme: ["http", "https"] })
      .required()
      .description("URL of the  device Screen image"),
    publicId: Joi.string()
      .required()
      .description("Public ID associated with the  device Screen image"),
  }),
  shopInvoiceImg: Joi.object({
    url: Joi.string()
      .uri({ scheme: ["http", "https"] })
      .required()
      .description("URL of the shop Invoice image"),
    publicId: Joi.string()
      .required()
      .description("Public ID associated with the shop Invoice image"),
  }),
});
export const deleteIndividualSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
