import mongoose from 'mongoose';
import QueryBuilder from '../../builders/QueryBuilder';
import AppError from '../../Error/AppError';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { OfferedCourseModel } from '../OfferdCourse/offerdCourseModel';
import { TSemesterRegistration } from './semesterRegistationInterface';
import semesterRegistrationModel from './semesterRegistationModel';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  /**
   * Step1: Check if there any registered semester that is already 'UPCOMING'|'ONGOING'
   * Step2: Check if the semester is exist
   * Step3: Check if the semester is already registered!
   * Step4: Create the semester registration
   */
  //   alternatives
  //   $or: [
  //     { status: RegistrationStatus.UPCOMING },
  //     { status: RegistrationStatus.ONGOING },
  //   ],

  const isThereAnyUpcomingOrOngoingSEmester =
    await semesterRegistrationModel.findOne({
      $or: [{ status: 'UPCOMING' }, { status: ' ONGOING' }],
    });

  if (isThereAnyUpcomingOrOngoingSEmester) {
    throw new AppError(400, 'There is already a semester is registered');
  }

  const academicSemester = await AcademicSemesterModel.findById(
    payload.academicSemester,
  );
  const isSemesterRegistrationExist = await AcademicSemesterModel.findOne({
    academicSemester,
  });

  if (!academicSemester) {
    throw new AppError(400, 'academic semester is not found');
  }
  if (isSemesterRegistrationExist) {
    throw new AppError(400, 'semester is already exist');
  }

  const result = await semesterRegistrationModel.create(payload);
  return result;
};

const getAllSemesterRegistrationsIntoDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    semesterRegistrationModel.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

const getSingleSemesterRegistrationsIntoDB = async (id: string) => {
  const result = await semesterRegistrationModel.findById(id);

  return result;
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  const isSemesterRegisterExist = await semesterRegistrationModel.findById(id);
  if (!isSemesterRegisterExist) {
    throw new AppError(400, 'Semester Registration is not found');
  }

  const currentSemesterStatus = isSemesterRegisterExist.status;

  if (currentSemesterStatus === 'ENDED') {
    throw new AppError(400, 'Semester Registration is already ended');
  }
  if (currentSemesterStatus === 'UPCOMING' && payload.status === 'ENDED') {
    throw new AppError(
      400,
      'Semester Registration not updatable UPCOMING to ENDED',
    );
  }
  if (currentSemesterStatus === 'ONGOING' && payload.status === 'UPCOMING') {
    throw new AppError(
      400,
      'Semester Registration not updatable ONGOING to UPCOMING',
    );
  }

  const result = await semesterRegistrationModel.findByIdAndUpdate(
    id,
    payload,
    { new: true, runValidators: true },
  );
  return result;
};

const deleteSemesterRegistrationIntoDB = async (id: string) => {
  const semesterRegistration = await semesterRegistrationModel.findById(id);
  if (!semesterRegistration) {
    throw new AppError(400, 'Semester Registration not found');
  }

  const semesterRegistrationStatus = semesterRegistration.status;
  if (semesterRegistrationStatus !== 'UPCOMING') {
    throw new AppError(400, 'Semester Registration is not UPCOMING');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const deleteOfferCourse = await OfferedCourseModel.deleteMany(
      {
        semesterRegistration: id,
      },
      { session },
    );

    if (!deleteOfferCourse) {
      throw new AppError(400, 'Semester Registration is not deleted');
    }

    const deletedSemesterRegistration =
      await semesterRegistrationModel.findByIdAndDelete(id, { session });
    if (!deletedSemesterRegistration) {
      throw new AppError(400, 'Semester Registration is not deleted');
    }

    await session.commitTransaction();
    await session.endSession();
    return null;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(400, 'Semester Registration is not deleted');
  }
};

export const semesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationsIntoDB,
  getSingleSemesterRegistrationsIntoDB,
  updateSemesterRegistrationIntoDB,
  deleteSemesterRegistrationIntoDB,
};
