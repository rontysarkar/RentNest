import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catch-async";
import { landlordService } from "./landlord.service";
import { sendResponse } from "../../utils/send-response";
import status from "http-status";


const createProperty = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const result = await landlordService.createProperty(req.user?.id as string,req.body);

    sendResponse(res,{
        success:true,
        status_code:status.OK,
        message:"Property Created Successfully",
        data:result
    })
})


const updateProperty = catchAsync(async(req:Request,res:Response,nex:NextFunction)=>{
    const landlordId = req.user?.id;
    const propertyId = req.params.id;
    const payload = req.body;

    const result = await landlordService.updateProperty(landlordId as string,propertyId as string,payload)

    sendResponse(res,{
        success:true,
        status_code:status.OK,
        message:"Property Updated Successfully",
        data:result
    })
})


const deleteProperty = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

    const landlordId = req.user?.id;
    const propertyId = req.params.id;
    const result = await landlordService.deletePropertyById(landlordId as string,propertyId as string);

    sendResponse(res,{
        success:true,
        status_code:status.OK,
        message:"Property Deleted Successfully",
        data:null
    })
})

const getProperty = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

    const result = await landlordService.getPropertyById(req.params.id as string);

    sendResponse(res,{
        success:true,
        status_code:status.OK,
        message:"Property retrieve successfully",
        data:result
    })
})


const getAllProperty = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

    const result = await landlordService.getAllProperty();

    sendResponse(res,{
        success:true,
        status_code:status.OK,
        message:"All Property retrieve successfully",
        data:result
    })
})


export const landlordController = {
    createProperty,
    updateProperty,
    deleteProperty,
    getProperty,
    getAllProperty,
}