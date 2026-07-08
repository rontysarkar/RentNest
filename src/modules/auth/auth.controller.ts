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

const loginUser = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

    const {accessToken,refreshToken} = await authService.loginUser(req.body);

    res.cookie('accessToken',accessToken,{
       httpOnly:true,
       secure:false,
       sameSite:'none',
       maxAge:1000*60*60*24*7
    })

    res.cookie('refreshToken',refreshToken,{
      httpOnly:true,
      secure:false,
      sameSite:"none",
      maxAge:1000*60*60*24*365
    })

    sendResponse(res,{
      success:true,
      status_code:status.OK,
      message:"Login Successfully",
      data:{accessToken,refreshToken}
    })
})

const myProfile = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
   
    const user = await authService.myProfile(req.user?.id as string);

    sendResponse(res,{
      success:true,
      status_code:status.OK,
      message:"User Data retrieve Successfully",
      data:user
    })
})

export const authController = {
  registerUser,
  loginUser,
  myProfile
  
};
