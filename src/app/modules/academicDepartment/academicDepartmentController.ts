import catchAsync from '../../utilits/catchAsync';
import { academicDepartmentService } from './academicDepartmentServices';

const createAcademicDepartment = catchAsync(async (req, res) => {
  const result = await academicDepartmentService.createDepartmentIntoDB(
    req.body,
  );
  res.status(200).json({
    success: true,
    message: 'academic Department  created successfully',
    data: result,
  });
});

const getAllAcademicDepartmentsFromDB = catchAsync(async (req, res) => {
  const result =
    await academicDepartmentService.getAllAcademicDepartmentFromDB();
  res.status(200).json({
    success: true,
    message: 'get all departments semester successfully',
    data: result,
  });
});
const getSingleAcademicDepartmentFromDB = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result =
    await academicDepartmentService.getSingleAcademicDepartmentFromDB(
      departmentId,
    );
  res.status(200).json({
    success: true,
    message: 'get single academic Department successfully',
    data: result,
  });
});
const updateAcademicDepartmentIntoDB = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const payload = req.body;
  const result = await academicDepartmentService.updateAcademicDepartmentIntoDB(
    departmentId,
    payload,
  );
  res.status(200).json({
    success: true,
    message: 'update academic Department successfully',
    data: result,
  });
});

export const academicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartmentsFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentIntoDB,
};
