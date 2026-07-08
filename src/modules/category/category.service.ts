import { prisma } from "../../lib/prisma"
import { TCreateCategoryPayload } from "./category.validation"

const createCategoryIntoDb =async (payload:TCreateCategoryPayload) =>{

    const category = await prisma.category.create({
        data:{
            ...payload
        }
    })

    return category;
}

const getAllCategoryFromDb = async() =>{
    const categories = await prisma.category.findMany();
    return categories;
}

export const categoryService = {
    createCategoryIntoDb,
    getAllCategoryFromDb,
}