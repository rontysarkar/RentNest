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

const updateUserStatus = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

    const result = await adminService.updateUserStatus(req.params?.id as string,req.body.status);
    sendResponse(res,{
        success:true,
        status_code:status.OK,
        message:"Update user status successfully",
        data:result,
    })
})

const getAllProperty = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const result = await adminService.getAllProperty();
    sendResponse(res,{
        success:true,
        status_code:status.OK,
        message:"Retrieve all property successfully",
        data:result,
    })
})
const getPropertyById = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const result = await adminService.getPropertyById(req.params?.id as string);
    sendResponse(res,{
        success:true,
        status_code:status.OK,
        message:"Retrieve property successfully",
        data:result,
    })
})



export const adminController = {
    getAllUser,
    updateUserStatus,
    getAllProperty,
    getPropertyById,
}