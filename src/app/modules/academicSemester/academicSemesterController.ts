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

export const academicSemesterController = {
  createAcademicSemester,
};
