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
import { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import sendImageToCloudinary from '../../utilits/sendImageToCloudinary';

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
const createStudentInDB = async (
  password: string,
  studentData: Students,
  file: any,
) => {
  //   create a user obj
  const userData: Partial<TUser> = {}; //partial type to convert optional with main type
  userData.password = password || (config.default_password as string);

  //    set a role student
  userData.role = 'student';
  // student email set
  userData.email = studentData?.email;

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

    // cloudinary upload---------------------------
    const path = file?.path;
    const profileImage = `${userData.id}${studentData?.name?.firstName}`;

    const { secure_url } = await sendImageToCloudinary(path, profileImage);

    const newUser = await userModel.create([userData], { session }); //user data is a array

    if (!newUser.length) {
      throw new AppError(404, 'Fiend to create user');
    }
    //   create student new student
    studentData.id = newUser[0].id; //embed id
    studentData.user = newUser[0]._id; //reference id
    studentData.profileImg = secure_url;
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
  // faculty email set
  userData.email = payload.email;

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
  // admin role set
  userData.role = 'admin';
  // admin email set
  userData.email = payload.email;
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

const getMe = async (userId: string, role: string) => {
  // const decoded = jwt.verify(
  //   token,
  //   config.jwt_token_secret as string,
  // ) as JwtPayload;
  // const userId = decoded.jwtPayload.id;
  // const role = decoded.jwtPayload.role;
  let result = null;
  if (role === 'student') {
    result = await StudentModel.findOne({ id: userId });
  }
  if (role === 'faculty') {
    result = await facultyModel.findOne({ id: userId });
  }
  if (role === 'admin') {
    result = await adminModel.findOne({ id: userId });
  }
  return result;
};

const changeStatus = async (id: string, payload: { status: string }) => {
  // console.log(status);
  const result = await userModel.findByIdAndUpdate(id, payload, { new: true });

  return result;
};

export const userServices = {
  createStudentInDB,
  createFacultyIntoDB,
  creteAdminIntoDb,
  getMe,
  changeStatus,
};
