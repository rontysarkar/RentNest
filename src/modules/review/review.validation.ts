import z from "zod";



export const createReviewSchema = z.object({
    propertyId:z.string("Missing field: propertyId must be provided."),
    rating:z.string("Missing field: rating must be provided."),
    comment:z.string("Missing filed:comment must be provided")
})


export type TCreateReviewPayload = z.infer<typeof createReviewSchema>