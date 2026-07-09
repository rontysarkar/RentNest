import { prisma } from "../../lib/prisma"


const getAllUser = async()=>{

    const result = await prisma.user.findMany({
        omit:{
            password:true
        }
    })

    return result;
}

export const adminService = {
    getAllUser,
}