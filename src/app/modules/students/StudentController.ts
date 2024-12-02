import { studentServices } from './StudentService';
import sendResponse from '../../utilits/rsendResponse';
import catchAsync from '../../utilits/catchAsync';

// get student
const getStudents = catchAsync(async (req, res) => {
  const result = await studentServices.getStudentInDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Student is retrieved succesfully',
    data: result,
  });
});

const findOneStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await studentServices.getOneStudentInDB(studentId);
  res.status(200).json({
    success: true,
    message: 'student find successfully',
    data: result,
  });
});

const deleteOne = catchAsync(async (req, res) => {
  const { idx } = req.params;
  const result = await studentServices.deleteStudentInDB(idx);
  res.status(200).json({
    success: true,
    message: 'student created successfully',
    data: result,
  });
});

export const StudentController = {
  getStudents,
  findOneStudent,
  deleteOne,
};
