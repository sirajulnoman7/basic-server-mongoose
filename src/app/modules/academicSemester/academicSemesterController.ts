import catchAsync from '../../utilits/catchAsync';
import { academicSemesterService } from './academicSemesterServices';

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await academicSemesterService.createSemesterIntoDB(req.body);
  res.status(200).json({
    success: true,
    message: 'academic semester  created successfully',
    data: result,
  });
});

const getAllAcademicSemestersFromDB = catchAsync(async (req, res) => {
  const result = await academicSemesterService.getAllAcademicSemestersFromDB();
  res.status(200).json({
    success: true,
    message: 'get all academic semester successfully',
    data: result,
  });
});
const getSingleAcademicSemesterFromDB = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result =
    await academicSemesterService.getSingleAcademicSemesterFromDB(semesterId);
  res.status(200).json({
    success: true,
    message: 'get single academic semester successfully',
    data: result,
  });
});
const updateAcademicSemesterIntoDB = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const payload = req.body;
  const result = await academicSemesterService.updateAcademicSemesterIntoDB(
    semesterId,
    payload,
  );
  res.status(200).json({
    success: true,
    message: 'update academic semester successfully',
    data: result,
  });
});

export const academicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemestersFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterIntoDB,
};
