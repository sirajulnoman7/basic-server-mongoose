import { model, Schema } from 'mongoose';
import {
  TCourse,
  TCourseFaculty,
  TPreRequisiteCourses,
} from './course.interface';

const preRequisiteCourses = new Schema<TPreRequisiteCourses>({
  course: { type: Schema.Types.ObjectId, required: true, ref: 'course' },
  isDeleted: { type: Boolean, default: false },
});

const courseFacultySchema = new Schema<TCourseFaculty>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'course',
    unique: true,
  },
  faculties: [
    {
      type: Schema.Types.ObjectId,
      ref: 'faculty',
    },
  ],
});

const courseSchema = new Schema<TCourse>({
  title: { type: String, required: true },
  prefix: { type: String, required: true },
  code: { type: Number, required: true },
  credits: { type: Number, required: true },
  preRequisiteCourses: [preRequisiteCourses],
  isDeleted: { type: Boolean, default: false },
});

export const courseModel = model<TCourse>('course', courseSchema);
export const courseFacultyModel = model<TCourseFaculty>(
  'courseFaculty',
  courseFacultySchema,
);

// -------------
