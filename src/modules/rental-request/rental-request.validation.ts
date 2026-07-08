import z from "zod";



export const createRentalRequestSchema = z.object({
    propertyId:z.string({error:"propertyId is Required"})
})