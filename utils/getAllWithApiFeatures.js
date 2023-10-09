import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { ApiFeature } from "./AppFeatures.js";

export const getAllWithApiFeatures = (Model, isPopulate, populateField) =>
  catchAsyncError(async (req, res) => {
    const apiFeatures = new ApiFeature(
      Model.find(),
      req.query,
      isPopulate || false,
      populateField
    )
      .paginate()
      .fields()
      .filter()
      .sort()
      .search();

    const results = await apiFeatures.query.lean();
    const count = await Model.countDocuments(apiFeatures.query);

    res.json({
      message: "Success",
      page: apiFeatures.page,
      count: count, // Display the count
      results: results, // Corrected "result" to "results"
    });
  });
