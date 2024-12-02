import TAcademicDepartment from './academicDepartmentInterface';
import academicDepartmentModel from './academicDepartmentModel';

const createDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  //   check valid  code

  const result = await academicDepartmentModel.create(payload);
  return result;
};

const getAllAcademicDepartmentFromDB = async () => {
  const result = await academicDepartmentModel
    .find()
    .populate('academicFaculty');
  return result;
};

const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const result = await academicDepartmentModel
    .findById(id)
    .populate('academicFaculty');
  return result;
};

const updateAcademicDepartmentIntoDB = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await academicDepartmentModel
    .findOneAndUpdate({ _id: id }, payload, {
      new: true,
    })
    .populate('academicFaculty');
  return result;
};

export const academicDepartmentService = {
  createDepartmentIntoDB,
  getAllAcademicDepartmentFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentIntoDB,
};
