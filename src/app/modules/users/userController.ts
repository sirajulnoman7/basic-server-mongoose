import { userServices } from './userServices';
import catchAsync from '../../utilits/catchAsync';
import sendResponse from '../../utilits/rsendResponse';
import AppError from '../../Error/AppError';

const createStudent = catchAsync(async (req, res) => {
  const { password, studentData } = req.body;
  // console.log(password, studentData);

  const result = await userServices.createStudentInDB(password, studentData);
  res.status(200).json({
    success: true,
    message: 'student created successfully',
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;
  const result = await userServices.createFacultyIntoDB(password, facultyData);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'faculty created successfully',
    data: result,
  });
});
const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;
  const result = await userServices.creteAdminIntoDb(password, adminData);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Admin created successfully',
    data: result,
  });
});
const getMe = catchAsync(async (req, res) => {
  // const token = req.headers.authorization;
  // if (!token) {
  //   throw new AppError(401, 'you are not authorized');
  // }

  const decoded = req.user;

  const userId = decoded.jwtPayload.id;
  const role = decoded.jwtPayload.role;
  const result = await userServices.getMe(userId, role);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'user fetched successfully',
    data: result,
  });
});

const changeStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const result = await userServices.changeStatus(id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'status updated successfully',
    data: result,
  });
});

export const userController = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
  changeStatus,
};
