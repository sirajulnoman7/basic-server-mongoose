import { off } from 'process';
import QueryBuilder from '../../builders/QueryBuilder';
import AppError from '../../Error/AppError';
import academicDepartmentModel from '../academicDepartment/academicDepartmentModel';
import academicFacultyModel from '../acdemicFaculty/academicFacultyModel';
import { courseModel } from '../courses/courseModel';
import facultyModel from '../faculty/faculty.model';
import semesterRegistrationModel from '../semesterRegistation/semesterRegistationModel';
import { TOfferedCourse } from './offerdCourseInterface';
import { OfferedCourseModel } from './offerdCourseModel';
import { hasTimeConflict } from './offerdCourseUtils';

const createOfferCourse = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    section,
    faculty,
    days,
    startTime,
    endTime,
  } = payload;

  /**
   * Step 1: check if the semester registration id is exists!
   * Step 2: check if the academic faculty id is exists!
   * Step 3: check if the academic department id is exists!
   * Step 4: check if the course id is exists!
   * Step 5: check if the faculty id is exists!
   * Step 6: check if the department is belong to the  faculty
   * Step 7: check if the same offered course same section in same registered semester exists
   * Step 8: get the schedules of the faculties
   * Step 9: check if the faculty is available at that time. If not then throw error
   * Step 10: create the offered course
   */

  //check if the semester registration id is exists!
  const isSemesterRegistrationExits =
    await semesterRegistrationModel.findById(semesterRegistration);

  if (!isSemesterRegistrationExits) {
    throw new AppError(400, 'Semester registration not found !');
  }

  const academicSemester = isSemesterRegistrationExits.academicSemester;

  const isAcademicFacultyExits =
    await academicFacultyModel.findById(academicFaculty);

  if (!isAcademicFacultyExits) {
    throw new AppError(400, 'Academic Faculty not found !');
  }

  const isAcademicDepartmentExits =
    await academicDepartmentModel.findById(academicDepartment);

  if (!isAcademicDepartmentExits) {
    throw new AppError(400, 'Academic Department not found !');
  }

  const isCourseExits = await courseModel.findById(course);

  if (!isCourseExits) {
    throw new AppError(400, 'Course not found !');
  }

  const isFacultyExits = await facultyModel.findById(faculty);

  if (!isFacultyExits) {
    throw new AppError(400, 'Faculty not found !');
  }

  //   check if the department is belong to the  faculty
  const isDepartmentBelongToFaculty = await academicDepartmentModel.findOne({
    _id: academicDepartment,
    academicFaculty,
  });

  if (!isDepartmentBelongToFaculty) {
    throw new AppError(
      400,
      `This ${isAcademicDepartmentExits.name} is not  belong to this ${isAcademicFacultyExits.name}`,
    );
  }

  const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection =
    await OfferedCourseModel.findOne({
      semesterRegistration,
      course,
      section,
    });

  if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
    throw new AppError(
      400,
      `This register semester has already exists with same section  `,
    );
  }

  // get the schedules of the faculties
  const assignSchedules = await OfferedCourseModel.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedules = {
    days,
    startTime,
    endTime,
  };

  // check if the faculty is available at that time. If not then throw error

  if (hasTimeConflict(assignSchedules, newSchedules)) {
    throw new AppError(
      400,
      `this faculty is already assigned at this time ,choose another time or day`,
    );
  }

  const result = await OfferedCourseModel.create({
    ...payload,
    academicSemester,
  });
  return result;
};

const updateOfferCourse = async (
  id: string,
  payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>,
) => {
  const { faculty, days, startTime, endTime } = payload;
  const isExistOfferCourse = await OfferedCourseModel.findById(id);
  if (!isExistOfferCourse) {
    throw new AppError(404, 'Offered course not found');
  }
  const isExistFaculty = await facultyModel.findById(faculty);
  if (!isExistFaculty) {
    throw new AppError(404, 'faculty is not found');
  }

  const semesterRegistration = isExistOfferCourse?.semesterRegistration;

  const semesterRegistrationStatus =
    await semesterRegistrationModel.findById(semesterRegistration);

  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      400,
      `you can not update this course because semester registration is ${semesterRegistrationStatus?.status}`,
    );
  }

  // get the schedules of the faculties
  const assignSchedules = await OfferedCourseModel.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedules = {
    days,
    startTime,
    endTime,
  };

  // check if the faculty is available at that time. If not then throw error

  if (hasTimeConflict(assignSchedules, newSchedules)) {
    throw new AppError(
      400,
      `this faculty is already assigned at this time ,choose another time or day`,
    );
  }

  const result = await OfferedCourseModel.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

const getAllOfferCourse = async (query: Record<string, unknown>) => {
  const offerCourseQuery = new QueryBuilder(OfferedCourseModel.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await offerCourseQuery.modelQuery;
  return result;
};

const getSingleOfferCourse = async (id: string) => {
  const result = await OfferedCourseModel.findById(id);

  if (!result) {
    throw new AppError(404, 'Offered course not found');
  }

  return result;
};

const deleteOfferCourse = async (id: string) => {
  const isExistOfferCourse = await OfferedCourseModel.findById(id);
  if (!isExistOfferCourse) {
    throw new AppError(404, 'Offered course not found');
  }

  const semesterRegister = isExistOfferCourse?.semesterRegistration;

  const semesterRegisterStatus = await semesterRegistrationModel
    .findById(semesterRegister)
    .select('status');

  if (semesterRegisterStatus?.status !== 'UPCOMING') {
    throw new AppError(
      400,
      `you can not delete this course because semester registration is ${semesterRegisterStatus?.status}`,
    );
  }

  const result = await OfferedCourseModel.findByIdAndDelete(id);
  return result;
};

export const offerCourseServices = {
  createOfferCourse,
  updateOfferCourse,
  getAllOfferCourse,
  getSingleOfferCourse,
  deleteOfferCourse,
};
