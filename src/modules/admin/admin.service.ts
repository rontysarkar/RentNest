import { UserStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma"


const getAllUser = async()=>{

    const result = await prisma.user.findMany({
        omit:{
            password:true
        }
    })

    return result;
}


const updateUserStatus = async(userId:string,status:UserStatus)=>{

    const user = await prisma.user.findUnique({where:{id:userId}});

    if(!user){
        throw new Error("User Not Found");
    }

    const result = await prisma.user.update({
        where:{id:userId},
        data:{
            status:status
        },
        omit:{
            password:true,
        }
    })

    return result;
}

export const adminService = {
    getAllUser,
    updateUserStatus,
}