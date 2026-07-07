import { NextFunction, Request, RequestHandler, Response } from "express";
import { sendResponse } from "./send-response";
import status from "http-status";

export const catchAsync = (fn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error: any) {
      sendResponse(res, {
        success: false,
        status_code: status.BAD_REQUEST,
        message: error.message,
        data: error,
      });
    }
  };
};
