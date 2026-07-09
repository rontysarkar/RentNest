import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catch-async";
import { propertyService } from "./property.service";
import { sendResponse } from "../../utils/send-response";
import status from "http-status";
import { querySchema } from "./property.validation";
import z from "zod";

const getAllProperty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const validateQuery = querySchema.safeParse(req.query);

    if (!validateQuery.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errorDetails: z.flattenError(validateQuery.error).fieldErrors,
      });
    }

    const result = await propertyService.getAllProperty(validateQuery.data);
    sendResponse(res, {
      success: true,
      status_code: status.OK,
      message: "Retrieve all property successfully",
      data: result,
    });
  },
);

const getPropertyById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await propertyService.getPropertyById(
      req.params?.id as string,
    );
    sendResponse(res, {
      success: true,
      status_code: status.OK,
      message: "Retrieve property successfully",
      data: result,
    });
  },
);

export const propertyController = {
  getAllProperty,
  getPropertyById,
};
