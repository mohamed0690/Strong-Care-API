import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { InsuranceRequest } from "./models/insurance.request.model.js";
import { User } from "./models/user.model.js";


export const statistics = catchAsyncError(async () => {
    const pipeline = [
        {
            $group: {
                _id: "$role",
                count: { $sum: 1 },
            },
        },
        {
            $sort: { _id: 1 },
        },
    ];

    const pipeline2 = [
        {
            $group: {
                _id: "$state",
                count: { $sum: 1 },
            },
        },
        {
            $sort: { _id: 1 },
        },
    ];

    const result = await User.aggregate(pipeline).exec();
    const result2 = await InsuranceRequest.aggregate(pipeline).exec();

    const userStatistics = {};
    result.forEach((entry) => {
        userStatistics[entry._id] = entry.count;
    });
    result2.forEach((entry) => {
        userStatistics[`InsuranceRequest${entry._id}`] = entry.count;
    });

    return userStatistics;
})



