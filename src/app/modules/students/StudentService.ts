import { startSession } from 'mongoose';
import { StudentModel } from './students.schema.module';
import userModel from '../users/userModel';
import AppError from '../../Error/AppError';
import { Students } from './studentsInterface';

const getStudentInDB = async () => {
  const result = await StudentModel.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const getOneStudentInDB = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};

// update student in DB
const getOneAndUpdateStudentInDB = async (
  id: string,
  payload: Partial<Students>,
) => {
  const { name, guardant, localGuardant, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  /*
    guardain: {
      fatherOccupation:"Teacher"
    }

    guardian.fatherOccupation = Teacher

    name.firstName = 'Mezba'
    name.lastName = 'Abedin'
  */

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardant && Object.keys(guardant).length) {
    for (const [key, value] of Object.entries(guardant)) {
      modifiedUpdatedData[`guardant.${key}`] = value;
    }
  }

  if (localGuardant && Object.keys(localGuardant).length) {
    for (const [key, value] of Object.entries(localGuardant)) {
      modifiedUpdatedData[`localGuardant.${key}`] = value;
    }
  }

  console.log(modifiedUpdatedData);

  const result = await StudentModel.findOneAndUpdate(
    { id },
    modifiedUpdatedData,
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

// deleted item student and user,so use session
const deleteStudentInDB = async (id: string) => {
  const session = await startSession();
  try {
    session.startTransaction();

    // second trancetion
    // delete User
    const deleteUser = await userModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true },
    );
    if (!deleteUser) {
      throw new AppError(400, 'Field to deleted user');
    }

    const deleteStudent = await StudentModel.findOneAndUpdate(
      { id },
      { isDelete: true },
      { new: true },
    );
    if (!deleteStudent) {
      throw new AppError(400, 'Field to deleted user');
    }

    await session.commitTransaction();
    await session.endSession();
    return deleteStudent;
  } catch (err) {
    await session.commitTransaction();
    await session.endSession();
  }
};

export const studentServices = {
  getStudentInDB,
  getOneStudentInDB,
  getOneAndUpdateStudentInDB,
  deleteStudentInDB,
};
