import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catch-async";
import { paymentService } from "./payments.service";
import { sendResponse } from "../../utils/send-response";
import status from "http-status";


const createPayment = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const tenantId = req.user?.id;
    const {rentalRequestId} = req.body;

    const result = await paymentService.createPayment(rentalRequestId,tenantId as string)

    sendResponse(res,{
        success:true,
        status_code:status.OK,
        message:"Payment Url Get Successfully",
        data:result
    })
})

const handleWebhook = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

    const signature = req.headers["stripe-signature"] as string;

    const result = await paymentService.handleStripeWebhook(req.body,signature);

    res.status(200).json(result);
})


export const paymentController = {
    createPayment,
    handleWebhook,
}