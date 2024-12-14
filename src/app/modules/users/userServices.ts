import { startSession } from 'mongoose';
import config from '../../config';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { StudentModel } from '../students/students.schema.module';
import { Students } from '../students/studentsInterface';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utilitis';
import { TUser } from './userInterface';
import userModel from './userModel';
import AppError from '../../Error/AppError';
import TFaculty from '../faculty/facultyInterface';
import facultyModel from '../faculty/faculty.model';
import mongoose from 'mongoose';
import academicDepartmentModel from '../academicDepartment/academicDepartmentModel';
import { TAdmin } from '../Admin/adminInterface';
import adminModel from '../Admin/adminModel';

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

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  const userData: Partial<TUser> = {};
  userData.role = 'faculty';

  userData.password = password || (config.default_password as string);
  // find academic department info
  const academicDepartment = await academicDepartmentModel.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found');
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generateFacultyId();
    const newUser = await userModel.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(404, 'Fiend to create user');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const createNewFaculty = await facultyModel.create([payload], { session });

    if (!createNewFaculty.length) {
      throw new AppError(400, 'Fiend to create student');
    }
    await session.commitTransaction();
    await session.endSession();
    return createNewFaculty[0];
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();

    throw new Error(err);
  }
};

// =======================admin-=============

const creteAdminIntoDb = async (password: string, payload: TAdmin) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_password as string);
  userData.role = 'admin';
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generateAdminId();
    const newUser = await userModel.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(404, 'Fiend to create user');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const createAdmin = await adminModel.create([payload], { session });

    if (!createAdmin.length) {
      throw new AppError(404, 'Fiend to create admin');
    }
    await session.commitTransaction();
    await session.endSession();
    return createAdmin[0];
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw Error(err);
  }
};

export const userServices = {
  createStudentInDB,
  createFacultyIntoDB,
  creteAdminIntoDb,
};
