import mongoose from 'mongoose';
import {
  TErrorSource,
  TSendResponseReturnType,
} from '../../middlewareErrorInterface/error';

const handleCastError = (err: mongoose.CastError): TSendResponseReturnType => {
  const errorSource: TErrorSource = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  return {
    statusCode: 400,
    message: 'Invalid Id',
    errorSource,
  };
};
export default handleCastError;
