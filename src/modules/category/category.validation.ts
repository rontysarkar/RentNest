import z from "zod";



export const createCategorySchema = z.object({
    name:z.string().min(1,"Name Cannot be Empty")
})

export type TCreateCategoryPayload = z.infer<typeof createCategorySchema>   