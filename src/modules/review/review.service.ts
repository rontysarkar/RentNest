import { PaymentStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { TCreateReviewPayload } from "./review.validation";



const createReview = async(tenantId:string,payload:TCreateReviewPayload)=>{
    const {propertyId,comment,rating} = payload;

    const isCompleteRental =await prisma.rentalRequest.findFirst({
        where:{
            propertyId,
            tenantId,
            payment:{
                status:PaymentStatus.COMPLETED,
            }
        }
    })

    if(!isCompleteRental){
        throw new Error("You can only review properties that you have successfully rented.");
    }

    const isReviewExist = await prisma.review.findFirst({
        where:{
            propertyId,
            tenantId
        }
    })

    if(isReviewExist){
        throw new Error("You have already submitted a review for this property.")
    }

    const review = await prisma.review.create({
        data:{
            rating:Number(rating),
            comment,
            tenantId,
            propertyId
        }
    })

    return review;
}


export const reviewService = {
    createReview,
}