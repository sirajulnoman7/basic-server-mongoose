import mongoose from 'mongoose';
import {
  TErrorSource,
  TSendResponseReturnType,
} from '../../middlewareErrorInterface/error';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TSendResponseReturnType => {
  const errorSource: TErrorSource = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val.path,
        message: val.message,
      };
    },
  );
  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorSource,
  };
};

export default handleValidationError;
