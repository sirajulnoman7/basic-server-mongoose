import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import TFaculty from '../faculty/facultyInterface';
import userModel from './userModel';

const findLastStudentId = async () => {
  const lastStudent = await userModel
    .findOne(
      {
        role: 'student',
      },
      {
        id: 1,
        _id: 0,
      },
    )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastStudent?.id ? lastStudent?.id : undefined;
};

export const generateStudentId = async (payload: TAcademicSemester) => {
  let currentId = (0).toString(); //get 4 digit id 0000
  // 2030010000

  const lastStudentId = await findLastStudentId();
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6); //get last code
  const lastStudentSemesterYear = lastStudentId?.substring(0, 4); //get last year
  const currentStudentSemesterYear = payload.year;
  const currentStudentSemesterCode = payload.code;

  if (
    lastStudentId &&
    lastStudentSemesterYear === currentStudentSemesterYear &&
    lastStudentSemesterCode === currentStudentSemesterCode
  ) {
    // set currentId value
    currentId = lastStudentId.substring(6).padStart(4, '0');
  }

  let incrementId = (Number(currentId) + 1).toString();

  incrementId = `${payload.year}${payload.code}${incrementId.toString().padStart(4, '0')}`;
  return incrementId;
};

// generate faculty id

const findLastFacultyId = async () => {
  const lastFaculty = await userModel
    .findOne(
      { role: 'faculty' },
      {
        id: 1,
        _id: 0,
      },
    )
    .sort({ createdAt: -1 })
    .lean();
  return lastFaculty?.id ? lastFaculty?.id.substring(2) : undefined;
};

export const generateFacultyId = async () => {
  let currentId = (0).toString();
  const lastFacultyId = await findLastFacultyId();

  if (lastFacultyId) {
    currentId = lastFacultyId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `F-${incrementId}`;

  return incrementId;
};

const findLastAdminId = async () => {
  const lastAdminId = await userModel
    .findOne({
      role: 'admin',
    })
    .sort({ createdAt: -1 })
    .lean();

  return lastAdminId?.id ? lastAdminId?.id.substring(2) : undefined;
};

export const generateAdminId = async () => {
  let currentId = (0).toString();
  const lastAdminId = await findLastAdminId();
  if (lastAdminId) {
    currentId = lastAdminId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `A-${incrementId}`;

  return incrementId;
};
