import { HttpStatus } from "../enums/httpStatus.js";

const sendSuccessResponse = (res, message, data) => {
  res.send({ message, data });
};

const sendNotFoundResponse = (res, modelName) => {
  res.status(HttpStatus.NotFound).send({ message: `${modelName} not found` });
};

export const createRecord = async (modelName, modelInstance, req, res) => {
  const record = await modelInstance(req.body).save();
  sendSuccessResponse(res, "success", record);
};

export const getAllRecords = async (modelName, modelInstance, res) => {
  const objects = await modelInstance.find();
  sendSuccessResponse(res, "success", objects);
};

export const updateRecord = async (modelName, modelInstance, req, res) => {
  const updatedModel = await modelInstance.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!updatedModel) {
    sendNotFoundResponse(res, modelName);
  } else {
    sendSuccessResponse(res, "success", updatedModel);
  }
};

export const deleteRecord = async (modelName, modelInstance, req, res) => {
  const deletedObj = await modelInstance.findByIdAndDelete(req.params.id);
  if (!deletedObj) {
    sendNotFoundResponse(res, modelName);
  } else {
    sendSuccessResponse(res, "success", deletedObj);
  }
};

export const getRecord = async (modelName, modelInstance, req, res) => {
  const selectedObj = await modelInstance.findById(req.params.id);
  if (!selectedObj) {
    sendNotFoundResponse(res, modelName);
  } else {
    sendSuccessResponse(res, "success", selectedObj);
  }
};
