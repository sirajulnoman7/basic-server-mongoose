import { model, Schema } from 'mongoose';
import { TSemesterRegistration } from './semesterRegistationInterface';

const semesterRegistrationSchema = new Schema<TSemesterRegistration>(
  {
    academicSemester: {
      required: true,
      unique: true,
      type: Schema.Types.ObjectId,
    },

    status: {
      type: String,
      enum: ['UPCOMING', 'ONGOING', 'ENDED'],
      required: true,
      default: 'UPCOMING',
    },
    startMonth: {
      type: Date,
    },
    endMonth: {
      type: Date,
    },
    minCredit: {
      type: Number,
    },
    maxCredit: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

const semesterRegistrationModel = model<TSemesterRegistration>(
  'semester-registration',
  semesterRegistrationSchema,
);

export default semesterRegistrationModel;
