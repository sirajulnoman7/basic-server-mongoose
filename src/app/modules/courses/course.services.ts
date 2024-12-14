import mongoose from 'mongoose';
import QueryBuilder from '../../builders/QueryBuilder';
import { TCourse, TCourseFaculty } from './course.interface';
import { CourseSearchableFields } from './courseConstant';

import AppError from '../../Error/AppError';
import { courseFacultyModel, courseModel } from './courseModel';

const createCourseInDB = async (payload: TCourse) => {
  const result = await courseModel.create(payload);
  return result;
};

const getAllCourseInDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    courseModel.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCourseInDB = async (id: string) => {
  const result = await courseModel.findById(id);
  return result;
};

const updateSingleCourseInDB = async (
  id: string,
  payload: Partial<TCourse>,
) => {
  const { preRequisiteCourses, ...remainingCourseData } = payload;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const updatedCourse = await courseModel.findByIdAndUpdate(
      id,
      remainingCourseData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );
    if (!updatedCourse) {
      throw new AppError(400, 'Failed to update course');
    }
    if (preRequisiteCourses && preRequisiteCourses.length) {
      const deletedPreRequisite = preRequisiteCourses
        .filter((el) => el.isDeleted)
        .map((el) => el.course);
      // console.log(deletedPreRequisite);
      const deletedPreRequisiteCourse = await courseModel.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPreRequisite } },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );
      if (!deletedPreRequisiteCourse) {
        throw new AppError(400, 'Failed to update course');
      }

      // add new course
      const addNewPreRequisiteCourse = preRequisiteCourses?.filter(
        (el) => el.course && !el.isDeleted,
      );
      const newPreRequisiteCourse = await courseModel.findByIdAndUpdate(
        id,
        {
          $addToSet: {
            preRequisiteCourses: { $each: addNewPreRequisiteCourse },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );
      if (!newPreRequisiteCourse) {
        throw new AppError(400, 'Failed to update course');
      }
      // console.log({ addNewPreRequisiteCourse });
    }

    const result = await courseModel
      .findById(id)
      .populate('preRequisiteCourses.course');

    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(400, 'Failed to update course');
  }
};

const deleteCourseInDB = async (id: string) => {
  const result = await courseModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

// assign course Faculty

const assignCourseFacultyWithIntoDb = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  // console.log(payload.faculties);

  if (!Array.isArray(payload.faculties)) {
    throw new Error('faculties must be an array of ObjectId');
  }
  const result = await courseFacultyModel.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload.faculties } },
    },
    {
      upsert: true,
      new: true,
    },
  );
  return result;
};
const removeCourseFacultyWithIntoDb = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  // console.log(payload.faculties);

  if (!Array.isArray(payload.faculties)) {
    throw new Error('faculties must be an array of ObjectId');
  }
  const result = await courseFacultyModel.findByIdAndUpdate(
    id,
    {
      course: id,
      $pull: { faculties: { $in: payload.faculties } },
    },
    {
      new: true,
    },
  );
  return result;
};
export const courseService = {
  createCourseInDB,
  getAllCourseInDB,
  getSingleCourseInDB,
  updateSingleCourseInDB,
  deleteCourseInDB,
  assignCourseFacultyWithIntoDb,
  removeCourseFacultyWithIntoDb,
};
