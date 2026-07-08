import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catch-async";
import { categoryService } from "./category.service";
import { sendResponse } from "../../utils/send-response";
import status from "http-status";

const createCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await categoryService.createCategoryIntoDb(req.body);

    sendResponse(res, {
      success: true,
      status_code: status.OK,
      message: "Category Created Successfully",
      data: result,
    });
  },
);

const getAllCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await categoryService.getAllCategoryFromDb();

    sendResponse(res, {
      success: true,
      status_code: status.OK,
      message: "All Category retrieve successfully",
      data: result,
    });
  },
);

export const categoryController = {
  createCategory,
  getAllCategory,
};
