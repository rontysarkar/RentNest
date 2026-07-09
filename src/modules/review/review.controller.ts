import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catch-async";
import { reviewService } from "./review.service";
import { sendResponse } from "../../utils/send-response";
import status from "http-status";


const createReview = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

    const result = await reviewService.createReview(req.user?.id as string,req.body);

    sendResponse(res,{
        success:true,
        status_code:status.OK,
        message:"Review Created Successfully",
        data:result
    })
})

export const reviewController = {
    createReview
}