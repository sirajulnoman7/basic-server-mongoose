export type TErrorSource = {
  path: string | number;
  message: string;
}[];

export type TSendResponseReturnType = {
  statusCode: number;
  message: string;
  errorSource: TErrorSource;
};
