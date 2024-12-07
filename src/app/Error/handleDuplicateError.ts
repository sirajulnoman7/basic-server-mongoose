import {
  TErrorSource,
  TSendResponseReturnType,
} from '../../middlewareErrorInterface/error';

const handleDuplicateError11000 = (err: any): TSendResponseReturnType => {
  // Extract value within double quotes using regex
  const match = err.message.match(/"([^"]*)"/);

  // The extracted value will be in the first capturing group
  const extractedMessage = match && match[1];
  const errorSource: TErrorSource = [
    {
      path: '',
      message: extractedMessage,
    },
  ];
  const statusCode = 400;

  return {
    statusCode: statusCode,
    message: err.message,
    errorSource,
  };
};

export default handleDuplicateError11000;
