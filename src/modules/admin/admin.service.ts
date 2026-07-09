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


const getAllProperty = async()=>{
    
    const result = await prisma.property.findMany({
        include:{
            category:{
                select:{
                    id:true,
                    name:true
                }
            }
        }
    })

    return result;
}


const getPropertyById = async(id:string)=>{
    
    const result = await prisma.property.findUnique({
        where:{
            id
        },
        include:{
            landlord:{
                select:{
                    name:true,
                    email:true,
                    profilePhoto:true,
                    bio:true
                }
            },
            category:{
                select:{
                    id:true,
                    name:true
                }
            }
        }
    })

    return result;
}

export const adminService = {
    getAllUser,
    updateUserStatus,
    getAllProperty,
    getPropertyById
}