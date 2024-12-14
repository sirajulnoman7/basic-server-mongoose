import mongoose, { Schema } from 'mongoose';
import { TOfferedCourse } from './offerdCourseInterface';
import { Days } from './offerdCourseConstant';

const offeredCourseSchema = new mongoose.Schema<TOfferedCourse>(
  {
    semesterRegistration: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'semester-registration',
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AcademicSemester',
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'academic-faculty',
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'academic-department',
    },
    course: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'course',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'faculty',
    },
    maxCapacity: {
      type: Number,
      required: true,
    },
    section: {
      type: Number,
      required: true,
    },
    days: [
      {
        type: String,
        enum: Days,
      },
    ],
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const OfferedCourseModel = mongoose.model<TOfferedCourse>(
  'OfferedCourse',
  offeredCourseSchema,
);
