import { academicSemesterNameCodeMapper } from './academicSemester.constance';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemesterModel } from './academicSemester.model';

const createSemesterIntoDB = async (payload: TAcademicSemester) => {
  //   check valid  code
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('your code is invalid');
  }

  const result = await AcademicSemesterModel.create(payload);
  return result;
};

export const academicSemesterService = {
  createSemesterIntoDB,
};
