import { ZodError } from 'zod';
import {
  TErrorSource,
  TSendResponseReturnType,
} from '../../middlewareErrorInterface/error';

const handleZodError = (error: ZodError): TSendResponseReturnType => {
  const errorSource: TErrorSource = error.issues.map((issue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorSource,
  };
};
export default handleZodError;
