import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catch-async";
import { z } from "zod";
import { rentalRequestService } from "./rental-request.service";
import { sendResponse } from "../../utils/send-response";
import status from "http-status";

const createRentalRequest = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const tenantId = req.user?.id;
    const propertyId = req.body?.propertyId

    const result = await rentalRequestService.createRentalRequest(
      tenantId as string,
      propertyId as string,
    );

    sendResponse(res, {
      success: true,
      status_code: status.OK,
      message: "Your rental request has been submitted successfully.",
      data: result,
    });
  },
);


const getMyRentalRequests = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

    const result = await rentalRequestService.getMyRentalRequests(req.user?.id as string);

    sendResponse(res, {
      success: true,
      status_code: status.OK,
      message: "Your rental request successfully retrieve.",
      data: result,
    });
})

const getSingleRentalRequest = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

    const result = await rentalRequestService.getSingleRentalRequest(req.params.id as string);
    sendResponse(res, {
      success: true,
      status_code: status.OK,
      message: "rental request retrieve successfully.",
      data: result,
    });
})

export const rentalRequestController = {
    createRentalRequest,
    getMyRentalRequests,
    getSingleRentalRequest,
}
