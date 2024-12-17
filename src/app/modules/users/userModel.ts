import { model, Schema } from 'mongoose';
import { TUser, UserStaticsModel } from './userInterface';
import config from '../../config';
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser>(
  {
    id: { type: String },
    password: { type: String, select: 0 },
    needsPasswordChange: { type: Boolean, default: true },
    passwordChangeTime: {
      type: Date,
    },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.saltRound));
  next();
});

userSchema.post('save', async function (doc, next) {
  try {
    doc.password = '';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    next(err);
  }
  next();
});
userSchema.statics.isUserExistFindByCustomId =
  async function isUserExistFindByCustomId(id: string) {
    return await userModel.findOne({ id }).select('+password');
  };
userSchema.statics.isPasswordMatched = async function isPasswordMatched(
  plainTextPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged =
  async function isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ) {
    const convertPasswordChangedTimestampToSecond =
      passwordChangedTimestamp.getTime() / 1000;
    // console.log(convertPasswordChangedTimestampToSecond);
    return convertPasswordChangedTimestampToSecond > jwtIssuedTimestamp;
  };
const userModel = model<TUser, UserStaticsModel>('user', userSchema);

export default userModel;
