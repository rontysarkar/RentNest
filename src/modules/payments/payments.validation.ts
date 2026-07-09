import z from "zod";




export const createPaymentSchema = z.object({
    rentalRequestId:z.string({error:"Missing parameter: rentalRequestId must be provided."})
})
