import QueryBuilder from '../../builders/QueryBuilder';
import { TCourse } from './course.interface';
import { CourseSearchableFields } from './courseConstant';
import courseModel from './courseModel';

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

  const result = await courseModel.findByIdAndUpdate(id, remainingCourseData, {
    new: true,
  });
  return result;
};

const deleteCourseInDB = async (id: string) => {
  const result = await courseModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const courseService = {
  createCourseInDB,
  getAllCourseInDB,
  getSingleCourseInDB,
  updateSingleCourseInDB,
  deleteCourseInDB,
};
