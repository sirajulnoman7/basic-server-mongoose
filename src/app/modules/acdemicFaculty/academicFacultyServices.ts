import { TAcademicFaculty } from './academicFacultyInterface';
import academicFacultyModel from './academicFacultyModel';

const createFacultyIntoDB = async (payload: TAcademicFaculty) => {
  //   check valid  code

  const result = await academicFacultyModel.create(payload);
  return result;
};

const getAllAcademicFacultyFromDB = async () => {
  const result = await academicFacultyModel.find();
  return result;
};

const getSingleAcademicFacultyFromDB = async (id: string) => {
  const result = await academicFacultyModel.findById(id);
  return result;
};

const updateAcademicFacultyIntoDB = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const result = await academicFacultyModel.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );
  return result;
};

export const academicFacultyService = {
  createFacultyIntoDB,
  getAllAcademicFacultyFromDB,
  getSingleAcademicFacultyFromDB,
  updateAcademicFacultyIntoDB,
};
