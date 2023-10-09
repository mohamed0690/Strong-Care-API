import { Department } from "../../../database/models/department.model.js";
import { User } from "../../../database/models/user.model.js";
import { catchAsyncError } from "../../../middleware/catchAsyncError.js";
import {
  createRecord,
  deleteRecord,
  getRecord,
  updateRecord,
} from "../../../utils/crudFactory.js";
import { getAllWithApiFeatures } from "../../../utils/getAllWithApiFeatures.js";
const modelName = "Department";
export const createDepartment = catchAsyncError(async (req, res) => {
  const { user, name } = req.body;
  const existUser = await User.findOneAndUpdate({ _id: user }, { role: name });
  if (!existUser) return res.json({ message: "User does not exist" });
  const existDepart = await Department.findOneAndUpdate(
    { name },
    { $addToSet: { users: user } }
  );
  if (!existDepart) {
    req.body.users = [user];
    createRecord(modelName, Department, req, res);
  } else
    res.send({ message: "user added to department successfully", existDepart });
});

export const getAllDepartments = getAllWithApiFeatures(Department);

export const updateDepartment = catchAsyncError(async (req, res) => {
  const { name } = req.body;
  let depart = await Department.findOne({ name });
  if (depart) {
    depart.users.map(
      async (user) =>
        await User.findByIdAndUpdate(
          { _id: user._id.toString() },
          { role: name }
        )
    );
  }
  updateRecord(modelName, Department, req, res);
});

export const deleteDepartment = catchAsyncError(async (req, res) => {
  deleteRecord(modelName, Department, req, res);
});

export const getDepartment = catchAsyncError(async (req, res) => {
  getRecord(modelName, Department, req, res);
});
