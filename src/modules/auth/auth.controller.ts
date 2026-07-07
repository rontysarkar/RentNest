import { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";
import status from "http-status";
import { sendResponse } from "../../utils/send-response";
import { catchAsync } from "../../utils/catch-async";

const registerUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await authService.registerUser(req.body);

    sendResponse(res, {
      success: true,
      status_code: status.OK,
      message: "Created User Successfully",
      data: result,
    });
  },
);

export const authController = {
  registerUser,
};
