import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catch-async";
import { adminService } from "./admin.service";
import { sendResponse } from "../../utils/send-response";
import status from "http-status";


const getAllUser = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

    const result = await adminService.getAllUser();

    sendResponse(res,{
        success:true,
        status_code:status.OK,
        message:"All User retrieve successfully",
        data:result,
    })
})



export const adminController = {
    getAllUser,
}