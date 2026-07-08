import { prisma } from "../../lib/prisma"
import { TCreatePropertyPayload, TUpdatePropertyPayload } from "./landlord.validation";



const createProperty = async(landlordId:string,payload:TCreatePropertyPayload)=>{
    const property = await prisma.property.create({
        data:{
            ...payload,
            landlordId
        }
    })

    return property;
}


const updateProperty = async(landlordId:string,propertyId:string,payload:TUpdatePropertyPayload)=>{


    const property = await prisma.property.findUnique({
        where:{
            id:propertyId,
        }
    })

    if(!property){
        throw new Error("Property Not Found");
    }

    if(property.landlordId !== landlordId){
        throw new Error("You Cannot Update this property")
    }

    const updatedProperty = await prisma.property.update({
        where:{
            id:propertyId
        },
        data:{
            ...payload
        }
    })

    return updatedProperty;

}


const deletePropertyById = async(landlordId:string,propertyId:string)=>{

    const property = await prisma.property.findUnique({
        where:{
            id:propertyId,
        }
    })

    if(!property){
        throw new Error("Property Not Found");
    }

    if(property.landlordId !== landlordId){
        throw new Error("You Cannot delete this property")
    }

    const deletedData = await prisma.property.delete({
        where:{
            id:propertyId,
            landlordId
        }
    })

    return deletedData 
}


const getPropertyById = async(propertyId:string)=>{

    const result = await prisma.property.findUnique({
        where:{
            id:propertyId
        },
        include:{
            category:{
                select:{
                    id:true,
                    name:true
                }
            }
        }
    })
    if(!result){
        throw new Error("Property Not Found");
    }

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
    });
    return result;
}


export const landlordService = {
    createProperty,
    updateProperty,
    deletePropertyById,
    getPropertyById,
    getAllProperty,
}