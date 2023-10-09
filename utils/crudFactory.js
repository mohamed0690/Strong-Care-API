import { HttpStatus } from "../enums/httpStatus.js";
import { AppError } from "./appError.js";

function successResponse(res, modelName, data, message = "Success") {
  res.json({ message, [modelName]: data });
}

function errorResponse(
  res,
  errorMessage,
  statusCode = HttpStatus.InternalServerError
) {
  res.status(statusCode).json({ error: errorMessage });
}

export async function createRecord(modelName, modelInstance, req, res) {
  try {
    const record = await modelInstance(req.body).save();

    successResponse(res, modelName, record, `${modelName} added successfully`);
  } catch (error) {
    console.log(error);
    errorResponse(
      res,
      error instanceof AppError ? error.message : "Internal Server Error",
      HttpStatus.BadRequest
    );
  }
}

export async function getAllRecords(modelName, modelInstance, res) {
  try {
    const objects = await modelInstance.find();
    successResponse(res, modelName, objects);
  } catch (error) {
    console.log(error);
    errorResponse(res, "Internal Server Error");
  }
}

export async function updateRecord(modelName, modelInstance, req, res) {
  try {
    const updatedModel = await modelInstance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedModel) {
      errorResponse(res, `${modelName} not found`, HttpStatus.NotFound);
      return;
    }
    successResponse(
      res,
      modelName,
      updatedModel,
      `${modelName} updated successfully`
    );
  } catch (error) {
    errorResponse(
      res,
      error instanceof AppError ? error.message : "Internal Server Error",
      HttpStatus.BadRequest
    );
  }
}

export async function deleteRecord(modelName, modelInstance, req, res) {
  try {
    const deletedModel = await modelInstance.findByIdAndDelete(req.params.id);
    if (!deletedModel) {
      errorResponse(res, `${modelName} not found`, HttpStatus.NotFound);
      return;
    }
    successResponse(
      res,
      modelName,
      deletedModel,
      `${modelName} deleted successfully`
    );
  } catch (error) {
    errorResponse(
      res,
      error instanceof AppError ? error.message : "Internal Server Error",
      HttpStatus.BadRequest
    );
  }
}

export async function getRecord(modelName, modelInstance, req, res) {
  try {
    const selectedModel = await modelInstance.findById(req.params.id);
    if (!selectedModel) {
      errorResponse(res, `${modelName} not found`, HttpStatus.NotFound);
      return;
    }
    successResponse(res, modelName, selectedModel);
  } catch (error) {
    errorResponse(
      res,
      error instanceof AppError ? error.message : "Internal Server Error",
      HttpStatus.BadRequest
    );
  }
}
