import catchAsync from '../../utilits/catchAsync';
import { academicFacultyService } from './academicFacultyServices';

const createAcademicFaculty = catchAsync(async (req, res) => {
  // console.log(req.body);
  const result = await academicFacultyService.createFacultyIntoDB(req.body);
  res.status(200).json({
    success: true,
    message: 'academic faculty  created successfully',
    data: result,
  });
});

const getAllAcademicFacultiesFromDB = catchAsync(async (req, res) => {
  const result = await academicFacultyService.getAllAcademicFacultyFromDB();
  res.status(200).json({
    success: true,
    message: 'get all faculties semester successfully',
    data: result,
  });
});
const getSingleAcademicFacultyFromDB = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result =
    await academicFacultyService.getSingleAcademicFacultyFromDB(facultyId);
  res.status(200).json({
    success: true,
    message: 'get single academic faculty successfully',
    data: result,
  });
});
const updateAcademicFacultyIntoDB = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const payload = req.body;
  const result = await academicFacultyService.updateAcademicFacultyIntoDB(
    facultyId,
    payload,
  );
  res.status(200).json({
    success: true,
    message: 'update academic faculty successfully',
    data: result,
  });
});

export const academicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFacultiesFromDB,
  getSingleAcademicFacultyFromDB,
  updateAcademicFacultyIntoDB,
};
