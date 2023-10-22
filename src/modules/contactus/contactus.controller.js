import { ContactUS } from "../../../database/models/contactus.model.js";
import { catchAsyncError } from "../../../middleware/catchAsyncError.js";
import {
  createRecord,
  deleteRecord,
  getRecord,
  updateRecord,
} from "../../../utils/crudFactory.js";
import { getAllWithApiFeatures } from "../../../utils/getAllWithApiFeatures.js";

const modelName = "ContactUS";

export const createContactUS = catchAsyncError(async (req, res, next) => {

  createRecord(modelName, ContactUS, req, res);

});

export const getAllContactUSs = getAllWithApiFeatures(ContactUS);

export const updateContactUS = catchAsyncError(async (req, res, next) => {

  updateRecord(modelName, ContactUS, req, res);
});

export const deleteContactUS = catchAsyncError(async (req, res, next) => {

  deleteRecord(modelName, ContactUS, req, res);
});

export const getContactUS = catchAsyncError(async (req, res, next) => {
  getRecord(modelName, ContactUS, req, res);
});


