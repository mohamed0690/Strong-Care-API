import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { Compensations } from "./models/compensations.js";
import { InsuranceRequest } from "./models/insurance.request.model.js";
import { User } from "./models/user.model.js";
import { Order } from './models/order.model.js';


export const statistics = catchAsyncError(async () => {
    const pipeline = (column) => [
        {
            $group: {
                _id: `$${column}`,
                count: { $sum: 1 },
            },
        },
        {
            $sort: { _id: 1 },
        },
    ];



    const result = await User.aggregate(pipeline("role")).exec();
    const result2 = await InsuranceRequest.aggregate(pipeline("state")).exec();
    const result3 = await Compensations.aggregate(pipeline()).exec();
    const result4 = await Order.aggregate(pipeline("isPaid")).exec();

    const userStatistics = {};
    result.forEach((entry) => {
        userStatistics[entry._id] = entry.count;
    });
    result2.forEach((entry) => {
        userStatistics[`InsuranceRequest_${entry._id}`] = entry.count;
    });
    result3.forEach((entry) => {
        userStatistics[`Compensations`] = entry.count;
    });
    result4.forEach((entry) => {
        userStatistics[`orders_${entry._id}`] = entry.count;
    });

    return userStatistics;
})



