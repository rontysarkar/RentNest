import { prisma } from "../../lib/prisma"



const createRentalRequest = async(tenantId:string,propertyId:string)=>{
    const property = await prisma.property.findUnique({
        where:{
            id:propertyId
        }
    })

    if(!property){
        throw new Error("Property Not Found")
    }

    if(property.status === 'RENTED'){
        throw new Error("This property is already rented and no longer available.")
    }

    const result = await prisma.rentalRequest.create({
        data:{
            tenantId,
            propertyId,
        }
    })

    return result;
}

const getMyRentalRequests = async(tenantId:string)=>{

    const result = await prisma.rentalRequest.findMany({
        where:{
            tenantId
        }
    })

    if(!result){
        throw new Error("Not Renal Request Found")
    }

    return result;
}

const getSingleRentalRequest = async(id:string)=>{
    const result = await prisma.rentalRequest.findUnique({
        where:{
            id,
        }
    })

    if(!result){
        throw new Error("Rental Request not found");
    }

    return result;
}


export const rentalRequestService = {
    createRentalRequest,
    getMyRentalRequests,
    getSingleRentalRequest,
}