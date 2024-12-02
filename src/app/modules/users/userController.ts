import { userServices } from './userServices';
import catchAsync from '../../utilits/catchAsync';

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

export const userController = {
  createStudent,
};
