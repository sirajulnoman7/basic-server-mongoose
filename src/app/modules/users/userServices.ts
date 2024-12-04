import { startSession } from 'mongoose';
import config from '../../config';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { StudentModel } from '../students/students.schema.module';
import { Students } from '../students/studentsInterface';
import { generateStudentId } from './user.utilitis';
import { TUser } from './userInterface';
import userModel from './userModel';
import AppError from '../../Error/AppError';

const createStudentInDB = async (password: string, studentData: Students) => {
  //   create a user obj
  const userData: Partial<TUser> = {}; //partial type to convert optional with main type
  userData.password = password || (config.default_password as string);

  //    set a role student
  userData.role = 'student';

  // find academic semester info
  const admissionSemester = await AcademicSemesterModel.findById(
    studentData.admissionSemester,
  );

  // set  generated id
  userData.id = await generateStudentId(admissionSemester);

  const session = await startSession();

  try {
    session.startTransaction();
    //  create user first transaction
    const newUser = await userModel.create([userData], { session }); //user data is a array

    if (!newUser.length) {
      throw new AppError(404, 'Fiend to create user');
    }
    //   create student new student
    studentData.id = newUser[0].id; //embed id
    studentData.user = newUser[0]._id; //reference id
    //  create user second transaction
    const newStudent = await StudentModel.create([studentData], { session });
    if (!newStudent.length) {
      throw new AppError(400, 'Fiend to create student');
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to create student');
  }
};

export const userServices = {
  createStudentInDB,
};
