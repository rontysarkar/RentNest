import { Response } from "express";

type TResponseData<T> = {
  success: boolean;
  status_code: number;
  message: string;
  data: T;
  error?: any;
};

export const sendResponse = <T>(res: Response, data: TResponseData<T>) => {
  res.status(200).json({
    success: data.success,
    status_code: data.status_code,
    message: data.message,
    data: data.data,
    error: data.error,
  });
};
