import { userServices } from './userServices';
import catchAsync from '../../utilits/catchAsync';
import sendResponse from '../../utilits/rsendResponse';

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

export const userController = {
  createStudent,
  createFaculty,
  createAdmin,
};
