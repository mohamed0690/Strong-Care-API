import { statistics } from "../../../database/statistics.js";
import { catchAsyncError } from "../../../middleware/catchAsyncError.js";
export const statisticsUsers = catchAsyncError(async (req, res, next) => {
    const userStats = await statistics();
    res.json({ message: "success", data: userStats });
})